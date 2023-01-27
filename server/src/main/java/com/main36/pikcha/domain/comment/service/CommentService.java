package com.main36.pikcha.domain.comment.service;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.comment.repository.CommentRepository;
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

    public Comment createComment(Comment comment) {
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
