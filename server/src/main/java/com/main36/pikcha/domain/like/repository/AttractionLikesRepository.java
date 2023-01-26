package com.main36.pikcha.domain.like.repository;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.like.entity.AttractionLikes;
import com.main36.pikcha.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AttractionLikesRepository extends JpaRepository<AttractionLikes, Long> {
    Optional<AttractionLikes> findByMemberAndAttraction(Member member, Attraction attraction);
    @Query(value = "select c from AttractionLikes c where c.member.memberId = :memberId and c.attraction.attractionId = :attractionId")
    Optional<AttractionLikes> findByMemberIdAndAttractionId(long memberId, long attractionId);
}
