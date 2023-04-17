package com.main36.pikcha.domain.chat.dto;

import lombok.Data;

@Data
public class ChatLikesResponseDto {
    private Boolean isVoted;
    private long likes;
}
