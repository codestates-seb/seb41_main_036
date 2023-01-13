package com.main36.picha.domain.member.controller;


import com.main36.picha.domain.member.dto.MemberPatchDto;
import com.main36.picha.domain.member.dto.MemberPostDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.mapper.MemberMapper;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.response.DataResponseDto;
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
@RequestMapping("/users")
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper mapper;

    //멤버 회원가입
    @PostMapping("/signup")
    public ResponseEntity<DataResponseDto> postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity(
                new DataResponseDto<>(mapper.memberToSignUpResponseDto(createMember)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{member-id}")
    public ResponseEntity<DataResponseDto> patchMember(@PathVariable("member-id") @Positive long memberId,
                                                       @Valid @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToProfileHomeDto(member)),
                HttpStatus.OK
        );
    }

//    @GetMapping("/token")
//    public ResponseEntity getOauth2MemberToken() {
//        Member member = memberService.findMember()
//        return new ResponseEntity(HttpStatus.OK);
//    }


    // 멤버 프로필 조회(홈)
    @GetMapping("/{member-id}/{email}")
    public ResponseEntity<DataResponseDto> getMemberProfile(@Positive @PathVariable("member-id") long memberId,
                                                            @PathVariable("email") String email) {
        //TODO: verifyLoginMember
        Member member = memberService.findMember(memberId, email);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)),
                HttpStatus.OK);
    }

    // 멤버 삭제
    @DeleteMapping("/delete/{member-id}/confirm")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        //TODO: verifyLoginMember
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
