package com.main36.pikcha.global.security.controller;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.aop.LoginUserEmail;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.security.dto.RenewTokenDto;
import com.main36.pikcha.global.security.dto.TokenDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.jwt.JwtParser;
import com.main36.pikcha.global.security.userdetails.AuthMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.prefs.PreferenceChangeEvent;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
public class TokenController {

    private final JwtGenerator jwtGenerator;
    private final JwtParser jwtParser;
    private final MemberService memberService;

    @GetMapping("/token/refresh/{member-id}")
    public ResponseEntity<?> findCookie(@PathVariable("member-id") Long memberId,
                                        @CookieValue(value = "refreshToken") String refresh) {

        jwtParser.verifyToken(refresh);
        Member member = memberService.findMemberByMemberId(memberId);
        RenewTokenDto.RenewTokenDtoBuilder builder = RenewTokenDto.builder();
        RenewTokenDto renewTokenDto =
                builder.memberId(member.getMemberId())
                        .email(member.getEmail())
                        .accessToken("Bearer " + jwtGenerator.generateAccessToken(member.getEmail(),member.getRoles()))
                        .build();

        return ResponseEntity.ok(new DataResponseDto<>(renewTokenDto));
    }
}
