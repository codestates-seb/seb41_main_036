package com.main36.pikcha.domain.post.controller;


import com.amazonaws.AmazonServiceException;
import com.main36.pikcha.domain.attraction.dto.ProvinceFilterDto;
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
    private final HashTagService hashTagService;
    private final PostImageService postImageService;


    @PostMapping("/register/{attraction-id}/{member-id}")
    public ResponseEntity<DataResponseDto<?>> registerPost2(@PathVariable("attraction-id") @Positive long attractionId,
                                                           @PathVariable("member-id") @Positive long memberId,
                                                           PostDto.PostDtoFinal postDto) {
        Post post = new Post();

        // 포스트 제목 설정
        post.setPostTitle(postDto.getPostTitle());

        // 빈 리스트 생성
        List<HashTag> hashTagList = new ArrayList<>();
        List<String> postContentList = new ArrayList<>();
        List<PostImage> postImageList = new ArrayList<>();

        // 포스트 해시태그 생성 후 추가
        if(postDto.getPostHashTags() != null) {
            for(String hashtag: postDto.getPostHashTags()) {
                HashTag newHashTag = new HashTag();
                newHashTag.setHashTagContent(hashtag);
                hashTagList.add(hashTagService.createHashTag(newHashTag));
            }
        }
        // 포스트 캡션 추가
        if(postDto.getPostContents() != null) {
            for(String postContent: postDto.getPostContents()) {
                postContentList.add(postContent);
            }
        }
        // 포스트 이미지 s3에 저장 후 추가
        if(postDto.getPostImageFiles()!= null) {
            for(MultipartFile file : postDto.getPostImageFiles()) {
                try{
                    postImageList.add(postImageService.createPostImage(file));
                }catch(AmazonServiceException | IOException e) {
                    e.printStackTrace();
                }
            }
        }
        post.setHashTags(hashTagList);
        post.setPostContents(postContentList);
        post.setPostImages(postImageList);
        post.setAttraction(attractionService.findAttraction(attractionId));
        post.setMember(memberService.findMemberByMemberId(memberId));
        post.setComments(new ArrayList<>());

        Post createdPost = postService.createPost(post);

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
        // 로그인 여부에 따라 좋아요 하트 채워지는 여부 결정
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

    @PostMapping("/filter")
    public ResponseEntity<MultiResponseDto<?>> getFilteredPosts(@RequestParam(defaultValue = "newest", required = false) String sort,
                                                            @RequestParam(defaultValue = "1", required = false) @Positive int page,
                                                            @RequestParam(defaultValue = "9", required = false) @Positive int size,
                                                            @RequestBody ProvinceFilterDto filterDto) {
        sort = getString(sort);

        List<Post> posts;
        Page<Post> postPage;
        if(filterDto.getProvinces().size() == 0 ) {
            postPage = postService.findAllPostsBySort(page - 1, size, sort);
        }else{
            postPage = postService.findAllPostsByProvincesSort(filterDto.getProvinces(), page - 1, size, sort);
        }
        posts = postPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.postListToPostHomeResponseDtoList(posts), postPage), HttpStatus.OK);
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
        // CascadeType.REMOVE 라서 객체는 지울 필요 없고, s3에서 이미지만 지우면 된다
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
}
