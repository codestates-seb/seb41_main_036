package com.main36.pikcha.domain.attraction.dto;

import com.main36.pikcha.domain.post.dto.PostResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AttractionMapsDetailResponseDto {
    private Long attractionId;
    private String attractionName;
    private String attractionAddress;
    private String fixedImage;
    private Long numOfPosts;
    private Long likes;
    private Boolean isVoted;
    private Long saves;
    private Boolean isSaved;
    private List<PostResponseDto.MapsImageUrlResponse> postIdAndUrls;


    @Builder
    public AttractionMapsDetailResponseDto(Long attractionId, String attractionName, String attractionAddress, String fixedImage, Long numOfPosts, Long likes, Long saves) {
        this.attractionId = attractionId;
        this.attractionName = attractionName;
        this.attractionAddress = attractionAddress;
        this.fixedImage = fixedImage;
        this.numOfPosts = numOfPosts;
        this.likes = likes;
        this.saves = saves;
    }
}
