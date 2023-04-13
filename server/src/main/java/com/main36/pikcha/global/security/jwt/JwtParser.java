package com.main36.pikcha.global.security.jwt;

import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.security.jwt.exception.*;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;

@Slf4j
@Getter
@Component
@RequiredArgsConstructor
public class JwtParser {
    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;
    private Key key;

    @PostConstruct
    public void setKey() {
        String encode = Encoders.BASE64.encode(this.secretKey.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(encode);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public void verifySignature(String jws, String base64EncodedSecretKey) {

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);

        return calendar.getTime();
    }

    public String getLoginUserEmail(HttpServletRequest request) {
        log.info("token= {}", request.getHeader("Authorization"));
        if (request.getHeader("Authorization") == null) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_EMPTY);
        }

        String authorization = request.getHeader("Authorization");
        log.info("authorization= {}", authorization);
        // try-catch
        String accessToken = authorization.substring(7); // 500 error
        verifyAccessToken(accessToken);

        return getBody(accessToken).get("sub").toString();
    }

    public boolean verifyAccessToken(String token) {
        try {
            getBody(token);
            return true;
        } catch (SignatureException e) {
            log.trace("Invalid JWT signature trace: {}", e);
            throw new TokenSignatureInvalid();
        } catch (MalformedJwtException e) {
            log.trace("Invalid JWT token trace: {}", e);
            throw new TokenMalformed();
        } catch (ExpiredJwtException e) {
            log.trace("trace Expired JWT token trace: {}", e);
            throw new TokenExpired();
        } catch (UnsupportedJwtException e) {
            log.trace("Unsupported JWT token trace: {}", e);
            throw new TokenUnsupported();
        } catch (IllegalArgumentException e) {
            log.trace("JWT claims string is empty trace: {}", e);
            throw new TokenIllegalArgument();
        }
    }

    public boolean verifyRefreshToken(String token) {
        try {
            getBody(token);
            return true;
        } catch (SignatureException e) {
            log.trace("Invalid JWT signature trace: {}", e);
            throw new TokenSignatureInvalid();
        } catch (MalformedJwtException e) {
            log.trace("Invalid JWT token trace: {}", e);
            throw new TokenMalformed();
        } catch (ExpiredJwtException e) {
            log.trace("trace Expired JWT token trace: {}", e);
            throw new TokenRefreshExpired();
        } catch (UnsupportedJwtException e) {
            log.trace("Unsupported JWT token trace: {}", e);
            throw new TokenUnsupported();
        } catch (IllegalArgumentException e) {
            log.trace("JWT claims string is empty trace: {}", e);
            throw new TokenIllegalArgument();
        }
    }

    public Claims getBody(String token) {
        // TODO: 예외 처리 필요 키값이 이상할때!
        return Jwts.
                parserBuilder().
                setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}
