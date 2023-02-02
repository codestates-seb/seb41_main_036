package com.main36.pikcha.global.security.jwt.exception;

import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;

public class TokenUnsupported extends BusinessLogicException {
    public TokenUnsupported() {
        super(ExceptionCode.TOKEN_UNSUPPORTED.getMessage(), ExceptionCode.TOKEN_UNSUPPORTED);
    }
}
