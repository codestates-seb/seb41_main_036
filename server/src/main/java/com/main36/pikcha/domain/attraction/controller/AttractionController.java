package com.main36.pikcha.domain.attraction.controller;


import com.main36.pikcha.domain.attraction.dto.*;
import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.attraction.mapper.AttractionMapper;
import com.main36.pikcha.domain.attraction.service.AttractionService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.domain.post.dto.PostResponseDto;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post.service.PostService;
import com.main36.pikcha.global.aop.LoginUser;

import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.response.MultiResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.constraints.Positive;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/attractions")
@RequiredArgsConstructor
@Validated
@Slf4j
public class AttractionController {

    private final AttractionService attractionService;
    private final AttractionMapper mapper;
    private final PostService postService;
    private final MemberService memberService;


    // 1. 명소 등록 핸들러
    @PostMapping("/upload")
    public ResponseEntity<DataResponseDto<?>> postAttraction(AttractionPostDto attractionPostDto) throws IOException {

        Attraction attraction = mapper.attractionPostDtoToAttraction(attractionPostDto);

        /*        // dto로 받은 이미지 파일이 있다면
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
        }*/
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.createAttraction(attraction));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    // 2. 명소 수정 핸들러
    @PatchMapping("/edit/{attraction-id}")
    public ResponseEntity<DataResponseDto<?>> patchAttraction(@PathVariable("attraction-id") @Positive long attractionId,
                                                              AttractionPatchDto attractionPatchDto) throws IOException {

        attractionPatchDto.setAttractionId(attractionId);
        Attraction attraction = mapper.attractionPatchDtoToAttraction(attractionPatchDto);

        // 새로운 이미지 파일을 받았다면
        /*if(!attractionPatchDto.getAttractionImage().isEmpty()){
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
        }*/
        AttractionResponseDto response =
                mapper.attractionToAttractionResponseDto(attractionService.updateAttraction(attraction));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    // 3. 명소 1개 정보 요청을 처리하는 핸들러
    // 반환하는  정보 : 명소 정보(Id,이름, 설명, 주소, 이미지 주소), 좋아요 수, 좋아요 눌렀는지, 즐겨찾기 수, 즐겨찾기 눌렀는지

    /*    @GetMapping("/{attraction-id}")
    public ResponseEntity<DataResponseDto<?>> getAttraction(@ClientId Long clientId,
                                        @PathVariable("attraction-id") @Positive long attractionId){
        Attraction attraction = attractionService.findAttraction(attractionId);
        AttractionDetailResponseDto response =
                mapper.attractionToAttractionDetailResponseDto(attraction);
        response.setIsVoted(attractionService.isVoted(clientId, attractionId));
        response.setIsSaved(attractionService.isSaved(clientId,attractionId));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }*/
    @GetMapping(value = {"/{attraction-id}", "/{attraction-id}/{member-id}"})
    public ResponseEntity<DataResponseDto<?>> getAttraction(@PathVariable("attraction-id") @Positive long attractionId,
                                                            @PathVariable(value = "member-id", required = false) Optional<Long> memberId) {
        Attraction attraction = attractionService.findAttraction(attractionId);
        AttractionDetailResponseDto response =
                mapper.attractionToAttractionDetailResponseDto(attraction);
        if (memberId.isEmpty()) {
            response.setIsVoted(false);
            response.setIsSaved(false);
        } else {
            response.setIsVoted(attractionService.isVoted(memberId.get(), attractionId));
            response.setIsSaved(attractionService.isSaved(memberId.get(), attractionId));
        }

        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    // 4. 찾는 '구' 리스트를 받아 명소 Id 기준으로 명소 여러개의 정보 요청을 처리하는 핸들러
    // 반환하는 정보 : 명소 정보(id, 이름, 이미지 주소), 좋아요 수, 즐겨찾기 수(아직 구현안됨)
    @PostMapping(value = {"/filter", "/filter/{member-id}"})
    public ResponseEntity<MultiResponseDto<?>> getFilteredAttractions(@PathVariable("member-id") Optional<Long> memberId,
                                                                      @Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                                      @Positive @RequestParam(required = false, defaultValue = "9") int size,
                                                                      @RequestParam(required = false, defaultValue = "newest") String sort,
                                                                      @RequestBody ProvinceFilterDto filterDto) {
        switch (sort) {
            case "newest":
                sort = "attractionId";
                break;
            case "posts":
                sort = "numOfPosts";
                break;
            case "likes":
                sort = "likes";
                break;
        }
        List<Attraction> attractions = new ArrayList<>();
        Page<Attraction> attractionPage;
        if (filterDto.getProvinces().size() == 0) {
            attractionPage = attractionService.findAllProvincesAttractions(page - 1, size, sort);
        } else {
            attractionPage = attractionService.findFilteredAttractions(filterDto.getProvinces(), page - 1, size, sort);
        }
        attractions = attractionPage.getContent();
        if (memberId.isEmpty()) {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    guestMapping(attractions), attractionPage), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    loginMapping(attractions, memberId.get()), attractionPage), HttpStatus.OK);
        }
    }

    // 지도에 지역구로 명소 표시 :  명소의 id, 이름, 주소, 사진url
    @PostMapping("/maps")
    public ResponseEntity<MultiResponseDto<?>> getMapsAttractions(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                                  @Positive @RequestParam(required = false, defaultValue = "100") int size,
                                                                  @RequestParam(required = false, defaultValue = "newest") String sort,
                                                                  @RequestBody ProvinceFilterDto filterDto) {
        switch (sort) {
            case "newest":
                sort = "attractionId";
                break;
            case "posts":
                sort = "numOfPosts";
                break;
            case "likes":
                sort = "likes";
                break;
        }
        List<Attraction> attractions;
        Page<Attraction> attractionPage;
        if (filterDto.getProvinces().size() == 0) {
            attractionPage = attractionService.findAllProvincesAttractions(page - 1, size, sort);
        } else {
            attractionPage = attractionService.findFilteredAttractions(filterDto.getProvinces(), page - 1, size, sort);
        }
        attractions = attractionPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.attractionsToAttractionMapsResponseDtos(attractions), attractionPage), HttpStatus.OK);
    }

    // 5. 명소 Id를 기준으로 명소 여러개의 정보 요청을 처리하는 핸들러
    // 반환하는 정보 : 명소 정보(id, 이름, 이미지 주소), 좋아요 수, 즐겨찾기 수
    @GetMapping(value = {"/home", "/home/{member-id}"})
    public ResponseEntity<MultiResponseDto<?>> getAttractions(@PathVariable("member-id") Optional<Long> memberId,
                                                              @Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                              @Positive @RequestParam(required = false, defaultValue = "9") int size) {
        log.info("memberId ={}", memberId);
        Page<Attraction> attractionPage = attractionService.findAttractions(page - 1, size);
        List<Attraction> attractions = attractionPage.getContent();
        if (memberId.isEmpty()) {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    guestMapping(attractions), attractionPage), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    loginMapping(attractions, memberId.get()), attractionPage), HttpStatus.OK);
        }

    }

    // + 명소 이름 검색 핸들러
    @PostMapping(value = {"/search", "/search/{member-id}"})
    public ResponseEntity<MultiResponseDto<?>> getSearchedAttractions(@PathVariable("member-id") Optional<Long> memberId,
                                                                      @Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                                      @Positive @RequestParam(required = false, defaultValue = "9") int size,
                                                                      @RequestParam(required = false, defaultValue = "newest") String sort,
                                                                      @RequestParam("keyword") String keyword,
                                                                      @RequestBody ProvinceFilterDto filterDto) {
        switch (sort) {
            case "newest":
                sort = "attractionId";
                break;
            case "posts":
                sort = "numOfPosts";
                break;
            case "likes":
                sort = "likes";
                break;
        }
        List<Attraction> attractions;
        Page<Attraction> attractionPage;
        if (filterDto.getProvinces().size() == 0) {
            attractionPage = attractionService.findAllSearchedAttractions(keyword, page - 1, size, sort);
        } else {
            attractionPage = attractionService.findFilteredSearchedAttractions(filterDto.getProvinces(), keyword, page - 1, size, sort);
        }
        attractions = attractionPage.getContent();
        if (memberId.isEmpty()) {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    guestMapping(attractions), attractionPage), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MultiResponseDto<>(
                    loginMapping(attractions, memberId.get()), attractionPage), HttpStatus.OK);
        }
    }

    // 6. 명소를 아예 삭제하는 요청을 처리하는 핸들러
    @DeleteMapping("/delete/{attraction-id}")
    public ResponseEntity<HttpStatus> deleteAttraction(@PathVariable("attraction-id") @Positive long attractionId) {
        attractionService.deleteAttraction(attractionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 7. 명소 좋아요!
    @LoginUser
    @PostMapping("/likes/{attraction-id}")
    public ResponseEntity<DataResponseDto<?>> voteAttraction(Member loginUser,
                                                             @PathVariable("attraction-id") @Positive long attractionId) {
        // 회원 정보를 받아온다
        Member member = memberService.findMemberByMemberId(loginUser.getMemberId());

        // 명소 정보를 찾는다
        Attraction attraction = attractionService.findAttraction(attractionId);

        // 회원과 명소 정보를 바탕으로 좋아요가 눌러져 있다면 true, 아니면 false를 받는다.
        boolean status = attractionService.voteAttraction(member, attraction);

        // responseDto 생성
        AttractionLikesResponseDto response = new AttractionLikesResponseDto();
        response.setIsVoted(status);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    // 8. 명소 즐겨찾기
    @LoginUser
    @PostMapping("/saves/{attraction-id}")
    public ResponseEntity<DataResponseDto<?>> saveAttraction(Member loginUser,
                                                             @PathVariable("attraction-id") @Positive long attractionId) {

        Member member = memberService.findMemberByMemberId(loginUser.getMemberId());

        // 명소 정보를 찾는다
        Attraction attraction = attractionService.findAttraction(attractionId);

        boolean status = attractionService.saveAttraction(member, attraction);

        AttractionSaveResponseDto response = new AttractionSaveResponseDto();
        response.setIsSaved(status);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    // map 상세 페이지
    @GetMapping(value = {"/mapdetails/{attraction-id}", "/mapdetails/{attraction-id}/{member-id}"})
    public ResponseEntity getMapDetails(@PathVariable(value = "member-id", required = false) Long memberId,
                                        @PathVariable("attraction-id") @Positive long attractionId) {
        Attraction attraction = attractionService.findAttraction(attractionId);
        List<Post> postList = attraction.getPosts();
        AttractionMapsDetailResponseDto response
                = AttractionMapsDetailResponseDto.builder()
                .attractionId(attraction.getAttractionId())
                .attractionName(attraction.getAttractionName())
                .attractionAddress(attraction.getAttractionAddress())
                .fixedImage(attraction.getFixedImage())
                .numOfPosts(attraction.getNumOfPosts())
                .likes(attraction.getLikes())
                .saves(attraction.getSaves())
                .build();
        List<PostResponseDto.MapsImageUrlResponse> mapResponses = new ArrayList<>();
        postList.stream()
                .forEach(post -> {
                    post.getPostImages().stream().forEach(postImage -> {
                        PostResponseDto.MapsImageUrlResponse element = new PostResponseDto.MapsImageUrlResponse();
                        element.setPostId(post.getPostId());
                        element.setImageUrls(postImage.getPostImageUrl());
                        mapResponses.add(element);
                    });
                });
        response.setPostIdAndUrls(mapResponses);
        if (memberId == null) {
            response.setIsVoted(false);
            response.setIsSaved(false);
        } else {
            response.setIsVoted(attractionService.isVoted(memberId, attractionId));
            response.setIsSaved(attractionService.isSaved(memberId, attractionId));
        }

        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    private List<AttractionResponseDto> loginMapping(List<Attraction> attractionList, long memberId) {
        return attractionList.stream()
                .map(attraction -> AttractionResponseDto.builder()
                        .attractionId(attraction.getAttractionId())
                        .attractionName(attraction.getAttractionName())
                        .fixedImage(attraction.getFixedImage())
                        .numOfPosts(attraction.getNumOfPosts())
                        .isVoted(attractionService.isVoted(memberId, attraction.getAttractionId()))
                        .isSaved(attractionService.isSaved(memberId, attraction.getAttractionId()))
                        .likes(attraction.getLikes())
                        .saves(attraction.getSaves())
                        .build())
                .collect(Collectors.toList());
    }

    private List<AttractionResponseDto> guestMapping(List<Attraction> attractionList) {
        return attractionList.stream()
                .map(attraction -> AttractionResponseDto.builder()
                        .attractionId(attraction.getAttractionId())
                        .attractionName(attraction.getAttractionName())
                        .fixedImage(attraction.getFixedImage())
                        .numOfPosts(attraction.getNumOfPosts())
                        .isVoted(false)
                        .isSaved(false)
                        .likes(attraction.getLikes())
                        .saves(attraction.getSaves())
                        .build())
                .collect(Collectors.toList());
    }
}
