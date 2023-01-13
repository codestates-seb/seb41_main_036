package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostHomeDto {

    private String username;
    private String userImage;
    private int views;
    private int likes;
    private String postTitle;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
