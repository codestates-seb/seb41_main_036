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
public class AttractionResponseDto {
    private long attractionId;
    private int likes;
    private String attractionName;
    private String attractionImageUrl;
}
