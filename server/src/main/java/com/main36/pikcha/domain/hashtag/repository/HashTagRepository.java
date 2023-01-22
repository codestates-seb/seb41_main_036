package com.main36.pikcha.domain.hashtag.repository;


import com.main36.pikcha.domain.hashtag.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {

    Optional<HashTag> findByHashTagContent(String content);
}
