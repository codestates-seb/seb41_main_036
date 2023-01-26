package com.main36.pikcha.global.security.jwt.exception;

import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import net.minidev.json.writer.BeansMapper;

public class RefreshExpired extends BusinessLogicException {

    public RefreshExpired() {
        super(ExceptionCode.REFRESH_TOKEN_EXPIRED.getMessage(),ExceptionCode.REFRESH_TOKEN_EXPIRED);
    }
}
