package com.main36.picha.domain.attraction.mapper;

import com.main36.picha.domain.attraction.dto.AttractionPatchDto;
import com.main36.picha.domain.attraction.dto.AttractionPostDto;
import com.main36.picha.domain.attraction.dto.AttractionResponseDto;
import com.main36.picha.domain.attraction.entity.Attraction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AttractionMapper {
    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);
    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);

    @Mapping(target = "attractionImageUrl", source = "attractionImage.attractionImageFileUrl")
    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction);

    List<AttractionResponseDto> attractionsToAttractionResponses(List<Attraction> attractions);
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
