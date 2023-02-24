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

import java.util.List;
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
    @Transactional(readOnly = true)
    public List<Comment> findComments(Post post){
        return customRepository.findCommentByPost(post);
    }
    public void deleteComment(Comment comment) {
        // 자식이 있는 댓글이라면
        if(comment.getChildren().size() != 0) {
            // 삭제 상태로 변경
            comment.changeStatus(Comment.CommentStatus.Dead);
        }
        // 자식이 없는 댓글이라면
        else {
            // 삭제 가능한 조상 댓글을 전부 삭제
            commentRepository.delete(getDeletableAncestorComment(comment));
        }
    }

    public Comment getDeletableAncestorComment(Comment comment) {
        Comment parent = comment.getParent();
        // 1. 부모 댓글이 존재하고 2. 부모의 자식이 1개이며 3. 부모가 상태가 dead인 경우
        if(parent != null && parent.getChildren().size() == 1 && parent.getStatus() == Comment.CommentStatus.Dead){
            // 재귀로 삭제할 조상을 모두 리턴한다
            return getDeletableAncestorComment(parent);
        }
        return comment;
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

    public Long countAllCommentsByPost(Post post){
        return commentRepository.countByPost(post);
    }


}
