package com.main36.picha.domain.post.mapper;


import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.post.dto.PostDetailResponseDto;
import com.main36.picha.domain.post.dto.PostDto;
import com.main36.picha.domain.post.dto.PostHomeDto;
import com.main36.picha.domain.post.dto.PostResponseDto;
import com.main36.picha.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    @Mapping(target = "views", constant = "0")
    @Mapping(target = "likes", constant = "0")
    Post postDtoToPost(PostDto postDto);

    PostResponseDto postToPostResponseDto(Post post);
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
                            .memberId(post.getMember().getMemberId())
                            .username(post.getMember().getUsername())
                            .picture(post.getMember().getPicture())
                            .comments(post.getComments().stream()
                                    .map(comment -> {
                                        return CommentResponseDto.builder()
                                                .memberId(comment.getMember().getMemberId())
                                                .username(comment.getMember().getUsername())
                                                .picture(comment.getMember().getPicture())
                                                .commentId(comment.getCommentId())
                                                .commentContent(comment.getCommentContent())
                                                .createdAt(comment.getCreatedAt())
                                                .modifiedAt(comment.getModifiedAt())
                                                .build();
                                    }).collect(Collectors.toList()))
                            .build();
                }).collect(Collectors.toList());
    }
}
