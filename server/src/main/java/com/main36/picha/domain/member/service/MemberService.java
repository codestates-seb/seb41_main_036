package com.main36.picha.domain.member.service;

import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.repository.MemberRepository;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import com.main36.picha.global.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        return memberRepository.save(member);
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

    private void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member updateMember(Member member) {
        Member findMember = findMemberByMemberId(member.getMemberId());
        Optional.ofNullable(member.getUsername())
                .ifPresent(name -> findMember.setUsername(name));
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> findMember.setPhoneNumber(phoneNumber));
        Optional.ofNullable(member.getAddress())
                .ifPresent(address -> findMember.setAddress(address));
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        return memberRepository.save(findMember);
    }

    public Member findMemberByMemberId(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        return findMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findMemberByMemberEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(Member member) {
        memberRepository.delete(member);
    }

    public Member isEqualToClientIdAndMemberId(Long clientId, Long memberId) {
        Member member = findMemberByMemberId(memberId);

        if (!member.getMemberId().equals(clientId)) {
            throw new BusinessLogicException(ExceptionCode.CLIENT_IS_NOT_EQUAL);
        }

        return member;
    }
}

