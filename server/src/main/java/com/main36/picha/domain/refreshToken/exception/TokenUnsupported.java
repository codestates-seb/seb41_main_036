package com.main36.picha.domain.refreshToken.exception;

import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;

public class TokenUnsupported extends BusinessLogicException {

    public TokenUnsupported() {
        super(ExceptionCode.TOKEN_UNSUPPORTED.getMessage(), ExceptionCode.TOKEN_UNSUPPORTED);
    }
}
