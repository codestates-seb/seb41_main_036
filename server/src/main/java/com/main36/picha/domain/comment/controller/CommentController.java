package com.main36.picha.domain.comment.controller;

import com.main36.picha.domain.comment.dto.CommentDto;
import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.comment.mapper.CommentMapper;
import com.main36.picha.domain.comment.service.CommentService;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.domain.post.service.PostService;
import com.main36.picha.global.authorization.jwt.JwtTokenizer;
import com.main36.picha.global.authorization.resolver.ClientId;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<DataResponseDto<?>> postComment(@ClientId Long clientId,
                                                          @PathVariable("post-id") @Positive long postId,
                                                          @RequestBody @Valid CommentDto.Post commentPostDto) {
        Comment.CommentBuilder commentBuilder = Comment.builder();

        Comment comment =
                commentService.createComment(
                        commentBuilder
                                .commentContent(commentPostDto.getCommentContent())
                                .member(memberService.findMemberByMemberId(clientId))
                                .post(postService.findPost(postId))
                                .build()
                );

        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(new DataResponseDto<>(commentResponseDto), HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{comment-id}")
    public ResponseEntity<DataResponseDto<?>> patchComment(@ClientId Long clientId,
                                                           @PathVariable("comment-id") @Positive long commentId,
                                                           @RequestBody @Valid CommentDto.Patch commentPatchDto) {
        Comment comment = commentService.verifyClientId(clientId, commentId);
        comment.setCommentContent(commentPatchDto.getCommentContent());

        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(comment);

        return ResponseEntity.ok(new DataResponseDto<>(commentResponseDto));
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity<DataResponseDto<?>> getComment(@PathVariable("comment-id") @Positive long commentId) {
        CommentResponseDto response =
                mapper.commentToCommentResponseDto(commentService.findComment(commentId));
        return ResponseEntity.ok(new DataResponseDto<>(response));
    }

    @GetMapping()
    public ResponseEntity<MultiResponseDto<?>> getComment(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                          @Positive @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Comment> commentPage = commentService.findComments(page - 1, size);
        List<Comment> comments = commentPage.getContent();

        List<CommentResponseDto> commentResponseDtos = mapper.commentsToCommentResponseDtos(comments);

        return ResponseEntity.ok(new MultiResponseDto<>(commentResponseDtos, commentPage));
    }

    @DeleteMapping("/delete/{comment-id}")
    public ResponseEntity<HttpStatus> deleteComment(@ClientId Long clientId,
                                                    @PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.verifyClientId(clientId, commentId);
        commentService.deleteComment(comment);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
