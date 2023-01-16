package com.main36.picha.domain.comment.controller;


import com.main36.picha.domain.comment.dto.CommentDto;
import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.comment.mapper.CommentMapper;
import com.main36.picha.domain.comment.service.CommentService;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    private final JwtTokenizer jwtTokenizer;

    private final MemberService memberService;

    private final CommentService commentService;

    private final PostService postService;

    private final CommentMapper mapper;

    @PostMapping("/upload/{post-id}")
    public ResponseEntity postComment(HttpServletRequest request,
                                      @PathVariable("post-id")@Positive long postId,
                                      @RequestBody CommentDto postDto) {
        Comment comment = new Comment();
        // 멤버 넣기
        String userEmail = extractedUsername(request);
        System.out.println("userEmail is : "+ userEmail);
        comment.setMember(memberService.findMember(userEmail));

        // 글 넣기
        comment.setPost(postService.findPost(postId));

        // 댓글 내용 넣기
        comment.setCommentContent(postDto.getCommentContent());
        Comment createdComment = commentService.createComment(comment);
        return new ResponseEntity<>(new DataResponseDto<>(
                mapper.commentToCommentResponseDto(createdComment)), HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{comment-id}")
    public ResponseEntity patchComment(HttpServletRequest request,
                                       @PathVariable("comment-id")@Positive long commentId,
                                       @RequestBody CommentDto postDto){

        String userEmail = extractedUsername(request);
        Comment findComment = commentService.findComment(commentId);

        // 다른 회원의 댓글을 수정할 수 없음
        if(!findComment.getMember().getEmail().equals(userEmail)){
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHOR);
        }

        Comment comment = new Comment();
        comment.setCommentId(commentId);
        comment.setCommentContent(postDto.getCommentContent());
        Comment updatedComment = commentService.updateComment(comment);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.commentToCommentResponseDto(updatedComment)),HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id")@Positive long commentId){
        CommentResponseDto response =
                mapper.commentToCommentResponseDto(commentService.findComment(commentId));
        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComment(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                     @Positive @RequestParam(required = false, defaultValue = "10") int size){
        Page<Comment> commentPage = commentService.findComments(page-1, size);
        List<Comment> comments = commentPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.commentsToCommentResponseDtos(comments),commentPage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{comment-id}")
    public ResponseEntity deleteCommnet(@PathVariable("comment-id")@Positive long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private String extractedUsername(HttpServletRequest request) {
        String authorization = request.getHeader("authorization");
        String substring = authorization.substring(7);
        log.info("subString = {}", substring);
        String secretKey = jwtTokenizer.getSecretKey();
        Jws<Claims> claims = jwtTokenizer.getClaims(substring, jwtTokenizer.encodeBase64SecretKey(secretKey));

        return String.valueOf(claims.getBody().get("username"));
    }
}
