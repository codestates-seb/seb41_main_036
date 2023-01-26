package com.main36.pikcha.global.security.jwt.exception;


import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;

public class TokenSignatureInvalid extends BusinessLogicException {
    public TokenSignatureInvalid() {
        super(ExceptionCode.TOKEN_SIGNATURE_INVALID.getMessage(), ExceptionCode.TOKEN_SIGNATURE_INVALID);
    }
}
