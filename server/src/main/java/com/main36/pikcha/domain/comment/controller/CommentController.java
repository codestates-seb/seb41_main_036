package com.main36.pikcha.domain.comment.controller;

import com.main36.pikcha.domain.comment.dto.CommentDetailResponseDto;
import com.main36.pikcha.domain.comment.dto.CommentDto;
import com.main36.pikcha.domain.comment.dto.CommentResponseDto;
import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.comment.mapper.CommentMapper;
import com.main36.pikcha.domain.comment.service.CommentService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post.service.PostService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    private final CommentService commentService;
    private final PostService postService;
    private final CommentMapper mapper;

    @LoginUser
    @PostMapping("/upload/{post-id}")
    public ResponseEntity<DataResponseDto<?>> postComment(Member loginUser,
                                                          @PathVariable("post-id") @Positive long postId,
                                                          @RequestBody @Valid CommentDto.Post commentPostDto) {
        Comment.CommentBuilder commentBuilder = Comment.builder();

        Comment comment =
                commentService.createComment(
                        commentBuilder
                                .commentContent(commentPostDto.getCommentContent())
                                .member(loginUser)
                                .post(postService.findPostNoneSetView(postId))
                                .status(Comment.CommentStatus.Alive)
                                .build()
                ,commentPostDto.getParentId());

        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(comment);

        return new ResponseEntity<>(new DataResponseDto<>(commentResponseDto), HttpStatus.CREATED);
    }

    @LoginUser
    @PatchMapping("/edit/{comment-id}")
    public ResponseEntity<DataResponseDto<?>> patchComment(Member loginUser,
                                                           @PathVariable("comment-id") @Positive long commentId,
                                                           @RequestBody @Valid CommentDto.Patch commentPatchDto) {
        Comment comment = commentService.verifyClientId(loginUser.getMemberId(), commentId);
        comment.setCommentContent(commentPatchDto.getCommentContent());
        commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(comment);

        return ResponseEntity.ok(new DataResponseDto<>(commentResponseDto));
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity<DataResponseDto<?>> getComment(@PathVariable("comment-id") @Positive long commentId) {
        CommentResponseDto response =
                mapper.commentToCommentResponseDto(commentService.findComment(commentId));
        return ResponseEntity.ok(new DataResponseDto<>(response));
    }

    @GetMapping("/listof/{post-id}")
    public ResponseEntity<DataResponseDto<?>> getComment(@PathVariable("post-id") @Positive long postId,
                                                          @Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                          @Positive @RequestParam(required = false, defaultValue = "10") int size) {
        Post findPost = postService.findPostNoneSetView(postId);
//        Page<Comment> commentPage = commentService.findComments(page - 1, size, findPost);
//        List<Comment> commentList = commentPage.getContent();
        List<Comment> commentList = commentService.findComments(findPost);
        List<CommentDetailResponseDto> result = new ArrayList<>();
        Map<Long, CommentDetailResponseDto> map = new HashMap<>();

        commentList.stream().forEach(c-> {
            CommentDetailResponseDto rDto = CommentDetailResponseDto.convertCommentToDto(c);
            // map <댓글Id, responseDto>
            map.put(c.getCommentId(), rDto);
            // 댓글이 부모가 있다면
            if(c.getParent() != null) {
                // 부모 댓글의 id의 responseDto를 조회한다음
                map.get(c.getParent().getCommentId())
                        // 부모 댓글 responseDto의 자식으로
                        .getChildren()
                        // rDto를 추가한다.
                        .add(rDto);
            }
            // 댓글이 최상위 댓글이라면
            else{
                // 그냥 result에 추가한다.
                result.add(rDto);
            }
        });

//        return ResponseEntity.ok(new MultiResponseDto<>(result, commentPage));
        return ResponseEntity.ok(new DataResponseDto<>(result));
    }

    @LoginUser
    @DeleteMapping("/delete/{comment-id}")
    public ResponseEntity<HttpStatus> deleteComment(Member loginUser,
                                                    @PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.verifyClientId(loginUser.getMemberId(), commentId);
        commentService.deleteComment(comment);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
