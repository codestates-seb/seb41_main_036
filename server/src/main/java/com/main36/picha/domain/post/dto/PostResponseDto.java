package com.main36.picha.domain.post.dto;


import com.main36.picha.domain.comment.dto.CommentResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PostResponseDto {
    private Long postId;
    private String postTitle;
    private String postContent;
    private Long memberId;
    private String username;
    private String picture;
    private Long attractionId;
    private String attractionName;
    private String attractionAddress;
    private int views;
    private int likes;

    //TODO : HashTag
//    private List<String> hashtags;
    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;
}
