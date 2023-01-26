package com.main36.pikcha.domain.like.repository;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.like.entity.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostLikesRepository extends JpaRepository<PostLikes, Long> {
    Optional<PostLikes> findByMemberAndPost(Member member, Post post);

    @Query(value = "select p from PostLikes p where p.member.memberId = :memberId and p.post.postId = :postId")
    Optional<PostLikes> findByMemberIdAndPostId(long memberId, long postId);
}
