package com.main36.picha.domain.comment.dto;

import com.main36.picha.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    private Long commentId;
    private Long memberId;
    private String username;
    private String memberPicture;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
