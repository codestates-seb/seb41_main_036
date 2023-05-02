package com.main36.pikcha.domain.chat.repository;


import com.main36.pikcha.domain.chat.entity.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

public interface ChatCustomRepository {
    Slice<ChatMessage> findMessageByRange(Long gte, Long lte, Pageable pageable);
}
