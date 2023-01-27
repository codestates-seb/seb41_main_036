package com.main36.pikcha.domain.save.dto;

import com.main36.pikcha.domain.attraction.dto.AttractionResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SaveResponseDto {

    private Long attractionId;
    private String attractionName;
    private String fixedImage;
    private Long likes;
    private Long saves;

}
