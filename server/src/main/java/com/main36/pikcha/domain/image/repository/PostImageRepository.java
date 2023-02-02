package com.main36.pikcha.domain.image.repository;

import com.main36.pikcha.domain.image.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    Optional<PostImage> findByPostImageUrl(String url);
}
