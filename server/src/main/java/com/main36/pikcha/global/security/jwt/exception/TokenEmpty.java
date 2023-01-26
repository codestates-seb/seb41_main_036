package com.main36.pikcha.global.security.jwt.exception;


import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;

public class TokenEmpty extends BusinessLogicException {

    public TokenEmpty() {
        super(ExceptionCode.TOKEN_ILLEGAL_ARGUMENT.getMessage(), ExceptionCode.TOKEN_ILLEGAL_ARGUMENT);
    }
}
