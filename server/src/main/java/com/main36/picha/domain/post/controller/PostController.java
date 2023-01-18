package com.main36.picha.domain.post.controller;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.dto.*;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.mapper.PostMapper;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.rmi.activation.ActivationGroupDesc;
import java.util.ArrayList;
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
    @PostMapping("/register/{member-id}/{attraction-id}")
    public ResponseEntity<DataResponseDto<SinglePostResponseDto>> registerPost(@PathVariable("member-id") @Positive long memberId,
                                                                               @PathVariable("attraction-id") @Positive long attractionId,
                                                                               @Valid @RequestBody PostRegisterDto postRegisterDto) {
        Post.PostBuilder postBuilder = Post.builder();

        Post post = postService.createPost(
                postBuilder
                        .postTitle(postRegisterDto.getPostTitle())
                        .postContent(postRegisterDto.getPostContent())
                        .hashTagContent(postRegisterDto.getHashTagContent())
                        .member(memberService.findVerifiedMemberById(memberId))
                        .attraction(attractionService.findAttraction(attractionId))
                        .comments(new ArrayList<>())
                        .build()
        );

        return new ResponseEntity<>(new DataResponseDto<>(mapper.postToSingleResponseDto(post)), HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{member-id}/{post-id}")
    public ResponseEntity<DataResponseDto<SinglePostResponseDto>> editPost(@PathVariable("member-id") @Positive long memberId,
                                                                           @PathVariable("post-id") @Positive long postId,
                                                                           @Valid @RequestBody PostPatchDto postPatchDto) {
        verifiedById(memberId, postId);

        postPatchDto.setPostId(memberId);
        Post updatePost = postService.updatePost(mapper.postPatchDtoToPost(postPatchDto));

        return ResponseEntity.ok(new DataResponseDto<>(mapper.postToSingleResponseDto(updatePost)));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<DataResponseDto<SinglePostResponseDto>> getPost(@PathVariable("post-id") @Positive long postId) {
        Post post = postService.findPost(postId);

        return ResponseEntity.ok(new DataResponseDto<>(mapper.postToSingleResponseDto(post)));
    }

    @GetMapping("/home")
    public ResponseEntity<MultiResponseDto> getHomePosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                         @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                         @RequestParam(defaultValue = "8", required = false) @Positive int size) {
        switch (sort) {
            case "newest":
                sort = "postId";
                break;
            case "likes":
                sort = "likes";
                break;
            case "views":
                sort = "views";
                break;
        }

        Page<Post> allPostsBySort = postService.findAllPostsBySort(page - 1, size, sort);
        List<Post> content = allPostsBySort.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostHomeResponseDtoList(content), allPostsBySort), HttpStatus.OK);

    }

    @GetMapping()
    public ResponseEntity<MultiResponseDto> getAllPosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                        @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                        @RequestParam(defaultValue = "9", required = false) @Positive int size) {
        switch (sort) {
            case "newest":
                sort = "postId";
                break;
            case "likes":
                sort = "likes";
                break;
            case "views":
                sort = "views";
                break;
        }
        Page<Post> postsByNewestByPage = postService.findAllPostsBySort(page - 1, size, sort);
        List<Post> postsByNewest = postsByNewestByPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostPageResponseDtoList(postsByNewest), postsByNewestByPage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{member-id}/{post-id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("member-id") long memberId,
                                                 @PathVariable("post-id") long postId) {

        Post post = verifiedById(memberId, postId);
        postService.erasePost(post);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private Post verifiedById(long memberId, long postId) {
        Post post = postService.findPostNoneSetView(postId);

        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHOR);
        }

        return post;
    }

}
