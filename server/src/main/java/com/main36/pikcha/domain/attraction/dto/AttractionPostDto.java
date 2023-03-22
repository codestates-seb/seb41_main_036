package com.main36.pikcha.domain.attraction.dto;

import lombok.Data;

@Data
public class AttractionPostDto {
    private String attractionName;
    private String attractionDescription;
    private String attractionAddress;
//    private MultipartFile attractionImage;
    private String province;
}
