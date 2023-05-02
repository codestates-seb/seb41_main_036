package com.main36.pikcha.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Slice;

@Getter
@AllArgsConstructor
public class DataAndHasNextResponseDto<T> {
    private T data;
    private boolean hasNext;

    public DataAndHasNextResponseDto(T data, Slice slice) {
        this.data = data;
        this.hasNext = slice.hasNext();
    }
}
