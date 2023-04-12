package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Getter;

import java.util.List;

// Server -> Client 메세지 삭제가 성공했을 때 응답
@Getter
public class ChatDeleteResponseDto {
    private List<Long> ids;
    private ChatMessage.MessageType type = ChatMessage.MessageType.DELETE;
    public ChatDeleteResponseDto(List<Long> ids) {
        this.ids = ids;
    }
}
