package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostRegisterDto {
    private Long memberId;
    private Long postId;
    private String attractionName;
    private String postTitle;
    private String attractionAddress;
    private String postContent;
    private LocalDateTime createdAt;
}
