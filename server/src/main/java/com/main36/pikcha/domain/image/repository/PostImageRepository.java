package com.main36.pikcha.domain.image.repository;

import com.main36.pikcha.domain.image.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostImageRepository extends JpaRepository<PostImage, Long> {

//    @Query(value = "select p from PostImage as p where p.Post")
//    List<PostImage> findByPostId(long postId);
}
