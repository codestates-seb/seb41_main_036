package com.main36.pikcha.domain.member.controller;


import com.main36.pikcha.domain.member.dto.MemberDto;
import com.main36.pikcha.domain.member.dto.MemberResponseDto;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.mapper.MemberMapper;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.utils.CookieUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final CookieUtils cookieUtils;

    @PostMapping("/signup")
    public ResponseEntity<DataResponseDto<?>> postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        log.info("email={}", memberPostDto.getEmail());
        log.info("username={}", memberPostDto.getUsername());

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPicture("https://lh3.googleusercontent.com/JCjDOWovmdrJfXVo2hryzG8Fcu5mhmbr5M3huMJqya2pThnKS_-tpP8vZm0k8Gz9D-0PZkG3A5cd_R-NICLE4VRy8Nc9ZnA7NiU-pZIlAbtbTjdP-q0c1-tPFCUkchBDHVmjOtOcC96ReQBoUjWI3HkCFxz2AIpXM0Ur9AoqaP22gKZR0AmvU7t6nl6tvTUZgGpjgMHnyFgwVpARb-BINz_u-6dWW69mAJp0ibPXW2k4Satb7DkVFOnOXOEXvYqWyFRx4PVZFVHV_y3K6o49UvTWE-Dj64pwUvXICZM-voWJq08h95YVqBbpfdB-aoAV8KxJOXdBmiasf3JVYC6HDvS5CAtA-dfHcUK5t_7MO9WlTJoXhNoLksdvRIlWJNO5l99GJX8GdWCkSHmY_XbvhlACbcIGOcAqTwS5Mdkhd6tMrhji9wMDTJjnm1rq0sHrEwW8gDfPC0-t4sHryqzf547EmBRtxhSmdLInScIQmHznTIU2wYM4Np_Z50th2nt5h4Mk9Hug0T6WEN4yW8LcWt08Mym9fM2H2LRSwoA7CtyeKA9Oprs71xfapC4DIgHEIFDp7mz-jAqQ1S2h8UhkBX0O_5n5TKFDiKWJ0eWvlLd7LOqmlywqv8Mgt3vr1yYp6rruAoQ6pyQ87jOu9Fv5LYIEONF_mGAIwIwxHzbj3x0MrAFm4INzzXmJQmUATOfLZreZqxSyHO0DWl0Tf22tXQlejoCf1hPKL5a_HLWYol62FXuMvVXMn4D7bTeqDYN0a9o2rHs7MR0QJicfRdj-976iN8l-KUNvk6ULpjWD2AGHcnKnnbg-VXRJMMUgB5-z4__TQvqdkSbPMnguPRW6_joHtcdtSzMg-H4dMaMKYwrLcHuc5WuVAwMwlj4FWX8YNfJaP37-50s09BHmBg9FFWD7VSeHA1KesaDZUoEdoNyYEMER=s407-no?authuser=0");
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
    public ResponseEntity<DataResponseDto<MemberResponseDto.Profile>> getMemberProfile(Member loginUser,
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
