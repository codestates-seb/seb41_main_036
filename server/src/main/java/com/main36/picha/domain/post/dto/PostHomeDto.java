package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostHomeDto {
    private Long postId;
    private Long memberId;
    private String username;
    private String picture;
    private int views;
    private int likes;
    private String postTitle;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}