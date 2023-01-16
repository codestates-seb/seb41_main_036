package com.main36.picha.domain.comment.service;

import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.comment.repository.CommentRepository;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment){
        Comment findComment = findVerifiedComment(comment.getCommentId());

        // 댓글 내용만 변경 가능
        Optional.ofNullable(comment.getCommentContent())
                .ifPresent(findComment::setCommentContent);
        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(
                page,size, Sort.by("commentId").ascending()
        ));
    }

    public void deleteComment(long commentId){
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }

    private Comment findVerifiedComment(long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }


}
