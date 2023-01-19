package com.main36.picha.domain.member.repository;


import com.main36.picha.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(String memberId);
    Optional<Member> findByEmail(String email);

    Optional<Member> findByUsername(String username);
    Optional<Member> findByMemberId(Long memberId);


}
