package com.main36.picha.domain.attraction.controller;


import com.main36.picha.domain.attraction.dto.AttractionPatchDto;
import com.main36.picha.domain.attraction.dto.AttractionPostDto;
import com.main36.picha.domain.attraction.dto.AttractionResponseDto;
import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.mapper.AttractionMapper;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/attractions")
@RequiredArgsConstructor
@Validated
public class AttractionController {

    private final AttractionService attractionService;
    private final AttractionMapper mapper;

    @PostMapping
    public ResponseEntity postAttraction(@RequestBody AttractionPostDto attractionPostDto) {
        Attraction attraction = mapper.attractionPostDtoToAttraction(attractionPostDto);
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.createAttraction(attraction));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{attraction-id}")
    public ResponseEntity patchAttraction(@PathVariable("attraction-id") @Positive long attractionId,
                                          AttractionPatchDto attractionPatchDto){
        attractionPatchDto.setAttractionId(attractionId);

        AttractionResponseDto response = mapper.attractionToAttractionResponseDto(
                attractionService.updateAttraction(mapper.attractionPatchDtoToAttraction(attractionPatchDto))
        );

        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{attraction-id}")
    public ResponseEntity getAttraction(@PathVariable("attraction-id") @Positive long attractionId){
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.findAttraction(attractionId));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{filters}")
    public ResponseEntity getAttractionsByFilter(@PathVariable("filters") String filters){
        return null;
    }

    @GetMapping
    public ResponseEntity getAttractions(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                         @Positive @RequestParam(required = false, defaultValue = "9") int size){
        Page<Attraction> attractionPage = attractionService.findAttractions(page-1, size);
        List<Attraction> attractions = attractionPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(
                mapper.attractionsToAttractionResponses(attractions),attractionPage), HttpStatus.OK);
    }

    @DeleteMapping("/{attraction-id}")
    public ResponseEntity deleteAttraction(@PathVariable("attraction-id") @Positive long attractionId){
        attractionService.deleteAttraction(attractionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
