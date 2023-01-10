package com.main36.picha.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DataResponseDto<T> {
    private T data;
}
