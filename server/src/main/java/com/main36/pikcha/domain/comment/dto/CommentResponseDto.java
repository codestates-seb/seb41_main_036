package com.main36.pikcha.domain.comment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    private Long commentId;
    private Long parentId;
    private Long memberId;
    private String username;
    private String memberPicture;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
