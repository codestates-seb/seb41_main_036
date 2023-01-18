package com.main36.picha.domain.comment.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
public class CommentPostDto {

    @NotBlank(message = "댓글 내용을 입력해주세요.")
    private String commentContent;
}
