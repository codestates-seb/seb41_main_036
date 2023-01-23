package com.main36.pikcha.domain.post.controller;


import com.amazonaws.AmazonServiceException;
import com.main36.pikcha.domain.attraction.service.AttractionService;

import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.hashtag.service.HashTagService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.domain.post.dto.*;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post.mapper.PostMapper;
import com.main36.pikcha.domain.post.service.PostService;


import com.main36.pikcha.domain.post_image.entity.PostImage;
import com.main36.pikcha.domain.post_image.service.PostImageService;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    private final HashTagService hashTagService;
    private final PostImageService postImageService;


    @PostMapping("/register/{attraction-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> registerPost2(@PathVariable("attraction-id") @Positive long attractionId,
                                                           @PathVariable("member-id") @Positive long memberId,
                                                           PostDto.PostDtoFinal postDto) {
        Post post = new Post();
        String oFileName = "";
        log.info("title = {}", postDto.getPostTitle());

        // 포스트 제목 설정
        post.setPostTitle(postDto.getPostTitle());

        // 빈 리스트 생성
        List<HashTag> hashTagList = new ArrayList<>();
        List<String> postContentList = new ArrayList<>();
        List<PostImage> postImageList = new ArrayList<>();

        // 포스트 해시태그 생성 후 추가
        if(postDto.getPostHashTags() != null) {
            for(String hashtag: postDto.getPostHashTags()) {
                log.info("hashtag = {}", hashtag);
                HashTag newHashTag = new HashTag();
                newHashTag.setHashTagContent(hashtag);
                hashTagList.add(hashTagService.createHashTag(newHashTag));
            }
        }
        // 포스트 캡션 추가
        if(postDto.getPostContents() != null) {
            for(String postContent: postDto.getPostContents()) {
                log.info("postContent = {}", postContent);
                postContentList.add(postContent);
            }
        }
        // 포스트 이미지 s3에 저장 후 추가
        if(postDto.getPostImageFiles()!= null) {
            for(MultipartFile file : postDto.getPostImageFiles()) {
                oFileName = file.getOriginalFilename();
                log.info("imageFileName = {}", oFileName);
                try{
                    postImageList.add(postImageService.createPostImage(file));
                }catch(AmazonServiceException | IOException e) {
                    e.printStackTrace();
                }
            }
        }
        for(String content: postContentList){
            log.info("content is = {}", content);
        }
        for(HashTag hashTag : hashTagList){
            log.info("hashTag is = {}", hashTag.getHashTagContent());
        }
        for(PostImage postImage : postImageList){
            log.info("post Image file name is = {}", postImage.getPostImageFileName());
        }
        post.setHashTags(hashTagList);
        post.setPostContents(postContentList);
        post.setPostImages(postImageList);
        post.setAttraction(attractionService.findAttraction(attractionId));
        post.setMember(memberService.findMemberByMemberId(memberId));
        post.setComments(new ArrayList<>());

        Post createdPost = postService.createPost(post);
        for(String content: createdPost.getPostContents()){
            log.info("after save content is = {}", content);
        }
        for(HashTag hashTag : createdPost.getHashTags()){
            log.info("after save hashTag id is = {}", hashTag.getHashTagId());
            log.info("after save hashTag content is = {}", hashTag.getHashTagContent());
        }
        for(PostImage postImage : createdPost.getPostImages()){
            log.info("after save post Image file id is = {}", postImage.getPostImageId());
            log.info("after save post Image file name is = {}", postImage.getPostImageFileName());
        }
        // response 생성
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(createdPost);
        // 좋아요 누른 여부를 false로 반환(처음 생성해서 false)
        response.setIsVoted(false);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);

    }


    @PatchMapping("/edit/{post-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> editPost(@PathVariable("post-id") @Positive long postId,
                                                       @PathVariable("member-id") @Positive long memberId,
                                                       PostDto.PostDtoFinal postPatchDto) {
        Post findPost = postService.findPostNoneSetView(postId);

        // 수정할 포스트 캡션, 해시태그, 이미지 전체 삭제
        findPost.getPostContents().clear();
        findPost.getPostImages().clear();
        postImageService.deletePostImages(findPost.getPostImages());
        findPost.getHashTags().clear();
        hashTagService.deleteHashTags(findPost.getHashTags());

        // 포스트 제목 설정
        findPost.setPostTitle(postPatchDto.getPostTitle());

        // 해시태그 데이터 생성 후 추가
        if(postPatchDto.getPostHashTags() != null) {
            for(String hashtag: postPatchDto.getPostHashTags()) {
                HashTag newHashTag = new HashTag();
                newHashTag.setHashTagContent(hashtag);
                HashTag created = hashTagService.createHashTag(newHashTag);
                findPost.getHashTags().add(created);
            }
        }
        // 캡션 추가
        if(postPatchDto.getPostContents() != null) {
            for(String postContent: postPatchDto.getPostContents()) {
                findPost.getPostContents().add(postContent);
            }
        }
        // 이미지 추가
        if(postPatchDto.getPostImageFiles()!= null) {
            for(MultipartFile file : postPatchDto.getPostImageFiles()) {
                try{
                    PostImage postImage = postImageService.createPostImage(file);
                    findPost.getPostImages().add(postImage);
                }catch(AmazonServiceException | IOException e) {
                    e.printStackTrace();
                }
            }
        }
        Post createdPost = postService.updatePost(findPost);
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(createdPost);
        response.setIsVoted(postService.isVoted(memberId, postId));
        return ResponseEntity.ok(new DataResponseDto<>(response));

    }

    @GetMapping(value = {"/{post-id}", "/{post-id}/{member-id}"})
    public ResponseEntity<DataResponseDto<?>> getPost(@PathVariable("post-id") @Positive long postId,
                                                      @PathVariable("member-id") Optional<Long> memberId) {
        Post post = postService.findPost(postId);
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(post);
        log.info("post attraction id = {}", post.getAttraction().getAttractionId());
        log.info("post member id = {}", post.getMember().getMemberId());
        for(String content: post.getPostContents()){
            log.info("content is = {}", content);
        }
        for(HashTag hashTag : post.getHashTags()){
            log.info("hashTag is = {}", hashTag.getHashTagContent());
        }
        for(PostImage postImage : post.getPostImages()){
            log.info("post Image file name is = {}", postImage.getPostImageFileName());
        }
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

    @GetMapping("/details/{attraction-id}")
    public ResponseEntity<MultiResponseDto<?>> getPostsByAttractionDetailsPage(@PathVariable("attraction-id") long attractionId,
                                                                          @RequestParam(defaultValue = "newest", required = false) String sort,
                                                            @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                            @RequestParam(defaultValue = "8", required = false) @Positive int size) {
        sort = getString(sort);
        Page<Post> allPostsBySort = postService.findAllPostsByAttractionId(attractionId,page - 1, size, sort);
        List<Post> content = allPostsBySort.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostHomeResponseDtoList(content), allPostsBySort), HttpStatus.OK);

    }

    /*@GetMapping()
    public ResponseEntity<MultiResponseDto<?>> getAllPosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                           @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                           @RequestParam(defaultValue = "9", required = false) @Positive int size) {
        sort = getString(sort);
        Page<Post> postsByNewestByPage = postService.findAllPostsBySort(page - 1, size, sort);
        List<Post> postsByNewest = postsByNewestByPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostPageResponseDtoList(postsByNewest), postsByNewestByPage), HttpStatus.OK);
    }*/

    @DeleteMapping("/delete/{post-id}/{member-id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("post-id") long postId,
                                                 @PathVariable("member-id") @Positive long memberId) {
        String dirName = "images";
        Post post = postService.verifyClientId(memberId, postId);
        // 포스트 이미지, 해시태그 삭제
        postImageService.deleteOnlyS3Images(post.getPostImages());

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

    @PostMapping("/test")
    public ResponseEntity test(PostDto.PostDtoFinal postDto) {
        String dirName = "images";

        log.info("title = {}", postDto.getPostTitle());
        if(postDto.getPostHashTags() != null) {
            for(String hashtag: postDto.getPostHashTags()) {
                log.info("hashtag = {}", hashtag);
            }
        }
        if(postDto.getPostContents() != null) {
            for(String postContent: postDto.getPostContents()) {
                log.info("postContent = {}", postContent);
            }
        }
        if(postDto.getPostImageFiles()!= null) {
            for(MultipartFile file : postDto.getPostImageFiles()) {
                log.info("imageFileName = {}", file.getOriginalFilename());
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/test2")
    public ResponseEntity test2(HttpServletRequest request) {
        Set<String> keySet = request.getParameterMap().keySet();
        for(String key: keySet) {
            log.info(key + ": " + request.getParameter(key));
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
