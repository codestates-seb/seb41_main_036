package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.comment.dto.CommentResponseDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter(AccessLevel.NONE)
@Builder
public class PostResponseDto {

    private long postId;
    private String postTitle;
    private String postContent;
    private String hashTagContent;
    private long attractionId;
    private String attractionAddress;
    private String attractionName;
    private int views;
    private int likes;
    private String username;
    private String picture;
    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    @Data
    @Builder
    public static class Home {
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

}