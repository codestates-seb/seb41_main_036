package com.main36.pikcha.global.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.main36.pikcha.global.security.dto.TokenDto;
import com.main36.pikcha.global.security.userdetails.AuthMember;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Encoders;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.PostConstruct;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_TYPE;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtGenerator {
    /* 유저 정보로 JWT 토큰을 만들거나 토큰을 바탕으로 유저 정보를 가져옴
     *  JWT 토큰 관련 암호화, 복호화, 검증 로직
     */

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpireTimeMinute;
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpireTimeMinute;
    private Key key;

    @PostConstruct
    public void setKey() {
        String encode = Encoders.BASE64.encode(this.secretKey.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(encode);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);

        return calendar.getTime();
    }

    public String generateAccessToken(String payload, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(payload);
        claims.put("roles", roles);
        Date now = new Date();
        Date validity = new Date(now.getTime() + 30000); // 30000이 30분을 의미함

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(String payload) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 420000); // 420000은 420분을 의미함
        return Jwts.builder()
                .setSubject(payload)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public TokenDto generateTokenDto(AuthMember authMember) {

        Date accessTokenExpiresIn = getTokenExpiration(accessTokenExpireTimeMinute);
        Date refreshTokenExpiresIn = getTokenExpiration(refreshTokenExpireTimeMinute);

        Claims claims = Jwts.claims().setSubject(authMember.getEmail());
        claims.put("roles", authMember.getRoles());

        // Access Token 생성
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(authMember.getEmail())                  // payload "sub": "name"
                .setIssuedAt(Calendar.getInstance().getTime())    // payload "auth": "ROLE_USER"
                .setExpiration(accessTokenExpiresIn)                   // payload "exp": 1516239022 (예시)
                .signWith(key, SignatureAlgorithm.HS512)          // header "alg": "HS512"
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setSubject(authMember.getEmail())
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if (claims.get("roles") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
//        List<String> authorities = Arrays.stream(claims.get("roles").toString().split(","))
//                .collect(Collectors.toList());

        List<String> authorities = Arrays.stream(
                        claims.get("roles")
                                .toString()
                                .replace("[", "")
                                .replace("]", "")
                                .replace(" ", "")
                                .split(","))
                .collect(Collectors.toList());

        AuthMember auth = AuthMember.of(
                claims.get("id", Long.class),
                claims.get("sub", String.class),
                authorities);

        auth.getRoles().stream().forEach(authMember -> log.info("# AuthMember.getRoles 권한 체크 = {}", authMember));

        return new UsernamePasswordAuthenticationToken(auth, null, auth.getAuthorities());
    }

    public Claims parseClaims(String token)  {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

}
