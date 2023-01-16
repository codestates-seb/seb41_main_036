package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.comment.dto.CommentResponseDto;

import java.time.LocalDateTime;
import java.util.List;

public class PostPatchResponseDto {
    private Long memberId;
    private Long postId;
    private String attractionName;
    private String attractionAddress;
    private String postTitle;
    private String postContent;
    private int views;
    private int likes;

    //TODO : HashTag
//    private List<String> hashtags;

    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
