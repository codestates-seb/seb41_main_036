package com.main36.pikcha.domain.member.service;


import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.repository.MemberRepository;
import com.main36.pikcha.global.security.jwt.JwtParser;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtParser jwtParser;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        return memberRepository.save(member);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member createOauth2Member(Member member) {
//        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
//        if(findMember.isPresent()){
//            return findMember.get();
//        }
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public boolean isPresentOauthMember(String email) {
        Optional<Member> byEmail = memberRepository.findByEmail(email);

        return byEmail.isPresent();
    }

    public Member updateMember(Member member) {
        Member findMember = findMemberByMemberId(member.getMemberId());
        Optional.ofNullable(member.getUsername())
                .ifPresent(findMember::setUsername);
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(findMember::setPhoneNumber);
        Optional.ofNullable(member.getAddress())
                .ifPresent(findMember::setAddress);
        Optional.ofNullable(member.getEmail())
                .ifPresent(findMember::setEmail);
        return memberRepository.save(findMember);
    }

    public Member getLoginMember(HttpServletRequest request) {
        String loginUserEmail = jwtParser.getLoginUserEmail(request);

        return findMemberByEmail(loginUserEmail);
    }

    @Transactional(readOnly = true)
    public Member findMemberByEmail(String email) {
        return verifiedMemberByEmail(email);
    }

    private Member verifiedMemberByEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);

        return findMember
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Member findMemberByMemberId(long memberId) {
        return verifiedMemberByMemberId(memberId);
    }

    private Member verifiedMemberByMemberId(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);

        return findMember
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(Member member) {
        memberRepository.delete(member);
    }

    @Transactional(readOnly = true)
    public Member verifyLoginIdAndMemberId(Long loginId, Long memberId) {
        Member member = findMemberByMemberId(memberId);

        if (!member.getMemberId().equals(loginId)) {
            throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_EQUAL);
        }

        return member;
    }

}

