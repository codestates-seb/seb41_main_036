package com.main36.picha.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_NOT_ALLOW(405, "That Member doesn't have authority"),
    MEMBER_EXISTS(409, "Member exists"),

    CLIENT_IS_NOT_EQUAL(400, "Client is not equal memberId"),

    ATTRACTION_NOT_FOUND(404, "Attraction not found"),
    ATTRACTION_EXISTS(409, "Attraction exists"),

    ATTRACTION_IMAGE_NOT_FOUND(404, "Attraction image not found"),
    ATTRACTION_IMAGE_EXISTS(409, "Attraction image exists"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_EXISTS(409, "Comment exists"),

    NOT_AUTHOR(403, "This Member didn't write the Comment"),

    HASHTAG_NOT_FOUND(404, "HashTag not found"),
    HASHTAG_EXISTS(409, "HashTag exists"),

    POST_NOT_FOUND(404, "Post not found"),
    POST_EXISTS(409, "Post exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
