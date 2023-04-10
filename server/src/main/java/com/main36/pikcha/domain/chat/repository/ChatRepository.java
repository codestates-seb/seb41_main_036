package com.main36.pikcha.domain.chat.repository;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
//    List<ChatMessage> findChatMessageByMessageContainingIgnoreCase(String content);
    List<ChatMessage> findTop3ByOrderByChatIdDesc();
    List<ChatMessage> findTop3ByChatIdLessThanOrderByChatIdDesc(Long Id);
    List<ChatMessage> findAllByCreatedAtBetweenOrderByCreatedAtAsc(LocalDateTime startDateTime, LocalDateTime endDateTime);


}
