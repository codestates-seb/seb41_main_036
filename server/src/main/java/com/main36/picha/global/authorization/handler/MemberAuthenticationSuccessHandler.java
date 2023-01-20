package com.main36.picha.global.authorization.handler;

import com.main36.picha.domain.refreshToken.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
//    private final JwtTokenizer jwtTokenizer;
//
//    private final MemberMapper mapper;
//
//    private final Gson gson;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authResult) throws IOException, ServletException {

//        AuthMember authMember = (AuthMember) authResult.getPrincipal();
//        LoginResponseDto loginResponseDto = mapper.memberToLoginResponseDto(authMember);
//        String accessToken = delegateAccessToken(authMember);
//        String refreshToken = delegateRefreshToken(authMember);
//
//        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("RefreshToken", refreshToken);
//        response.setContentType("application/json");
//        response.setCharacterEncoding("utf-8");
//        response.getWriter().write(gson.toJson(loginResponseDto));

//        AuthMember authMember = (AuthMember) authResult.getPrincipal();
//        TokenProvider tokenProvider = new TokenProvider();
//        TokenDto tokenDto = tokenProvider.generateTokenDto(authMember);
//
//        String refreshToken = response.getHeader("Set-Cookie").substring(13).split(";")[0];
//        response.setHeader("Authorization", "Bearer " + tokenDto.getAccessToken());
//        log.info("refreshToken: {}", refreshToken);
//
//        // RefreshToken 저장
//        RefreshToken refresh = RefreshToken.builder()
//                .key(authMember.getMemberId())
//                .value(refreshToken)
//                .build();
//
//        refreshTokenRepository.save(refresh);
        log.info("# Authenticated successfully!");

    }
//
//    private String delegateAccessToken(Member member) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", member.getUsername());
//        claims.put("roles", member.getRoles());
//
//        String subject = member.getUsername();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        return jwtTokenizer.generatedAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//    }
//
//    private String delegateRefreshToken(Member member) {
//        String subject = member.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//    }
}
