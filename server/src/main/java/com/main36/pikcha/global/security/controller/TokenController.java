package com.main36.pikcha.global.security.controller;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.security.dto.RenewTokenDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.jwt.JwtParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

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

        if (refresh.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_EMPTY);
        }

        jwtParser.verifyRefreshToken(refresh);
        Member member = memberService.findMemberByMemberId(memberId);
        RenewTokenDto.RenewTokenDtoBuilder builder = RenewTokenDto.builder();
        RenewTokenDto renewTokenDto =
                builder.memberId(member.getMemberId())
                        .email(member.getEmail())
                        .accessToken("Bearer " + jwtGenerator.generateAccessToken(member.getEmail(), member.getRoles()))
                        .build();

        return ResponseEntity.ok(new DataResponseDto<>(renewTokenDto));
    }
}
