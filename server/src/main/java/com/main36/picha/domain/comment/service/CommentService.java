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

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment findComment(long commentId){
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(
                page,size, Sort.by("commentId").ascending()
        ));
    }

    public void deleteComment(Comment comment){
        commentRepository.delete(comment);
    }

    public Comment findVerifiedComment(long commentId){
        return commentRepository.findById(commentId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public Comment verifyClientId(long clientId, long commentId) {
        Comment comment = findComment(commentId);

        if (!comment.getMember().getMemberId().equals(clientId)) {
            throw new BusinessLogicException(ExceptionCode.CLIENT_IS_NOT_EQUAL);
        }

        return comment;
    }


}
