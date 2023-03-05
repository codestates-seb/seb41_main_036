package com.main36.pikcha.domain.attraction.mapper;

import com.main36.pikcha.domain.attraction.dto.*;
import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttractionMapper {
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);

    @Mapping(target = "fixedImage", source = "attractionImage.attractionImageUrl")
    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction);
    default AttractionDetailResponseDto attractionToAttractionDetailResponseDto(Attraction attraction){
        return AttractionDetailResponseDto.builder()
                .attractionId(attraction.getAttractionId())
                .likes(attraction.getLikes())
                .saves(attraction.getSaves())
                .attractionName(attraction.getAttractionName())
                .attractionDescription(attraction.getAttractionDescription())
                .attractionAddress(attraction.getAttractionAddress())
                .fixedImage(attraction.getFixedImage())
                .build();
    }
    List<AttractionMapsResponseDto> attractionsToAttractionMapsResponseDtos(List<Attraction> attractions);
    List<AttractionRankingResponseDto> attractionsToAttractionRankResponseDtos(List<Attraction> attractions);
}


