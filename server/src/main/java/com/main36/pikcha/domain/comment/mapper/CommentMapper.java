package com.main36.pikcha.domain.comment.mapper;

import com.main36.pikcha.domain.comment.dto.CommentDetailResponseDto;
import com.main36.pikcha.domain.comment.dto.CommentDto;
import com.main36.pikcha.domain.comment.dto.CommentResponseDto;
import com.main36.pikcha.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment CommentDtoToComment(CommentDto commentDto);

    @Mapping(target = "username", source = "member.username")
    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "memberPicture", source = "member.picture")
    @Mapping(target = "parentId", source = "parent.commentId")
    CommentResponseDto commentToCommentResponseDto(Comment comment);

    @Mapping(target = "username", source = "member.username")
    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "memberPicture", source = "member.picture")
    @Mapping(target = "parentId", source = "parent.commentId")
    CommentDetailResponseDto commentToCommentDetailResponseDto(Comment comment);

    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);
    List<CommentDetailResponseDto> commentsToCommentDetailResponseDtos(List<Comment> comments);
}
