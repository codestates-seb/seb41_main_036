package com.main36.pikcha.domain.comment.service;

import com.main36.pikcha.domain.comment.dto.CommentDto;
import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.comment.repository.CommentCustomRepositoryImpl;
import com.main36.pikcha.domain.comment.repository.CommentRepository;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentCustomRepositoryImpl customRepository;

    public Comment createComment(Comment comment, Long parentId) {
        // 부모가 있는 댓글이라면
        if(parentId != null) {
            // 부모댓글의 유효성 검증
            Comment parent = findVerifiedComment(parentId);
            // 부모 아래에 추가
            comment.updateParent(parent);
        }
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment){ return commentRepository.save(comment);}

    @Transactional(readOnly = true)
    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    @Transactional(readOnly = true)
    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(
                page, size, Sort.by("commentId").ascending()
        ));
    }

    @Transactional(readOnly = true)
    public Page<Comment> findComments(int page, int size, Post post){
        return customRepository.findCommentByPost(post, PageRequest.of(page, size));
    }
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Transactional(readOnly = true)
    public Comment findVerifiedComment(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public Comment verifyClientId(long clientId, long commentId) {

        Comment comment = findComment(commentId);
        if(clientId == 1) return comment;
        if (!(comment.getMember().getMemberId().equals(clientId))) {
            throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_EQUAL);
        }

        return comment;
    }


}
