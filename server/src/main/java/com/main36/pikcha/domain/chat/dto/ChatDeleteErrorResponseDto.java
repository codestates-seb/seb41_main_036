package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Getter;


// Server -> Client 메세지 삭제가 실패했을 때 응답
@Getter
public class ChatDeleteErrorResponseDto {
    private String errorMessage;
    private ChatMessage.MessageType type = ChatMessage.MessageType.ERROR;

    public ChatDeleteErrorResponseDto(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
