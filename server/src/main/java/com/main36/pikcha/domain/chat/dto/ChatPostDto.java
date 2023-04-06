package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Data;

@Data
public class ChatPostDto {
    private String content;
    private String verifyKey;
    private ChatMessage.MessageType type;
}
