package com.main36.pikcha.domain.post.dto;

import com.main36.pikcha.domain.comment.dto.CommentResponseDto;
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
    @Data
    @Builder
    public static class Home {
        private Long postId;
        private Long memberId;
        private String username;
        private String memberPicture;
        private String pictureUrl;
        private int views;
        private int likes;
        private Boolean isVoted;
        private String postTitle;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Data
    @Builder
    public static class Detail {
        private long memberId;
        private long postId;
        private String postTitle;
        private List<String> postContents;
        private List<String> postHashTags;
        private List<String> postImageUrls;
        private long attractionId;
        private String attractionAddress;
        private String attractionName;
        private int views;
        private int likes;
        private Boolean isVoted;
        private String username;
        private String picture;
//        private List<CommentResponseDto> comments;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Data
    public static class MapsImageUrlResponse {
        private long postId;
        private String imageUrls;

    }

    @Data
    @Builder
    public static class Profile {
        private Long postId;
        private String postTitle;
        private String pictureUrl;
        private int views;
        private int likes;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
