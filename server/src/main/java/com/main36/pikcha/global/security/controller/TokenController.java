package com.main36.pikcha.global.security.controller;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUserEmail;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.security.dto.RenewTokenDto;
import com.main36.pikcha.global.security.dto.TokenDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.jwt.JwtParser;
import com.main36.pikcha.global.security.userdetails.AuthMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;

@Slf4j
@RestController
@Validated
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {


    private JwtGenerator jwtGenerator;
    private JwtParser jwtParser;

    private MemberService memberService;

    @LoginUserEmail
    @GetMapping("/token")
    public ResponseEntity<?> getToken(String email,
                                      @RequestParam String access_token,
                                      @RequestParam String refresh_token) {
        log.info("at={}", access_token);
        log.info("rt={}", refresh_token);

        String at = "Bearer " + access_token;

        // 1. 헤더에 담아서 보내기
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", at);
        headers.set("RefreshToken", refresh_token);
        return ResponseEntity.ok().headers(headers).body("SUCCESS");

        // 2. 토큰 엔티티에 담아 보내기
//        Token tokenBuilder =
//                Token.builder()
//                        .accessToken(at)
//                        .refreshToken(refresh_token)
//                        .build();
//        return ResponseEntity.ok(tokenBuilder);
    }

    @LoginUserEmail
    @GetMapping("/getCookie")
    public ResponseEntity<?> getCookie( String email,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        Member memberByClientId = memberService.findMemberByEmail(email);
        AuthMember authMember = AuthMember.of(memberByClientId);
        TokenDto tokenDto = jwtGenerator.generateTokenDto(authMember);
        String at = BEARER_PREFIX + tokenDto.getAccessToken();

        Cookie[] list = request.getCookies();
        for (Cookie cookie : list) {
            if (cookie.getName().equals("refreshToken")) {
                jwtParser.verifyToken(cookie.getValue());
                response.setHeader("Authorization", at);
            }
        }

        RenewTokenDto builder = RenewTokenDto.builder()
                .memberId(authMember.getMemberId())
                .email(authMember.getEmail())
                .accessToken(at)
                .accessTokenExpiresIn(tokenDto.getAccessTokenExpiresIn())
                .build();

        return ResponseEntity.ok(new DataResponseDto<>(builder));

    }
}
