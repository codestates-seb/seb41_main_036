package com.main36.pikcha.domain.chat.listener;

import com.main36.pikcha.domain.chat.dto.ChatEntranceDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.connection.entity.Connection;
import com.main36.pikcha.domain.connection.repository.ConnectionRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;


@Slf4j
@Component
@RequiredArgsConstructor
public class ChatListener {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ConnectionRepository repository;
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        if(sessionId != null) {
            Connection connection = repository.findTopBySessionId(sessionId).orElseThrow( ()-> new BusinessLogicException(ExceptionCode.CONNECTION_NOT_FOUND));
            repository.delete(connection);
            long currentNumberOfUsers= repository.count();
            ChatEntranceDto response = new ChatEntranceDto(connection.getUsername(), connection.getMemberId(), currentNumberOfUsers, LocalDateTime.now(), ChatMessage.MessageType.LEAVE);
            messagingTemplate.convertAndSend("/topic/messages", response);
        }
    }
}
