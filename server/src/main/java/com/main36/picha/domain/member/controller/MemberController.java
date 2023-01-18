package com.main36.picha.domain.member.controller;


import com.main36.picha.domain.member.dto.MemberPatchDto;
import com.main36.picha.domain.member.dto.MemberPostDto;
import com.main36.picha.domain.member.dto.Token;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.mapper.MemberMapper;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.auth.userdetails.MemberDetailsService;
import com.main36.picha.global.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

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
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPicture("https://drive.google.com/file/d/1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g/view?usp=sharing");
        Member createMember = memberService.createMember(member);

        return new ResponseEntity(
                new DataResponseDto<>(mapper.memberToSignUpResponseDto(createMember)),
                HttpStatus.CREATED);
    }

    @GetMapping("/token")
    public ResponseEntity getToken(@RequestParam String access_token,
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

    // 멤버 프로필 조회(홈)
    // TODO: 스프링 시큐리티 적용
    @GetMapping("/{member-id}/{email}")
    public ResponseEntity<DataResponseDto> getMemberProfile(@Positive @PathVariable("member-id") long memberId,
                                                            @PathVariable("email") String email) {
        //TODO: verifyLoginMember
        Member member = memberService.findMember(memberId, email);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToProfileHomeDto(member)),
                HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getMembers(@RequestParam(defaultValue = "1", required = false) int page,
                                     @RequestParam(defaultValue = "9", required = false) int size) {
//        Page<Member> pageMember =
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 멤버 삭제
    // TODO: 스프링 시큐리티 적용
    @DeleteMapping("/delete/{member-id}/confirm")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        //TODO: verifyLoginMember
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
