package com.main36.picha.domain.comment.mapper;

import com.main36.picha.domain.comment.dto.CommentDto;
import com.main36.picha.domain.comment.dto.CommentResponseDto;
import com.main36.picha.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment CommentDtoToComment(CommentDto commentDto);

    @Mapping(target = "username", source = "member.username")
    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "memberPicture", source = "member.picture")
    CommentResponseDto commentToCommentResponseDto(Comment comment);

    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);
}
