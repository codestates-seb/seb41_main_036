package com.main36.pikcha.domain.chat.dto;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatLikesResponseDto {
    private long memberId;
    private Boolean isVoted;
    private long likes;
    private long chatId;
    private ChatMessage.MessageType type;
}
