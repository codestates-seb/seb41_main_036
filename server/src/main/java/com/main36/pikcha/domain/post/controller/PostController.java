package com.main36.pikcha.domain.post.controller;


import com.main36.pikcha.domain.attraction.service.AttractionService;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.domain.post.dto.*;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post.mapper.PostMapper;
import com.main36.pikcha.domain.post.service.PostService;


import com.main36.pikcha.global.config.S3Service;


import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private final S3Service s3Service;

    @PostMapping("/register/{attraction-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> registerPost(@PathVariable("attraction-id") @Positive long attractionId,
                                                           @PathVariable("member-id") @Positive long memberId,
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

    @PatchMapping("/edit/{post-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> editPost(@PathVariable("post-id") @Positive long postId,
                                                       @PathVariable("member-id") @Positive long memberId,
                                                       @Valid @RequestBody PostDto.Patch postPatchDto) {
        postService.verifyClientId(memberId, postId);
        postPatchDto.setPostId(postId);
        Post updatePost = postService.updatePost(mapper.postPatchDtoToPost(postPatchDto));


        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(updatePost);
        response.setIsVoted(postService.isVoted(memberId, postId));

        return ResponseEntity.ok(new DataResponseDto<>(response));

    }

    @GetMapping(value = {"/{post-id}", "/{post-id}/{member-id}"})
    public ResponseEntity<DataResponseDto<?>> getPost(@PathVariable("post-id") @Positive long postId,
                                                      @PathVariable("member-id") Optional<Long> memberId) {
        Post post = postService.findPost(postId);
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(post);
        if (memberId.isEmpty()) {
            response.setIsVoted(false);
        } else response.setIsVoted(postService.isVoted(memberId.get(), postId));


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

    @DeleteMapping("/delete/{post-id}/{member-id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("post-id") long postId,
                                                 @PathVariable("member-id") @Positive long memberId) {
        Post post = postService.verifyClientId(memberId, postId);
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
    @PostMapping("/likes/{post-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> votePost(@PathVariable("post-id") @Positive long postId,
                                                       @PathVariable("member-id") @Positive long memberId) {
        // 회원 정보를 받아온다
        Member member = memberService.findMemberByMemberId(memberId);

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
            throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_EQUAL);
        }

        return post;

    }
    @PostMapping("/imagetest1")
    public ResponseEntity imageTest(PostDto.ImageTest imageDto) throws IOException {
        String dirName = "images";

        String imageUrl = s3Service.upload(imageDto.getImage(), dirName, imageDto.getImage().getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/imagetest2")
    public ResponseEntity imageTest2(@RequestBody PostDto.ImageTest imageDto) throws IOException {
        String dirName = "images";

        String imageUrl = s3Service.upload(imageDto.getImage(), dirName, imageDto.getImage().getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }


    @PostMapping("/imagetest3")
    public ResponseEntity imageTest3(@RequestPart(value = "image") MultipartFile file) throws IOException {
        String dirName = "images";

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/imagestest4")
    public ResponseEntity imageTest(@RequestParam("imageFile") MultipartFile file) throws IOException {
        String dirName = "images";

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/imagetest5")
    public ResponseEntity imageTest5(PostDto.ImageTest2 imageDto) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(imageDto.getImage(), dirName, imageDto.getImage().getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/imagetest6")
    public ResponseEntity imageTest6(@RequestPart(value = "dto") PostDto.ImageTest4 imageDto,
                                     @RequestParam(value = "imageFile") MultipartFile file) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    //가능
    @PostMapping("/imagetest7")
    public ResponseEntity imageTest7(@RequestPart(value = "dto") PostDto.ImageTest4 imageDto,
                                     @RequestPart(value = "imageFile") MultipartFile file) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    //불가능
    @PostMapping("/imagetest8")
    public ResponseEntity imageTest8(@RequestPart PostDto.ImageTest4 imageDto,
                                     @RequestParam("imageFile") MultipartFile file) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    // 가능
    @PostMapping("/imagetest9")
    public ResponseEntity imageTest9(@RequestPart(value = "dto") PostDto.ImageTest4 imageDto,
                                     @RequestParam(value = "imageFile") MultipartFile file) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    // 가능
    @PostMapping("/imagetest10")
    public ResponseEntity imageTest10(@RequestPart("dto") PostDto.ImageTest4 imageDto,
                                      @RequestParam("imageFile") MultipartFile file) throws IOException {
        String dirName = "images";
        log.info("title = {}", imageDto.getPostTitle());
        log.info("content = {}", imageDto.getPostContent());

        String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
        PostResponseDto.ImageResponse response = new PostResponseDto.ImageResponse();
        response.setImageS3Url(imageUrl);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/imagetest11")
    public ResponseEntity imageTest11(PostDto.ImageTest6 imageDto) throws IOException {
        String dirName = "images";
        List<String> urls = new ArrayList<>();
        List<MultipartFile> files = imageDto.getImages();
        for (MultipartFile file : files) {
            String imageUrl = s3Service.upload(file, dirName, file.getOriginalFilename());
            urls.add(imageUrl);
        }

        return new ResponseEntity<>(urls, HttpStatus.CREATED);
    }

    @PostMapping("/imagetest12")
    public ResponseEntity imageTest12(@RequestParam("dto") List<PostDto.ImageTest3> imageDtos) throws IOException {
        String dirName = "images";
        List<String> urls = new ArrayList<>();
        for (PostDto.ImageTest3 imageDto : imageDtos) {
            MultipartFile image = imageDto.getImage();
            String imageUrl = s3Service.upload(image, dirName, image.getOriginalFilename());
            urls.add(imageUrl);
        }
        return new ResponseEntity<>(urls, HttpStatus.CREATED);
    }

    @PostMapping("/imagetest13")
    public ResponseEntity imageTest13(@RequestPart("dto") List<PostDto.ImageTest3> imageDtos) throws IOException {
        String dirName = "images";
        List<String> urls = new ArrayList<>();
        for (PostDto.ImageTest3 imageDto : imageDtos) {
            MultipartFile image = imageDto.getImage();
            String imageUrl = s3Service.upload(image, dirName, image.getOriginalFilename());
            urls.add(imageUrl);
        }
        return new ResponseEntity<>(urls, HttpStatus.CREATED);
    }

    @PostMapping("/imagetest14")
    public ResponseEntity imageTest14(@RequestParam List<PostDto.ImageTest3> imageDtos) throws IOException {
        String dirName = "images";
        List<String> urls = new ArrayList<>();
        for (PostDto.ImageTest3 imageDto : imageDtos) {
            MultipartFile image = imageDto.getImage();
            String imageUrl = s3Service.upload(image, dirName, image.getOriginalFilename());
            urls.add(imageUrl);
        }
        return new ResponseEntity<>(urls, HttpStatus.CREATED);
    }

    @PostMapping("/imagetest15")
    public ResponseEntity imageTest15(List<PostDto.ImageTest3> imageDtos) throws IOException {
        String dirName = "images";
        List<String> urls = new ArrayList<>();
        for (PostDto.ImageTest3 imageDto : imageDtos) {
            MultipartFile image = imageDto.getImage();
            String imageUrl = s3Service.upload(image, dirName, image.getOriginalFilename());
            urls.add(imageUrl);
        }
        return new ResponseEntity<>(urls, HttpStatus.CREATED);
    }
}
