package com.main36.pikcha.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class ChatSearchResponseDto {
    private long chatId;
    private long memberId;
    private String picture;
    private String username;
    private String content;
    private LocalDateTime createdAt;
}
