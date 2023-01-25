package com.main36.pikcha.domain.attraction.mapper;

import com.main36.pikcha.domain.attraction.dto.*;
import com.main36.pikcha.domain.attraction.entity.Attraction;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttractionMapper {
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);
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

    List<AttractionResponseDto> attractionsToAttractionResponseDtos(List<Attraction> attractions);

    List<AttractionMapsResponseDto> attractionsToAttractionMapsResponseDtos(List<Attraction> attractions);
}


