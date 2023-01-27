package com.main36.pikcha.domain.attraction.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
// 명소 카드형식
public class AttractionResponseDto {
    private Long attractionId;
    private String attractionName;
    private String fixedImage;
    private Long numOfPosts;
    private Boolean isVoted;
    private Boolean isSaved;
    private Long likes;
    private Long saves;
//    private Long postNumber;
}
