package com.main36.picha.domain.comment.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;


@Data
public class CommentPostDto {
    private String commentContent;
}
