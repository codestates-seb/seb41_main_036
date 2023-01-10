package com.main36.picha.domain.member.service;

import com.main36.picha.domain.member.dto.MemberPatchDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.repository.MemberRepository;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 멤버 생성
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        // TODO: 멤버 비밀번호 암호화 필요
        // TODO: 멤버 권한부여 필요
        return memberRepository.save(member);

    }

    private void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    // 멤버 업데이트
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMemberById(member.getMemberId());
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

    // 멤버 조회(프로필)
    public Member findMember(Long memberId, String email) {
        Optional<Member> byMemberIdAndEmail = memberRepository.findByMemberIdAndEmail(memberId, email);
        return byMemberIdAndEmail.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 멤버 삭제
    public void deleteMember(long memberId) {
        Member verifiedMemberById = findVerifiedMemberById(memberId);
        memberRepository.delete(verifiedMemberById);
    }


    public Member findVerifiedMemberByEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findVerifiedMemberById(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        return findMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}

