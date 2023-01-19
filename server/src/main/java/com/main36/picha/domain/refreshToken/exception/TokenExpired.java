package com.main36.picha.domain.refreshToken.exception;

import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;

public class TokenExpired extends BusinessLogicException {

    public TokenExpired() {
        super(ExceptionCode.TOKEN_EXPIRED.getMessage(),ExceptionCode.TOKEN_EXPIRED);
    }
}