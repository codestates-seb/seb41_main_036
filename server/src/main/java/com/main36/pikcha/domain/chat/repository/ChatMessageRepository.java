package com.main36.pikcha.domain.chat.repository;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByContentContainingIgnoreCase(String keyword);
}
