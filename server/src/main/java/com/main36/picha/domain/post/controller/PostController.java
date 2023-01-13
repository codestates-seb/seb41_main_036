package com.main36.picha.domain.post.controller;


import com.main36.picha.domain.post.dto.PostDto;
import com.main36.picha.domain.post.dto.PostResponseDto;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.mapper.PostMapper;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.support.SecurityContextProvider;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper mapper;

    // 로그인 객체 찾기
    @PostMapping("/register")
    public ResponseEntity registerPost(Principal principal,
                                       @Valid @RequestBody PostDto postDto) {
        System.out.println(principal.getName());
        Post post = mapper.postDtoToPost(postDto);
        Post createPost = postService.createPost(post);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(createPost);

        return new ResponseEntity(new DataResponseDto<>(postResponseDto), HttpStatus.CREATED);
    }

//    @PatchMapping

    // 한개 포스트 조회
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@Positive @PathVariable("post-id") long postId) {
        Post post = postService.findPost(postId);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(post);

        return new ResponseEntity(new DataResponseDto<>(postResponseDto), HttpStatus.CREATED);


    }

    // 포스트 메인 화면
    //사용자 id , likes, views, title, image, 만든시간 및 수정시간
    @GetMapping()
    public ResponseEntity getPosts(@RequestParam(defaultValue = "newest", required = false) String tab,
                                   @RequestParam(defaultValue = "1", required = false) int page,
                                   @RequestParam(defaultValue = "9", required = false) int size) {

        Page<Post> postsByNewestByPage = postService.findAllPostsByNewest(page - 1, size);
        List<Post> postsByNewest = postsByNewestByPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.postToPostDetailDto(postsByNewest), postsByNewestByPage), HttpStatus.OK);

    }

}
