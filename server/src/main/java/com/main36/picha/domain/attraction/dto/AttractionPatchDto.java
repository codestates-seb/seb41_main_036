package com.main36.picha.domain.attraction.dto;

import lombok.Data;

@Data
public class AttractionPatchDto {
    private Long attractionId;

    private String attractionName;

    private String attractionDescription;

    private String attractionAddress;

    private String attractionImage;

    private String province;
}
