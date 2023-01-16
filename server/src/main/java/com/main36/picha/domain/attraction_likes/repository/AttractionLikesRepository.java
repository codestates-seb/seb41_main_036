package com.main36.picha.domain.attraction_likes.repository;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction_likes.entity.AttractionLikes;
import com.main36.picha.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttractionLikesRepository extends JpaRepository<AttractionLikes, Long> {
    Optional<AttractionLikes> findByMemberAndAttraction(Member member, Attraction attraction);
}
