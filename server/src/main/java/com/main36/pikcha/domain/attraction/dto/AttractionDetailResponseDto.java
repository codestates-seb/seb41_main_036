package com.main36.pikcha.domain.attraction.dto;

import lombok.Builder;
import lombok.Data;

// 명소 상세 페이지
@Data
public class AttractionDetailResponseDto {
    private Long attractionId;
    private Long likes;
    private Long saves;
    private Boolean isVoted;
    private Boolean isSaved;
    private String attractionName;
    private String attractionDescription;
    private String attractionAddress;
    private String fixedImage;

//    private List<PostResponseDto> posts;
    @Builder
    public AttractionDetailResponseDto(Long attractionId, Long likes, Long saves, String attractionName, String attractionDescription, String attractionAddress, String fixedImage) {
        this.attractionId = attractionId;
        this.likes = likes;
        this.saves = saves;
        this.attractionName = attractionName;
        this.attractionDescription = attractionDescription;
        this.attractionAddress = attractionAddress;
        this.fixedImage = fixedImage;
    }
}
