package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.aop.LoginUserEmail;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Null;

//@RestController
@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

//    @MessageMapping("/chat") // front : publish destination: '/app/chat'
////  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
//    public void processMessage(@Payload ChatMessage chatMessage) {
//
//        log.info("chatMessage.getContent()) = {}", chatMessage.getContent());
//        log.info("chatMessage.getSender()) = {}", chatMessage.getSender());
//
////        ChatMessage message = new ChatMessage();
////        message.setContent(chatMessage.getContent());
////        message.setSender(chatMessage.getSender());
////        chatService.saveMessage(message);
//
////        명시적으로 메시지를 변환하고 대상에게 전송할 수 있습니다.
//        messagingTemplate.convertAndSend("/topic/messages", chatMessage);
//
//        //두 방법 모두 메시지를 클라이언트에게 전송하는 데 사용되지만,
//        // convertAndSend()를 사용하면 메시지 전송 시점을 더 세밀하게 제어할 수 있습니다.
//        // 이를 통해 더 복잡한 시나리오에서 메시지 전송을 관리할 수 있습니다.
//    }

    @MessageMapping("/chat") // front : publish destination: '/app/chat'
//    @LoginUser
    public void processMessage(@Payload ChatPostDto chatPostDto) {
        // 내가 보낸 메시지 도달이 안됐을 때만 !
        if (chatPostDto == null) {
            throw new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND);
        }

        log.info("chatMessage.getContent()) = {}", chatPostDto.getContent());
        log.info("chatMessage.getVerifyKey()) = {}", chatPostDto.getVerifyKey());
        log.info("chatMessage.getVerifyKey()) = {}", chatPostDto.getType());

        // nickname
        messagingTemplate.convertAndSend("/topic/messages", chatPostDto);

    }
}
