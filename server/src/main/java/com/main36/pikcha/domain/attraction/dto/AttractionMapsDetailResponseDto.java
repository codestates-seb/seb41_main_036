package com.main36.pikcha.domain.attraction.dto;

import com.main36.pikcha.domain.post.dto.PostResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AttractionMapsDetailResponseDto {
    private String attractionName;
    private String attractionAddress;
    private long likes;
    private Boolean isVoted;
    private long saves;
    private Boolean isSaved;
    private List<PostResponseDto.MapsImageUrlResponse> postIdAndUrls;

    @Builder
    public AttractionMapsDetailResponseDto(String attractionName, String attractionAddress, long likes, long saves) {
        this.attractionName = attractionName;
        this.attractionAddress = attractionAddress;
        this.likes = likes;
        this.saves = saves;
    }
}
