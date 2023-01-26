package com.main36.pikcha.global.security.jwt.exception;

import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;

public class TokenRefreshExpired extends BusinessLogicException {

    public TokenRefreshExpired() {
        super(ExceptionCode.REFRESH_TOKEN_EXPIRED.getMessage(),ExceptionCode.REFRESH_TOKEN_EXPIRED);
    }
}
