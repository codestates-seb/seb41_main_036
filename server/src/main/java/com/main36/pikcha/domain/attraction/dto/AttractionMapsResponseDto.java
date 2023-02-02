package com.main36.pikcha.domain.attraction.dto;

import lombok.Data;

@Data
public class AttractionMapsResponseDto {
    private Long attractionId;
    private String attractionName;
    private String attractionAddress;
    private String fixedImage;
}
