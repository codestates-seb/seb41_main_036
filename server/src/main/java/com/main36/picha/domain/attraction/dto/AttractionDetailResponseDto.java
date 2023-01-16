package com.main36.picha.domain.attraction.dto;

import com.main36.picha.domain.post.dto.PostResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class AttractionDetailResponseDto {
    private long attractionId;
    private int likes;
    private boolean isVoted;
    private String attractionName;
    private String attractionDescription;
    private String attractionAddress;
    private String attractionImageUrl;
    private List<PostResponseDto> posts;

    @Builder
    public AttractionDetailResponseDto(long attractionId, int likes, String attractionName, String attractionDescription, String attractionAddress, String attractionImageUrl, List<PostResponseDto> posts) {
        this.attractionId = attractionId;
        this.likes = likes;
        this.attractionName = attractionName;
        this.attractionDescription = attractionDescription;
        this.attractionAddress = attractionAddress;
        this.attractionImageUrl = attractionImageUrl;
        this.posts = posts;
    }
}
