package com.main36.picha.domain.attraction.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class AttractionResponseDto {
    private long attractionId;

    private String attractionName;

    private String attractionDescription;

    private String attractionAddress;

    private String attractionImage;

    private String province;
}
