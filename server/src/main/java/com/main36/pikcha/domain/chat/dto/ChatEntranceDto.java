package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatEntranceDto {
    private String username;
    private long memberId;
    private ChatMessage.MessageType type;
}
