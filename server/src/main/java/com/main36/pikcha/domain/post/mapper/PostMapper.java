package com.main36.pikcha.domain.post.mapper;


import com.main36.pikcha.domain.comment.dto.CommentResponseDto;
import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.post.dto.*;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post_image.entity.PostImage;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    Post postPatchDtoToPost(PostDto.Patch postPatchDto);

    default PostResponseDto.Detail postToPostDetailResponseDto(Post post) {

        if (post == null) {
            return null;
        }

        return PostResponseDto.Detail.builder()
                .postId(post.getPostId())
                .postTitle(post.getPostTitle())
                .postContents(post.getPostContents())
                .postHashTags(post.getHashTags().stream()
                        .map(HashTag::getHashTagContent)
                        .collect(Collectors.toList()))
                .postImageUrls(post.getPostImages().stream()
                        .map(PostImage::getPostImageUrl)
                        .collect(Collectors.toList()))
                .attractionId(post.getAttraction().getAttractionId())
                .attractionAddress(post.getAttraction().getAttractionAddress())
                .attractionName(post.getAttraction().getAttractionName())
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
                .modifiedAt(post.getModifiedAt())
                .build();
    }

    default List<PostResponseDto.Home> postListToPostHomeResponseDtoList(List<Post> postList) {
        if (postList == null) {
            return  null;
        }

        return postList.stream()
                .map(post -> {
                    return PostResponseDto.Home.builder()
                            .postId(post.getPostId())
                            .memberId(post.getMember().getMemberId())
                            .username(post.getMember().getUsername())
                            .picture(post.getMember().getPicture())
                            .views(post.getViews())
                            .likes(post.getLikes())
                            .postTitle(post.getPostTitle())
                            .createdAt(post.getCreatedAt())
                            .modifiedAt(post.getModifiedAt())
                            .build();
                }).collect(Collectors.toList());
    }

    /*default List<PostResponseDto.Detail> postListToPostPageResponseDtoList(List<Post> postList) {

        if (postList == null) {
            return null;
        }

        return postList.stream()
                .map(post -> {
                    return PostResponseDto.Detail.builder()
                            .postId(post.getPostId())
                            .postTitle(post.getPostTitle())
                            .postContent(post.getPostContent())
                            .hashTagContent(post.getHashTagContent())
                            .attractionId(post.getAttraction().getAttractionId())
                            .attractionAddress(post.getAttraction().getAttractionAddress())
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
                            .modifiedAt(post.getModifiedAt())
                            .build();
                }).collect(Collectors.toList());
    }*/
}
