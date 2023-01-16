package com.main36.picha.domain.post.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostRegisterResponseDto {
    private Long memberId;
    private Long postId;
    private String attractionName;
    private String attractionAddress;
    private String postTitle;
    private String postContent;
    private int views;
    private int likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
