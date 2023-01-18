package com.main36.picha.domain.post.controller;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.dto.*;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.mapper.PostMapper;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/posts")
@Slf4j
public class PostController {

    private final PostService postService;
    private final PostMapper mapper;

    private final MemberService memberService;

    private final AttractionService attractionService;

    private final JwtTokenizer jwtTokenizer;

    // 로그인 객체 찾기
    @PostMapping("/register/{attraction-id}")
    public ResponseEntity<DataResponseDto<PostRegisterResponseDto>> registerPost(HttpServletRequest request,
                                                                                 @PathVariable("attraction-id") long attractionId,
                                                                                 @Valid @RequestBody PostRegisterDto postRegisterDto) {
        String username = jwtTokenizer.getUsername(request);
        Member member = memberService.findMember(username);
        Attraction attraction = attractionService.findAttraction(attractionId);

        attraction.setNumOfPosts(attraction.getNumOfPosts()+1);
        Post post = mapper.postRegisterDtoToPost(postRegisterDto, member, attraction);
        Post createPost = postService.createPost(post);

        PostRegisterResponseDto postRegisterResponseDto = mapper.postToPostRegisterResponseDto(createPost);

        return new ResponseEntity<>(new DataResponseDto<>(postRegisterResponseDto), HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{post-id}")
    public ResponseEntity<DataResponseDto<PostRegisterResponseDto>> editPost(@Positive @PathVariable("post-id") long postId,
                                                                     @Valid @RequestBody PostPatchRequestDto postPatchRequestDto) {
        postPatchRequestDto.setPostId(postId);
        Post post = postService.updatePost(mapper.postPatchDtoToPost(postPatchRequestDto));
        PostRegisterResponseDto postRegisterResponseDto = mapper.postToPostRegisterResponseDto(post);

        return ResponseEntity.ok(new DataResponseDto<>(postRegisterResponseDto));
    }

    // 포스트 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity<DataResponseDto<PostResponseDto>> getPost(@Positive @PathVariable("post-id") long postId) {
        Post post = postService.findPost(postId);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(post);

        return ResponseEntity.ok(new DataResponseDto<>(postResponseDto));
    }

    // 포스트 페이지(전체 조회)
    @GetMapping()
    public ResponseEntity<MultiResponseDto> getPosts(@RequestParam(defaultValue = "newest", required = false) String tab,
                                                     @RequestParam(defaultValue = "1", required = false) int page,
                                                     @RequestParam(defaultValue = "9", required = false) int size) {
        Page<Post> postsByNewestByPage = postService.findAllPostsByNewest(page - 1, size);
        List<Post> postsByNewest = postsByNewestByPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostPageResponseDtoList(postsByNewest), postsByNewestByPage), HttpStatus.OK);
    }

    // 포스트 삭제
    @DeleteMapping("delete/{post-id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("post-id") long postId) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
