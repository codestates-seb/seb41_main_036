package com.main36.pikcha.domain.post_image.repository;

import com.main36.pikcha.domain.post_image.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PostImageRepository extends JpaRepository<PostImage, Long> {

//    @Query(value = "select p from PostImage as p where p.Post")
//    List<PostImage> findByPostId(long postId);
}
