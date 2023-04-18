package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatReportResponseDto {
    private Long chatId;
    private String message;
    private ChatMessage.MessageType type;
    public ChatReportResponseDto(Long chatId, String message, ChatMessage.MessageType type) {
        this.chatId = chatId;
        this.message = message;
        this.type = type;
    }
}
