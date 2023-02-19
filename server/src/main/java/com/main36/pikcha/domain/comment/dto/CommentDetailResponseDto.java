package com.main36.pikcha.domain.comment.dto;

import com.main36.pikcha.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class CommentDetailResponseDto {
    private Long commentId;
    private Long parentId;
    private Long memberId;
    private String username;
    private String memberPicture;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentDetailResponseDto> children;

    public static CommentDetailResponseDto convertCommentToDto(Comment comment){
        return CommentDetailResponseDto.builder()
                .commentId(comment.getCommentId())
                .parentId(comment.getParent() == null ? null : comment.getParent().getCommentId())
                .memberId(comment.getMember().getMemberId())
                .username(comment.getMember().getUsername())
                .memberPicture(comment.getMember().getPicture())
                .commentContent(comment.getCommentContent())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .children(new ArrayList<>())
                .build();
    }
}
