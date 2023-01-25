package com.main36.pikcha.domain.member.controller;


import com.main36.pikcha.domain.member.dto.MemberDto;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.mapper.MemberMapper;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.jwt.JwtParser;
import com.main36.pikcha.global.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final JwtGenerator jwtGenerator;
    private final JwtParser jwtParser;

    @PostMapping("/signup")
    public ResponseEntity<DataResponseDto<?>> postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        log.info("email={}", memberPostDto.getEmail());
        log.info("username={}", memberPostDto.getUsername());

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPicture("http://drive.google.com/uc?export=view&id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g");
        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToSignUpResponseDto(createMember)),
                HttpStatus.CREATED);
    }

    @LoginUser
    @PatchMapping("/users/edit/{member-id}")
    public ResponseEntity<DataResponseDto<?>> patchMember(Member loginUser,
                                                          @PathVariable("member-id") @Positive Long memberId,
                                                          @Valid @RequestBody MemberDto.Patch memberPatchDto) {

        memberService.verifyLoginIdAndMemberId(loginUser.getMemberId(), memberId);
        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return ResponseEntity.ok(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)));
    }

    @LoginUser
    @GetMapping("/users/profile/{member-id}")
    public ResponseEntity<DataResponseDto<?>> getMemberProfile(Member loginUser,
                                                               @PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.verifyLoginIdAndMemberId(loginUser.getMemberId(), memberId);

        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)),
                HttpStatus.OK);
    }

    @LoginUser
    @DeleteMapping("/users/delete/{member-id}")
    public ResponseEntity<HttpStatus> deleteMember(Member loginUser,
                                                   @PathVariable("member-id") @Positive Long memberId) {

        Member member = memberService.verifyLoginIdAndMemberId(loginUser.getMemberId(), memberId);
        memberService.deleteMember(member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
