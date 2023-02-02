package com.main36.pikcha.global.security.jwt.exception;

import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;

public class TokenMalformed extends BusinessLogicException {
    public TokenMalformed() {
        super(ExceptionCode.TOKEN_MALFORMED.getMessage(), ExceptionCode.TOKEN_MALFORMED);
    }
}
