package com.main36.picha.domain.attraction.mapper;

import com.main36.picha.domain.attraction.dto.AttractionDetailResponseDto;
import com.main36.picha.domain.attraction.dto.AttractionPatchDto;
import com.main36.picha.domain.attraction.dto.AttractionPostDto;
import com.main36.picha.domain.attraction.dto.AttractionResponseDto;
import com.main36.picha.domain.attraction.entity.Attraction;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttractionMapper {
//    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);
//    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);
//    @Mapping(target = "attractionImageUrl", source = "attractionImage.attractionImageFileUrl")
    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction);
//    @Mapping(target = "attractionImageUrl", source = "attractionImage.attractionImageFileUrl")
//    @Mapping(target = "isVoted", ignore = true)
//    @Mapping(target = "attractionImageUrl", source = "attractionImage.attractionImageFileUrl")
    default AttractionDetailResponseDto attractionToAttractionDetailResponseDto(Attraction attraction){
//        Optional.ofNullable(attraction.getAttractionImage().getAttractionImageFileUrl()).orElse("")
        return AttractionDetailResponseDto.builder()
                .attractionId(attraction.getAttractionId())
                .likes(attraction.getLikes())
                .saves(attraction.getSaves())
                .attractionName(attraction.getAttractionName())
                .attractionDescription(attraction.getAttractionAddress())
                .attractionAddress(attraction.getAttractionAddress())
                .build();
    };

    List<AttractionResponseDto> attractionsToAttractionResponseDtos(List<Attraction> attractions);
}

/*@Component
public class AttractionMapper {

    public Attraction attractionPostDtoToAttraction(AttractionPostDto postDto){
        return Attraction.builder()
                .attractionAddress(postDto.getAttractionAddress())
                .attractionDescription(postDto.getAttractionDescription())
                .attractionName(postDto.getAttractionName())
                .province(postDto.getProvince())
                .build();
    }
    public Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto){
        return Attraction.builder()
                .attractionName(patchDto.getAttractionName())
                .attractionDescription(patchDto.getAttractionDescription())
                .attractionAddress(patchDto.getAttractionAddress())
                .province(patchDto.getProvince())
                .build();
    }
    public List<AttractionResponseDto> attractionsToAttractionResponses(List<Attraction> attractions) {
        return attractions.stream()
                .map(attraction -> AttractionResponseDto
                        .builder()
                        .attractionId(attraction.getAttractionId())
                        .attractionName(attraction.getAttractionName())
                        .attractionDescription(attraction.getAttractionDescription())
                                .province(attraction.getProvince()).build())
                .collect(Collectors.toList());
    }

    public AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction){
        return AttractionResponseDto
                .builder()
                .attractionId(attraction.getAttractionId())
                .attractionName(attraction.getAttractionName())
                .attractionDescription(attraction.getAttractionDescription())
                .province(attraction.getProvince())
                .build();
    }
}*/