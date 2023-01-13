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

import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    @Mapping(target = "views", constant = "0")
    @Mapping(target = "likes", constant = "0")
    Post postDtoToPost(PostDto postDto);

    PostResponseDto postToPostResponseDto(Post post);

    @Mapping(target = "username", expression = "java(post.getMember().getUsername())")
    @Mapping(target = "userImage", expression = "java(post.getMember().getPicture())")
    PostHomeDto postToPostHomeDto(Post post);

    default PostDetailResponseDto postToPostDetailDto(Post post) {
        return PostDetailResponseDto.builder()
                .postTitle(post.getPostTitle())
                .attractionAddress(post.getAttraction().getAttractionAddress())
                .views(post.getViews())
                .views(post.getLikes())
                .memberId(post.getMember().getMemberId())
                .username(post.getMember().getUsername())
                .picture(post.getMember().getPicture())
                .commentResponseDtos(post.getComments().stream()
                        .map(comment -> {
                            return CommentResponseDto.builder()
                                    .createdAt(comment.getCreatedAt())
                                    .modifiedAt(comment.getModifiedAt())
                                    .memberId(comment.getMember().getMemberId())
                                    .username(comment.getMember().getUsername())
                                    .commentId(comment.getCommentId())
                                    .commentContent(comment.getCommentContent())
                                    .build();
                        })
                        .collect(Collectors.toList()))
                .build();
    }
}
