package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.comment.dto.CommentResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostDetailPageResponseDto {
    private long postId;
    private String postTitle;
    private long attractionId;
    private String attractionAddress;
    private String content;
    //    private List<HashTag> hashTagList;
    private int views;
    private int likes;
//    private Boolean isVoted;
    private String username;
    private String picture;
    private List<CommentResponseDto> comments;
    private LocalDateTime createdAt;

}
