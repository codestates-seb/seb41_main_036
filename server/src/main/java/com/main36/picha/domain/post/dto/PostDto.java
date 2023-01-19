package com.main36.picha.domain.post.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

public class PostDto {
    @Data
    public static class Post {
        @NotBlank(message = "제목을 입력해주세요.")
        private String postTitle;
        private String postContent;
        private String hashTagContent;
    }

    @Data
    public static class Patch {

        private Long postId;
        @NotBlank(message = "제목을 입력해주세요.")
        private String postTitle;
        private String postContent;

        //TODO: 정규표현식 적용 -> []
        private String hashTagContent;

    }

}
