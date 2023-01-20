package com.main36.picha.domain.member.controller;


import com.main36.picha.domain.member.dto.MemberDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.mapper.MemberMapper;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.authorization.dto.RenewTokenDto;
import com.main36.picha.global.authorization.dto.TokenDto;
import com.main36.picha.global.authorization.filter.JwtProvider;
import com.main36.picha.global.authorization.jwt.JwtTokenizer;
import com.main36.picha.global.authorization.resolver.ClientId;
import com.main36.picha.global.authorization.userdetails.AuthMember;
import com.main36.picha.global.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static com.main36.picha.global.authorization.filter.JwtVerificationFilter.BEARER_PREFIX;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper mapper;
    private final JwtProvider jwtProvider;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/signup")
    public ResponseEntity<DataResponseDto<?>> postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        log.info("email={}", memberPostDto.getEmail());
        log.info("username={}", memberPostDto.getUsername());

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPicture("https://drive.google.com/file/d/1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g/view?usp=sharing");
        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToSignUpResponseDto(createMember)),
                HttpStatus.CREATED);
    }

    @GetMapping("/token")
    public ResponseEntity<?> getToken(@RequestParam String access_token,
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

    @GetMapping("/renew/{member-id}")
    public ResponseEntity<?> getToken(@PathVariable("member-id") Long memberId,
                                      HttpServletRequest request) {
        //TODO header에서 리프레쉬 토큰 뽑아내기
        jwtProvider.validateToken(request.getHeader("refresh"));
        Member memberByClientId = memberService.findMemberByMemberId(memberId);
        AuthMember authMember = AuthMember.of(memberByClientId);
        TokenDto tokenDto = jwtProvider.generateTokenDto(authMember);
        String at = BEARER_PREFIX + tokenDto.getAccessToken();

        RenewTokenDto builder = RenewTokenDto.builder()
                .memberId(authMember.getMemberId())
                .email(authMember.getEmail())
                .accessToken(at)
                .accessTokenExpiresIn(tokenDto.getAccessTokenExpiresIn())
                .build();

        return ResponseEntity.ok(new DataResponseDto<>(builder));

        // 2. 토큰 엔티티에 담아 보내기
//        Token tokenBuilder =
//                Token.builder()
//                        .accessToken(at)
//                        .refreshToken(refresh_token)
//                        .build();
//        return ResponseEntity.ok(tokenBuilder);
    }


    @PatchMapping("/users/edit/{member-id}")
    public ResponseEntity<DataResponseDto<?>> patchMember(@ClientId Long clientId,
                                                          @PathVariable("member-id") @Positive Long memberId,
                                                          @Valid @RequestBody MemberDto.Patch memberPatchDto) {
        memberService.isEqualToClientIdAndMemberId(clientId, memberId);

        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return ResponseEntity.ok(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)));
    }

    @GetMapping("/users/profile/{member-id}")
    public ResponseEntity<DataResponseDto<?>> getMemberProfile(@ClientId Long clientId,
                                                               @PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.isEqualToClientIdAndMemberId(clientId, memberId);

        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)),
                HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{member-id}")
    public ResponseEntity<HttpStatus> deleteMember(@ClientId Long clientId,
                                                   @PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.isEqualToClientIdAndMemberId(clientId, memberId);
        memberService.deleteMember(member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
