package com.main36.picha.domain.save.repository;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction_likes.entity.AttractionLikes;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.save.entity.Save;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SaveRepository extends JpaRepository<Save, Long> {
    Optional<Save> findByMemberAndAttraction(Member member, Attraction attraction);
}