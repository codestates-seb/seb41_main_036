package com.main36.pikcha.domain.chat.repository;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findTop20ByOrderByChatIdDesc();
    List<ChatMessage> findTop20ByChatIdLessThanOrderByChatIdDesc(Long Id);
    List<ChatMessage> findTop20ByChatIdGreaterThanEqualOrderByChatIdDesc(Long Id);
    List<ChatMessage> findTop20ByChatIdGreaterThanEqualAndChatIdLessThanEqualOrderByChatIdAsc(Long gte, Long lte);
    Long countTop20ByChatIdGreaterThanEqualAndChatIdLessThanEqual(Long gte, Long lte);
    List<ChatMessage> findChatMessagesByContentContainingIgnoreCaseAndCreatedAtBetweenOrderByCreatedAtAsc(String content, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
