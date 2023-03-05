package com.main36.pikcha.domain.attraction.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AttractionPatchDto {
    private Long attractionId;
    private String attractionName;
    private String attractionDescription;
    private String attractionAddress;
    private MultipartFile attractionImage;
    private String province;
}
