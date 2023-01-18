package com.main36.picha.domain.post.mapper;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.post.dto.*;
import com.main36.picha.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    // 포스트 등록
    default Post postRegisterDtoToPost(PostRegisterDto postRegisterDto, Member member, Attraction attraction) {
        if ( postRegisterDto == null && member == null && attraction == null ) {
            return null;
        }

        return Post.builder()
                .postContent(postRegisterDto.getPostContent())
                .postTitle(postRegisterDto.getPostTitle())
                .member(member)
                .attraction(attraction)
                .build();
    }

    // 포스트 수정
    Post postPatchDtoToPost(PostPatchRequestDto postPatchRequestDto);

    // 포스트 등록 및 수정 리스폰스
    @Mapping(target = "memberId", expression = "java(post.getMember().getMemberId())")
    @Mapping(target = "attractionAddress", expression = "java(post.getAttraction().getAttractionAddress())")
    @Mapping(target = "attractionName", expression = "java(post.getAttraction().getAttractionName())")
    PostRegisterResponseDto postToPostRegisterResponseDto(Post post);

    // 포스트 단일 조회 리스폰스
    default PostResponseDto postToPostResponseDto(Post post) {

        if (post == null) {
            return null;
        }

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .postTitle(post.getPostTitle())
                .postContent(post.getPostContent())
                .memberId(post.getMember().getMemberId())
                .username(post.getMember().getUsername())
                .picture(post.getMember().getPicture())
                .attractionId(post.getAttraction().getAttractionId())
                .attractionName(post.getAttraction().getAttractionName())
                .attractionAddress(post.getAttraction().getAttractionAddress())
                .views(post.getViews())
                .likes(post.getLikes())
                .comments(post.getComments().stream()
                        .map(comment -> {
                            return CommentResponseDto.builder()
                                    .commentId(comment.getCommentId())
                                    .memberId(comment.getMember().getMemberId())
                                    .username(comment.getMember().getUsername())
                                    .memberPicture(comment.getMember().getPicture())
                                    .commentContent(comment.getCommentContent())
                                    .createdAt(comment.getCreatedAt())
                                    .modifiedAt(comment.getModifiedAt())
                                    .build();
                        }).collect(Collectors.toList()))
                .createdAt(post.getCreatedAt())
                .build();

    }

    @Mapping(target = "memberId", expression = "java(post.getMember().getMemberId())")
    @Mapping(target = "username", expression = "java(post.getMember().getUsername())")
    @Mapping(target = "userImage", expression = "java(post.getMember().getPicture())")
    PostHomeDto postToPostHomeDto(Post post);

    // 포스트 페이지(전체 조회) 리스폰스
    default List<PostPageResponseDto> postListToPostPageResponseDtoList(List<Post> postList) {

        if (postList == null) {
            return null;
        }

        return postList.stream()
                .map(post -> {
                    return PostPageResponseDto.builder()
                            .postId(post.getPostId())
                            .postTitle(post.getPostTitle())
                            .attractionId(post.getAttraction().getAttractionId())
                            .attractionAddress(post.getAttraction().getAttractionAddress())
                            .content(post.getPostContent())
                            .views(post.getViews())
                            .likes(post.getLikes())
                            .username(post.getMember().getUsername())
                            .picture(post.getMember().getPicture())
                            .comments(post.getComments().stream()
                                    .map(comment -> {
                                        return CommentResponseDto.builder()
                                                .commentId(comment.getCommentId())
                                                .memberId(comment.getMember().getMemberId())
                                                .username(comment.getMember().getUsername())
                                                .memberPicture(comment.getMember().getPicture())
                                                .commentContent(comment.getCommentContent())
                                                .createdAt(comment.getCreatedAt())
                                                .modifiedAt(comment.getModifiedAt())
                                                .build();
                                    }).collect(Collectors.toList()))
                            .createdAt(post.getCreatedAt())
                            .build();
                }).collect(Collectors.toList());
    }
}
