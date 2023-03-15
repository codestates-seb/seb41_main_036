package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.PostConstruct;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @PostConstruct
    @MessageMapping("/chat/message")
    @SendTo()
    public void message(ChatMessage chatMessage) {
        if(chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장하셨습니다.");
        }
        messageSendingOperations.convertAndSend("/topic/");
    }


}
