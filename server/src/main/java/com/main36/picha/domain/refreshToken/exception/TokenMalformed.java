package com.main36.picha.domain.refreshToken.exception;

import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;

public class TokenMalformed extends BusinessLogicException {
    public TokenMalformed() {
        super(ExceptionCode.TOKEN_MALFORMED.getMessage(), ExceptionCode.TOKEN_MALFORMED);
    }
}
