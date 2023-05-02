package com.main36.pikcha.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

// Server -> Client 메세지 전송 성공했을 때, 기본 메세지 데이터 응답 형식
@Data
@Builder
public class ChatResponseDto{
    private Long chatId;
    private Long memberId;
    private Long targetChatId;
    private Long targetMemberId;
    private String targetContent;
    private String targetPicture;
    private String targetUsername;
    private String picture;
    private String username;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "s", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    private String content;
    private long likes;
    private Boolean isVoted;
    private Boolean isReported;
    private String verifyKey;
    private ChatMessage.MessageType type;
}
