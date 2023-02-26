package com.main36.pikcha.domain.comment.repository;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentCustomRepository {
    Page<Comment> findCommentByPost(Post post, Pageable pageable);
    List<Comment> findCommentByPost(Post post);
}
