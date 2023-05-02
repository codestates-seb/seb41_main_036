package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Client -> Server 메세지 보내는 데이터 형식
@Getter
@NoArgsConstructor
public class ChatPostDto {
    private Long memberId;
    @Setter
    private String content;
    @Setter
    private String verifyKey;
    @Setter
    private ChatMessage.MessageType type;

    public ChatPostDto(Long memberId, ChatMessage.MessageType type) {
        this.memberId = memberId;
        this.type = type;
    }
}
