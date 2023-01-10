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

    @Mapping(target = "attractionImage", constant = "abc")
//    @Mapping(target = "attractionId", ignore = true)
    Attraction attractionPostDtoToAttraction(AttractionPostDto postDto);

//    default Attraction attractionPostDtoToAttraction(AttractionPostDto postDto){
//        return Attraction.builder()
//                .attractionId(1L)
//                .attractionAddress(postDto.getAttractionAddress())
//                .attractionDescription(postDto.getAttractionDescription())
//                .attractionName(postDto.getAttractionName())
//                .province(postDto.getProvince())
//                .build();
//    }
    @Mapping(target = "attractionImage", ignore = true)
    Attraction attractionPatchDtoToAttraction(AttractionPatchDto patchDto);
    List<AttractionResponseDto> attractionsToAttractionResponses(List<Attraction> attractions);

    AttractionResponseDto attractionToAttractionResponseDto(Attraction attraction);




}
