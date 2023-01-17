package com.main36.picha.domain.attraction.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Builder
// 명소 카드형식
public class AttractionResponseDto {
    private Long attractionId;
    private String attractionName;
    private String fixedImage;
    private Long likes;
    private Long saves;

//    private Long postNumber;
}
