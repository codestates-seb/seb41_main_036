package com.main36.picha.domain.attraction.mapper;

import com.main36.picha.domain.attraction.dto.AttractionPatchDto;
import com.main36.picha.domain.attraction.dto.AttractionPostDto;
import com.main36.picha.domain.attraction.dto.AttractionResponseDto;
import com.main36.picha.domain.attraction.entity.Attraction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttractionMapper {

    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);
    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);

    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction);

    List<AttractionResponseDto> attractionsToAttractionResponses(List<Attraction> attractions);
}

/*public class AttractionMapper {

    public Attraction attractionPostDtoToAttraction(AttractionPostDto postDto){
        return Attraction.builder()
                .attractionId(1L)
                .attractionAddress(postDto.getAttractionAddress())
                .attractionDescription(postDto.getAttractionDescription())
                .attractionName(postDto.getAttractionName())
                .province(postDto.getProvince())
                .build();
    }
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto){
        return Attraction.builder()
                .attractionName(patchDto.getAttractionName())
                .attractionDescription(patchDto.getAttractionDescription())
                .attractionAddress(patchDto.getAttractionAddress())
                .province(patchDto.getProvince())
                .build();
    }
    List<AttractionResponseDto> attractionsToAttractionResponses(List<Attraction> attractions) {
        return null;
    }

    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction){
        return null;
    }
}*/
