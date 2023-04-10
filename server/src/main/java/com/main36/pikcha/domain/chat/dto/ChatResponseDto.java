package com.main36.pikcha.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatResponseDto {
    private Long chatId;
    private Long memberId;
    private Long targetId;
    private String targetContent;
    private String targetPicture;
    private String targetUsername;
    private String picture;
    private String username;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "s", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    private String content;
    private String verifyKey;
    private ChatMessage.MessageType type;
}
