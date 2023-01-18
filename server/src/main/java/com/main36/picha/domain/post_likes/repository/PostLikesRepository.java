package com.main36.picha.domain.post_likes.repository;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction_likes.entity.AttractionLikes;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post_likes.entity.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikesRepository extends JpaRepository<PostLikes, Long> {
    Optional<PostLikes> findByMemberAndPost(Member member, Post post);
}
