package com.main36.pikcha.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    /* MEMBER */
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_NOT_ALLOW(405, "That Member doesn't have authority"),
    MEMBER_EXISTS(409, "Member exists"),
    USER_IS_NOT_EQUAL(400, "Client is not equal memberId"),

    /* ATTRACTION */
    ATTRACTION_NOT_FOUND(404, "Attraction not found"),
    ATTRACTION_EXISTS(409, "Attraction exists"),
    ATTRACTION_IMAGE_NOT_FOUND(404, "Attraction image not found"),
    ATTRACTION_IMAGE_EXISTS(409, "Attraction image exists"),

    /* COMMENT */
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_STATUS_INVALID(404, "Comment status is inValid"),
    COMMENT_EXISTS(409, "Comment exists"),
    NOT_AUTHOR(403, "This Member didn't write the Comment"),

    /* HASHTAG */
    HASHTAG_NOT_FOUND(404, "HashTag not found"),
    HASHTAG_EXISTS(409, "HashTag exists"),

    /* POST */
    POST_NOT_FOUND(404, "Post not found"),
    POST_EXISTS(409, "Post exists"),
    POST_IMAGE_NOT_FOUND(404, "Post Image not found"),

    /* JWT */
    ACCESS_TOKEN_NOT_FOUND(404, "AccessToken can not be found"),
    TOKEN_EXPIRED(400, "Token Expired"),
    REFRESH_TOKEN_EXPIRED(400, "RefreshToken Expired"),
    TOKEN_INVALID(400, "Token Invalid"),
    TOKEN_EMPTY(404, "Token not found"),
    TOKEN_SIGNATURE_INVALID(400, "Token Signature Invalid"),
    TOKEN_MALFORMED(400, "Token Malformed"),
    TOKEN_UNSUPPORTED(400, "Token Unsupported"),
    TOKEN_ILLEGAL_ARGUMENT(400, "Token Illegal Argument"),

    /* CHAT */
    CHAT_NOT_FOUND(404, "Chat not found" ),
    CHAT_CANNOT_BE_DELETED(400, "Chat cannot be deleted"),
    CONNECTION_NOT_FOUND(404, "Connection not found");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
