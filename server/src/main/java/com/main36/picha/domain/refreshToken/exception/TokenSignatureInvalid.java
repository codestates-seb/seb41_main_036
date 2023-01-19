package com.main36.picha.domain.refreshToken.exception;


import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;

public class TokenSignatureInvalid extends BusinessLogicException {
    public TokenSignatureInvalid() {
        super(ExceptionCode.TOKEN_SIGNATURE_INVALID.getMessage(), ExceptionCode.TOKEN_SIGNATURE_INVALID);
    }
}
