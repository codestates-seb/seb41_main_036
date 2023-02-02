package com.main36.pikcha.domain.comment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponseDto {
    private Long commentId;
    private Long memberId;
    private String username;
    private String memberPicture;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @Builder
    public CommentResponseDto(Long commentId, Long memberId, String username, String memberPicture,
                              String commentContent, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.commentId = commentId;
        this.memberId = memberId;
        this.username = username;
        this.memberPicture = memberPicture;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
