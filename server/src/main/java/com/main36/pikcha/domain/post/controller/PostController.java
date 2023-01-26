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


import com.main36.pikcha.domain.image.entity.PostImage;
import com.main36.pikcha.domain.image.service.PostImageService;
import com.main36.pikcha.global.aop.LoginUser;


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
import javax.validation.constraints.Positive;

import java.io.IOException;
import java.util.*;

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


    @LoginUser
    @PostMapping("/register/{attraction-id}")
    public ResponseEntity<DataResponseDto<?>> registerPost2(Member loginUser,
                                                            @PathVariable("attraction-id") @Positive long attractionId,
                                                           PostDto.Post postDto) {
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
        post.setMember(loginUser);
        post.setComments(new ArrayList<>());

        Post createdPost = postService.createPost(post);

        // response 생성
        PostResponseDto.Detail response = mapper.postToPostDetailResponseDto(createdPost);
        // 좋아요 누른 여부를 false로 반환(처음 생성해서 false)
        response.setIsVoted(false);
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.CREATED);
    }

    @LoginUser
    @PatchMapping("/edit/{post-id}")
    public ResponseEntity patchPosts(PostDto.Patch patchDto,
                                     Member loginUser,
                                     @PathVariable("post-id") @Positive Long postId){
        Post findPost = verifiedById(loginUser.getMemberId(), postId);

        // 1. 포스트 제목 변경점 수정 (완료)
        if(patchDto.getPostTitle() != null){
            if(!patchDto.getPostTitle().equals(findPost.getPostTitle())){
                // 받은 제목이 원래 제목과 다르다면 수정
                findPost.setPostTitle(patchDto.getPostTitle());
            }
        }

        // 2. 해시태그 변경점 수정
        if(patchDto.getPostHashTags() != null) {
            // 원래 있던 해시태그 중에
            List<HashTag> removed = new ArrayList<>();
            for(HashTag hashTag : findPost.getHashTags()){
                // patchDto에 이 해시태그가 없다면
                if(!patchDto.getPostHashTags().contains(hashTag.getHashTagContent())){
                    // 해시태그 삭제
                    removed.add(hashTag);
                }
            }
            findPost.getHashTags().removeAll(removed);
//            hashTagService.deleteHashTags(removed, findPost.getPostId());
            // patchDto에서
            for(String hashTag : patchDto.getPostHashTags()){
                // 새로운 해시태그가 있다면
                if(hashTagService.findHashTag(hashTag).isEmpty()) {
                    // 해시태그 생성
                    HashTag newTag = new HashTag();
                    newTag.setHashTagContent(hashTag);
                    // post에 추가
                    findPost.getHashTags().add(hashTagService.createHashTag(newTag));
                    // ★ 업데이트를 날려야 하나? ★
                }
            }
        }

        // 3. 포스트 캡션 수정
        if(patchDto.getPostContents() != null) {
            // 원래 있던 캡션 중에
            List<String> removed = new ArrayList<>();
            for(String content : findPost.getPostContents()){
                // patchDto에 이 캡션이 없다면
                if(!patchDto.getPostContents().contains(content)){
                    // content 삭제
                    removed.add(content);
                }
            }
            findPost.getPostContents().removeAll(removed);
            // patchDto에서
            for(String content : patchDto.getPostContents()){
                // 새로운 content가 있다면
                if(!findPost.getPostContents().contains(content)){
                    // content 추가
                    findPost.getPostContents().add(content);
                }
            }
        }

        // 4. 포스트 이미지 수정 (완료)
        if(patchDto.getDeleteUrls() != null) {
            // deleteUrls 에 있는 주소로 s3와 데이터베이스에서 삭제
            postImageService.deletePostImagesByUrls(patchDto.getDeleteUrls());
        }

        // 5. 포스트 이미지 새로 등록 (완료)
        if(patchDto.getPostImageFiles()!= null) {
            for(MultipartFile file : patchDto.getPostImageFiles()) {
                try{
                    findPost.getPostImages().add(postImageService.createPostImage(file));
                }catch(AmazonServiceException | IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // 6. 포스트 업데이트 (완료)
        postService.updatePost(findPost);

        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping(value = {"/details/{post-id}", "/details/{post-id}/{member-id}"})
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

    @GetMapping("/{attraction-id}")
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

    @LoginUser
    @DeleteMapping("/delete/{post-id}")
    public ResponseEntity<HttpStatus> deletePost(Member loginUser,
                                                 @PathVariable("post-id") long postId) {
        String dirName = "images";
        Post post = postService.verifyClientId(loginUser.getMemberId(), postId);
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
    @LoginUser
    @PostMapping("/likes/{post-id}")
    public ResponseEntity<DataResponseDto<?>> votePost(Member loginUser,
                                                       @PathVariable("post-id") @Positive long postId) {
        // 회원 정보를 받아온다
        Member member = memberService.findMemberByMemberId(loginUser.getMemberId());

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
