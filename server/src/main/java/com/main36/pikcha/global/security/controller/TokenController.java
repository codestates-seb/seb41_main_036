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
        log.info("memberId= {}", memberId);
        log.info("refresh= {}", refresh);
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

    @GetMapping("/token/test/{member-id}")
    public ResponseEntity<?> test(@PathVariable("member-id") Long memberId,
                                  @CookieValue(value = "refreshToken") String refresh) {

        log.info("memberId= {}", memberId);
        log.info("refresh= {}", refresh);
        return new ResponseEntity(HttpStatus.OK);
    }


//    @LoginUser
//    @GetMapping("/token/refresh")
//    public ResponseEntity<?> findCookie(Member loginUser,
//                                        @CookieValue(value = "refreshToken") String refresh) {
//        log.info("refresh= {}", refresh);
//        if (refresh.isEmpty()) {
//            throw new BusinessLogicException(ExceptionCode.TOKEN_EMPTY);
//        }
//
//        jwtParser.verifyToken(refresh);
//        RenewTokenDto.RenewTokenDtoBuilder builder = RenewTokenDto.builder();
//        RenewTokenDto renewTokenDto =
//                builder.memberId(loginUser.getMemberId())
//                        .email(loginUser.getEmail())
//                        .accessToken("Bearer " + jwtGenerator.generateAccessToken(loginUser.getEmail(), loginUser.getRoles()))
//                        .build();
//
//        return ResponseEntity.ok(new DataResponseDto<>(renewTokenDto));
//    }
}
