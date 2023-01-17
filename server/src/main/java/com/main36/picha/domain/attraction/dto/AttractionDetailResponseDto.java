package com.main36.picha.domain.attraction.dto;

import com.main36.picha.domain.post.dto.PostResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

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
    public AttractionDetailResponseDto(Long attractionId, Long likes, Long saves, String attractionName, String attractionDescription, String attractionAddress/*, String attractionImageUrl*/) {
        this.attractionId = attractionId;
        this.likes = likes;
        this.saves = saves;
        this.attractionName = attractionName;
        this.attractionDescription = attractionDescription;
        this.attractionAddress = attractionAddress;
//        this.attractionImageUrl = attractionImageUrl;
    }
}
