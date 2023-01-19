package com.main36.picha.global.exception;

import lombok.Getter;
@Getter
public class BusinessLogicException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public BusinessLogicException(String message, ExceptionCode exceptionCode) {
        super(message);
        this.exceptionCode = exceptionCode;
    }

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }


}
