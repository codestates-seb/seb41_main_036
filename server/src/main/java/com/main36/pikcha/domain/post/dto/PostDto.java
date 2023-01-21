package com.main36.pikcha.domain.post.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.List;

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

    @Data
    public static class ImageTest{
        private MultipartFile image;
    }

    @Data
    public static class ImageTest2{
        private String postTitle;
        private String postContent;
        private MultipartFile image;
    }
    @Data
    public static class ImageTest3{
        private String postContent;
        private MultipartFile image;
    }

    @Data
    public static class ImageTest4{
        private String postTitle;
        private String postContent;
    }

    @Data
    public static class ImageTest5{
        private List<MultipartFile> images;
    }
    @Data
    public static class ImageTest6{
        private String postTitle;
        private String postContent;
        private List<MultipartFile> images;
    }

}
