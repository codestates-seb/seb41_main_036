package com.main36.pikcha.domain.chat.dto;

import lombok.Getter;

import java.util.List;

// Client -> Server 삭제 요청 데이터 형식
@Getter
public class ChatDeleteDto {
    private List<Long> ids;
    private Long memberId;
}
