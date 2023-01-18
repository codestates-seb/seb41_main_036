package com.main36.picha.domain.post.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PostPatchDto {

    private Long postId;
    @NotBlank(message = "제목을 입력해주세요.")
    private String postTitle;
    private String postContent;
    private String hashTagContent;

}
