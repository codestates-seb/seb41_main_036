package com.main36.pikcha.domain.chat.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ChatDeleteDto {
    private List<Long> ids;
    private Long memberId;
}
