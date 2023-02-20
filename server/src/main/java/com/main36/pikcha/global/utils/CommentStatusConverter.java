package com.main36.pikcha.global.utils;

import com.main36.pikcha.domain.comment.entity.Comment;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CommentStatusConverter implements AttributeConverter<Comment.CommentStatus, String> {
    @Override
    public String convertToDatabaseColumn(Comment.CommentStatus attribute) {
        return attribute.getCode();
    }

    @Override
    public Comment.CommentStatus convertToEntityAttribute(String dbData) {
        return Comment.CommentStatus.ofCode(dbData);
    }
}
