package com.main36.picha.domain.post.controller;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.dto.PostDto;
import com.main36.picha.domain.post.dto.PostRegisterDto;
import com.main36.picha.domain.post.dto.PostResponseDto;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.mapper.PostMapper;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.auth.userdetails.MemberDetailsService;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.support.SecurityContextProvider;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;
    private final PostMapper mapper;

    private final MemberService memberService;

    private final AttractionService attractionService;

    private final JwtTokenizer jwtTokenizer;

    // 로그인 객체 찾기
    @PostMapping("/register/{attraction-id}")
    public ResponseEntity registerPost(HttpServletRequest request,
                                       @PathVariable("attraction-id") long attractionId,
                                       @Valid @RequestBody PostDto postDto) {
        String username = extractedUsername(request);
        Member member = memberService.findMember(username);
        Attraction attraction = attractionService.findAttraction(attractionId);
        Post post = mapper.postDtoToPost(postDto);
        post.setMember(member);
        post.setAttraction(attraction);
        Post createPost = postService.createPost(post);
        PostRegisterDto postResponseDto = mapper.postToPostRegisterDto(createPost);

        return new ResponseEntity(new DataResponseDto<>(postResponseDto), HttpStatus.CREATED);
    }

    private String extractedUsername(HttpServletRequest request) {
        String authorization = request.getHeader("authorization");
        String substring = authorization.substring(7);
        String secretKey = jwtTokenizer.getSecretKey();
        Jws<Claims> claims = jwtTokenizer.getClaims(substring, jwtTokenizer.encodeBase64SecretKey(secretKey));
        String username = String.valueOf(claims.getBody().get("username"));

        return username;
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
