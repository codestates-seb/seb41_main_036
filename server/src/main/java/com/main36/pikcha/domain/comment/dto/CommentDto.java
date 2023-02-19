package com.main36.pikcha.domain.comment.dto;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;


@Data
public class CommentDto {

    @Getter
    public static class Post {
        private Long parentId;
        @NotBlank(message = "댓글 내용을 입력해주세요.")
        private String commentContent;
    }

    @Getter
    public static class Patch {
        @NotBlank(message = "댓글 내용을 입력해주세요.")
        private String commentContent;
    }

}
