package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
public class ChatPostDto {
    private Long memberId;
    @Setter
    private String content;
    @Setter
    private String verifyKey;
    @Setter
    private ChatMessage.MessageType type;
}
