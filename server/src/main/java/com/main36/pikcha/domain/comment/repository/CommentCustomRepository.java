package com.main36.pikcha.domain.comment.repository;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentCustomRepository {
    Page<Comment> findCommentByPost(Post post, Pageable pageable);
}
