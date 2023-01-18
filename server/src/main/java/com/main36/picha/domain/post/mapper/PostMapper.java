package com.main36.picha.domain.post.mapper;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.post.dto.*;
import com.main36.picha.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    // 포스트 등록
    default Post postRegisterDtoToPost(PostRegisterDto postRegisterDto, Member member, Attraction attraction, List<Comment> comments) {
        if (postRegisterDto == null && member == null && attraction == null && comments == null) {
            return null;
        }

        assert postRegisterDto != null;

        Post.PostBuilder post = Post.builder();
        post.postTitle(postRegisterDto.getPostTitle());
        post.postContent(postRegisterDto.getPostContent());
        post.hashTagContent(postRegisterDto.getHashTagContent());

        post.member(member);
        post.attraction(attraction);
        post.comments(comments);

        return post.build();
    }

    // 포스트 수정
    Post postPatchDtoToPost(PostPatchDto postPatchDto);


    // 포스트 단일 조회 리스폰스
    default SinglePostResponseDto postToSingleResponseDto(Post post) {

        if (post == null) {
            return null;
        }

        return SinglePostResponseDto.builder()
                .postId(post.getPostId())
                .postTitle(post.getPostTitle())
                .postContent(post.getPostContent())
                .hashTagContent(post.getHashTagContent())
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

    @Mapping(target = "memberId", expression = "java(post.getMember().getMemberId())")
    @Mapping(target = "username", expression = "java(post.getMember().getUsername())")
    @Mapping(target = "picture", expression = "java(post.getMember().getPicture())")
    PostHomeDto postToPostHomeDto(Post post);

    default List<PostHomeDto> postListToPostHomeResponseDtoList(List<Post> postList) {
        if (postList == null) {
            return  null;
        }

        return postList.stream()
                .map(post -> {
                    return PostHomeDto.builder()
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



    // 포스트 페이지(전체 조회) 리스폰스
    default List<SinglePostResponseDto> postListToPostPageResponseDtoList(List<Post> postList) {

        if (postList == null) {
            return null;
        }

        return postList.stream()
                .map(post -> {
                    return SinglePostResponseDto.builder()
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
    }
}
