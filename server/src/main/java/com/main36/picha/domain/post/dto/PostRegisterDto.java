package com.main36.picha.domain.post.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;


@Data
public class PostRegisterDto {
    @NotBlank(message = "제목을 입력해주세요.")
    private String postTitle;
    private String postContent;
    private String hashTagContent;
}
