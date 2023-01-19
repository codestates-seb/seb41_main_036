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
public class SinglePostResponseDto {
    private long postId;
    private String postTitle;
    private String postContent;
    private String hashTagContent;
    private long attractionId;
    private String attractionAddress;
    private String attractionName;
    private int views;
    private int likes;
    @Setter
    private Boolean isVoted;
    private String username;
    private String picture;
    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}
