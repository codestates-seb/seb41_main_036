package com.main36.picha.domain.post.mapper;


import com.main36.picha.domain.comment.dto.CommentResponseDto;
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

    @Mapping(target = "views", constant = "0")
    @Mapping(target = "likes", constant = "0")
    Post postDtoToPost(PostDto postDto);

    @Mapping(target= "memberId", expression = "java(post.getMember().getMemberId())")
    @Mapping(target= "attractionAddress", expression = "java(post.getAttraction().getAttractionAddress())")
    @Mapping(target= "attractionName", expression = "java(post.getAttraction().getAttractionName())")
    PostRegisterDto postToPostRegisterDto(Post post);
    default PostResponseDto postToPostResponseDto(Post post){
        if(post == null) {
            return null;
        }
        return PostResponseDto.builder()
                .memberId(post.getMember().getMemberId())
                .postId(post.getPostId())
                .attractionName(post.getAttraction().getAttractionName())
                .postTitle(post.getPostTitle())
                .attractionAddress(post.getAttraction().getAttractionAddress())
                .postContent(post.getPostContent())
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
    };

    @Mapping(target = "memberId", expression = "java(post.getMember().getMemberId())")
    @Mapping(target = "username", expression = "java(post.getMember().getUsername())")
    @Mapping(target = "userImage", expression = "java(post.getMember().getPicture())")
    PostHomeDto postToPostHomeDto(Post post);
    default List<PostDetailResponseDto> postToPostDetailDto(List<Post> postList) {

        if (postList == null) {
            return null;
        }

        return postList.stream()
                .map(post -> {
                    return PostDetailResponseDto.builder()
                            .postTitle(post.getPostTitle())
                            .attractionAddress(post.getAttraction().getAttractionAddress())
                            .imageUrl(post.getPostImageUrl())
                            .content(post.getPostContent())
                            .views(post.getViews())
                            .likes(post.getLikes())
                            .username(post.getMember().getUsername())
                            .picture(post.getMember().getPicture())
                            .comments(post.getComments().stream()
                                    .map(comment -> {
                                        return CommentResponseDto.builder()
                                                .memberId(comment.getMember().getMemberId())
                                                .username(comment.getMember().getUsername())
//                                                .commentId(comment.getCommentId())
                                                .commentContent(comment.getCommentContent())
                                                .createdAt(comment.getCreatedAt())
                                                .modifiedAt(comment.getModifiedAt())
                                                .build();
                                    }).collect(Collectors.toList()))
                            .build();
                }).collect(Collectors.toList());
    }
}
