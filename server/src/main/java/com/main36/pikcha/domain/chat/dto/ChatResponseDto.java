package com.main36.pikcha.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatResponseDto {
    private Long Id;
    private String picture;
    private String username;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년 MM월 dd일 hh시 mm분", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    private String content;
    private String verifyKey;
    private ChatMessage.MessageType type;
}
