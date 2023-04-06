package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.entity.ChatMessage.MessageType;
import com.main36.pikcha.domain.chat.mapper.ChatMapper;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.global.aop.LoginUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

//@RestController
@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMapper mapper;
    private final ChatService chatService;

    @MessageMapping("/chat")
    @LoginUser
//  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
    public void processMessage(ChatPostDto chatPostDto, Member loginMember) {
        log.info("loginMember.getEmail() in ChatController ={}", loginMember.getEmail());
        handleJoinAndLeave(chatPostDto, loginMember);

        if (MessageType.CHAT.equals(chatPostDto.getType())) {
            ChatPostDto handleChatPostDto = handleException(chatPostDto, loginMember);
            ChatMessage chatMessage = mapper.postDtoToChatMessage(handleChatPostDto, loginMember);
            ChatMessage message = chatService.createMessage(chatMessage);
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message);
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
        }
    }

    private ChatPostDto handleException(ChatPostDto chatPostDto, Member loginMember) {
        if (chatPostDto.getType() == null) {
            chatPostDto.setType(MessageType.CHAT);
        }

        if (chatPostDto.getContent() == null) {
            chatPostDto.setContent("null@#$@#$");
        }

        if (chatPostDto.getVerifyKey() == null) {
            chatPostDto.setVerifyKey("%%#$%!@#$@#%!$@#!");
        }

        return chatPostDto;
    }

    private void handleJoinAndLeave(ChatPostDto chatPostDto, Member loginMember) {

        if (MessageType.JOIN.equals(chatPostDto.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", loginMember.getUsername() + " 님이 입장했습니다");
        }

        if (MessageType.LEAVE.equals(chatPostDto.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", loginMember.getUsername() + " 님이 퇴장했습니다");
        }
    }
}
