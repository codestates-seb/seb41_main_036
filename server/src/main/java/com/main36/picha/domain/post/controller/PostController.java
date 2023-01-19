package com.main36.picha.domain.post.controller;


import com.main36.picha.domain.attraction.service.AttractionService;

import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.dto.*;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.mapper.PostMapper;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.authorization.resolver.ClientId;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
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
    public ResponseEntity<DataResponseDto<?>> registerPost(@PathVariable("member-id") @Positive long memberId,
//            @ClientId Long clientId,
                                                           @PathVariable("attraction-id") @Positive long attractionId,
                                                           @Valid @RequestBody PostDto.Post postRegisterDto) {
        Post.PostBuilder postBuilder = Post.builder();

        Post post = postService.createPost(
                postBuilder
                        .postTitle(postRegisterDto.getPostTitle())
                        .postContent(postRegisterDto.getPostContent())
                        .hashTagContent(postRegisterDto.getHashTagContent())
                        .member(memberService.findMemberByMemberId(memberId))
                        .attraction(attractionService.findAttraction(attractionId))
                        .comments(new ArrayList<>())
                        .build()
        );

        // response 생성
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(post);
        // 좋아요 누른 여부를 false로 반환(처음 생성해서 false)
        response.setIsVoted(false);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);

    }

    @PatchMapping("/edit/{post-id}")
    public ResponseEntity<DataResponseDto<?>> editPost(@ClientId Long clientId,
                                                       @PathVariable("post-id") @Positive long postId,
                                                       @Valid @RequestBody PostDto.Patch postPatchDto) {
        postService.verifyClientId(clientId, postId);
        postPatchDto.setPostId(postId);
        Post updatePost = postService.updatePost(mapper.postPatchDtoToPost(postPatchDto));


        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(updatePost);
        response.setIsVoted(postService.isVoted(clientId, postId));

        return ResponseEntity.ok(new DataResponseDto<>(response));

    }

    @GetMapping("/{post-id}")
    public ResponseEntity<DataResponseDto<?>> getPost(@ClientId Long clientId,
                                                      @PathVariable("post-id") @Positive long postId) {
        Post post = postService.findPost(postId);
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(post);
        if(clientId == null){
            response.setIsVoted(false);
        }
        else response.setIsVoted(postService.isVoted(clientId, postId));


        return ResponseEntity.ok(new DataResponseDto<>(response));
    }

    @GetMapping("/home")
    public ResponseEntity<MultiResponseDto<?>> getHomePosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                            @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                            @RequestParam(defaultValue = "8", required = false) @Positive int size) {
        sort = getString(sort);
        Page<Post> allPostsBySort = postService.findAllPostsBySort(page - 1, size, sort);
        List<Post> content = allPostsBySort.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostHomeResponseDtoList(content), allPostsBySort), HttpStatus.OK);

    }

    @GetMapping()
    public ResponseEntity<MultiResponseDto<?>> getAllPosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                           @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                           @RequestParam(defaultValue = "9", required = false) @Positive int size) {
        sort = getString(sort);
        Page<Post> postsByNewestByPage = postService.findAllPostsBySort(page - 1, size, sort);
        List<Post> postsByNewest = postsByNewestByPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostPageResponseDtoList(postsByNewest), postsByNewestByPage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{post-id}")
    public ResponseEntity<HttpStatus> deletePost(@ClientId Long clientId,
                                                 @PathVariable("post-id") long postId) {
        Post post = postService.verifyClientId(clientId, postId);
        postService.erasePost(post);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private static String getString(String sort) {
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
        return sort;
    }

    // 포스트 좋아요!
    @PostMapping("/likes/{post-id}")
    public ResponseEntity<DataResponseDto<?>> votePost(@ClientId Long clientId,
                                   @PathVariable("post-id") @Positive long postId){
        // 회원 정보를 받아온다
        Member member  = memberService.findMemberByMemberId(clientId);

        // 포스트 정보를 찾는다
        Post post = postService.findPostNoneSetView(postId);

        // 회원과 포스트 정보를 바탕으로 좋아요가 눌러져 있다면 true, 아니면 false를 받는다.
        boolean status = postService.votePost(member, post);

        // responseDto 생성
        PostLikesResponseDto response = new PostLikesResponseDto();
        response.setIsVoted(status);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }
    private Post verifiedById(long memberId, long postId) {
        Post post = postService.findPostNoneSetView(postId);

        if (!post.getMember().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.CLIENT_IS_NOT_EQUAL);
        }

        return post;
    }
}
