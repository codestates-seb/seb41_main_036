package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Getter;
import lombok.Setter;

// Client -> Server 답장 메세지 보내는 데이터 형식
@Getter
public class ChatReplyDto {
    private Long memberId;
    private Long targetId;
    @Setter
    private String content;
    @Setter
    private String verifyKey;
    @Setter
    private ChatMessage.MessageType type;
}
