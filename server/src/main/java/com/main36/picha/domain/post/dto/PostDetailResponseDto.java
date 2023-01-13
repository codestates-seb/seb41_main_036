package com.main36.picha.domain.post.dto;

import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostDetailResponseDto {

    private String postTitle;

    private String attractionAddress;

//    private List<HashTag> hashTagList;

//    private String imageUrl;

//    private String content;
    private int views;
    private int likes;
    private Long memberId;
    private String username;
    private String picture;
    private List<CommentResponseDto> commentResponseDtos;

}
