package com.main36.pikcha.domain.comment.repository;


import com.main36.pikcha.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Long countBy();
}
