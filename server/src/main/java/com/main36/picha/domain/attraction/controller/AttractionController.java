package com.main36.picha.domain.attraction.controller;


import com.main36.picha.domain.attraction.dto.AttractionFilterDto;
import com.main36.picha.domain.attraction.dto.AttractionPatchDto;
import com.main36.picha.domain.attraction.dto.AttractionPostDto;
import com.main36.picha.domain.attraction.dto.AttractionResponseDto;
import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.mapper.AttractionMapper;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.domain.attraction_file.entity.AttractionImage;
import com.main36.picha.domain.attraction_file.service.AttractionImageService;
import com.main36.picha.global.config.S3Service;
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
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/attractions")
@RequiredArgsConstructor
@Validated
public class AttractionController {

    private final S3Service s3Service;
    private final AttractionService attractionService;
    private final AttractionMapper mapper;
    private final AttractionImageService imageService;

    // s3에 저장될 위치

    @PostMapping("/upload")
    public ResponseEntity postAttraction(AttractionPostDto attractionPostDto) throws IOException {

        Attraction attraction = mapper.attractionPostDtoToAttraction(attractionPostDto);

        // dto로 받은 이미지 파일이 있다면
        if(!attractionPostDto.getAttractionImage().isEmpty()){
            // s3에 저장하고 AttractionImage를 attraction안에 저장
            AttractionImage attractionImage =
                    imageService.createAttractionImage(attractionPostDto.getAttractionImage());
            attraction.setAttractionImage(attractionImage);
        }
        // 이미지 파일을 받지 않았다면
        else {
            // AttractionImage 객체를 하나 만들어서 attraction에 넣는다.
            AttractionImage attractionImage = new AttractionImage();
            attraction.setAttractionImage(attractionImage);
        }
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.createAttraction(attraction));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{attraction-id}")
    public ResponseEntity patchAttraction(@PathVariable("attraction-id") @Positive long attractionId,
                                          AttractionPatchDto attractionPatchDto) throws IOException {

        attractionPatchDto.setAttractionId(attractionId);
        Attraction attraction= mapper.attractionPatchDtoToAttraction(attractionPatchDto);

        // 새로운 이미지 파일을 받았다면
        if(!attractionPatchDto.getAttractionImage().isEmpty()){
            // 고칠 명소를 찾고
            Attraction findAttraction = attractionService.findAttraction(attractionId);
            // 이미지가 이미 있다면 명소의 이미지를 s3와 데이터베이스에서 삭제
            if(findAttraction.getAttractionImage() != null) {
                imageService.deleteAttractionImage(findAttraction.getAttractionImage().getAttractionImageId());
            }
            // 새로 받은 이미지를 저장한다
            AttractionImage attractionImage =
                    imageService.createAttractionImage(attractionPatchDto.getAttractionImage());
            attraction.setAttractionImage(attractionImage);
        }
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.updateAttraction(attraction));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{attraction-id}")
    public ResponseEntity getAttraction(@PathVariable("attraction-id") @Positive long attractionId){
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.findAttraction(attractionId));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity getFilteredAttractions(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                 @Positive @RequestParam(required = false, defaultValue = "9") int size,
                                                 @RequestBody AttractionFilterDto filterDto){
        Page<Attraction> attractionPage = attractionService.findFilteredAttractions(filterDto.getProvinces(), page-1, size);
        List<Attraction> attractions = attractionPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.attractionsToAttractionResponses(attractions),attractionPage), HttpStatus.OK);
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
