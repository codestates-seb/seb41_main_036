package com.main36.pikcha.domain.hashtag.repository;


import com.main36.pikcha.domain.hashtag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {

    Optional<HashTag> findByHashTagContent(String content);

    @Query(value = "Select h from HashTag as h where h.hashTagContent = :content and h.post.postId = :postId")
    Optional<HashTag> findByPost(String content, long postId);
}
