package com.main36.picha.domain.refreshToken.exception;


import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;

public class TokenEmpty extends BusinessLogicException {

    public TokenEmpty() {
        super(ExceptionCode.TOKEN_ILLEGAL_ARGUMENT.getMessage(), ExceptionCode.TOKEN_ILLEGAL_ARGUMENT);
    }
}
