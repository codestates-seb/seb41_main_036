package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.chat.dto.ChatDeleteDto;
import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.entity.ChatMessage.MessageType;
import com.main36.pikcha.domain.chat.mapper.ChatMapper;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMapper mapper;
    private final ChatService chatService;
    private final MemberService memberService;

    @MessageMapping("/chat")
//  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
    public void processMessage(ChatPostDto chatPostDto) {
//        ZoneId zoneId = ZoneId.systemDefault();

        Member member = memberService.findMemberByMemberId(chatPostDto.getMemberId());
        log.info("loginMember.getEmail() in ChatController ={}", member.getEmail());
        handleJoinAndLeave(chatPostDto, member.getUsername());

        if (MessageType.CHAT.equals(chatPostDto.getType())) {
            ChatPostDto handleChatPostDto = handleException(chatPostDto);
            ChatMessage chatMessage = mapper.postDtoToChatMessage(handleChatPostDto, member);
            ChatMessage message = chatService.createMessage(chatMessage);
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message);
            //            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message, zoneId);
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
        }
    }

    @MessageMapping("/delete") // 클라이언트 저희 서버 브로커에게 요청하는 주소 데이터를 보내는 주소
//  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
    public void deleteMessage(ChatDeleteDto chatDeleteDto) {

        List<Long> ids = chatDeleteDto.getIds();
        Long memberId = chatDeleteDto.getMemberId();
        int flag = 0;
//        ids.stream().forEach(chatId -> {
//            verifyId(chatId, memberId);
//         });
        for (Long id : ids) {
            if (verifyId(id, memberId)) {
                flag++;
            }
        }

        if (flag == ids.size()) {
            List<Long> longs = chatService.deleteMessages(ids);
            messagingTemplate.convertAndSend("/topic/messages", longs);
        } else {
            messagingTemplate.convertAndSend("/topic/messages", "CDF");
        }
    }

    private boolean verifyId(Long chatId, Long memberId) {
        if (memberId == 1) {
            return true;
        }

        ChatMessage findChat = chatService.findVerifiedChatMessage(chatId);

        if (!findChat.getMemberId().equals(memberId)) {
            messagingTemplate.convertAndSend("/topic/messages", "MNA_" + chatId);
            return false;
        }
        return true;
    }

    private ChatPostDto handleException(ChatPostDto chatPostDto) {
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

    private void handleJoinAndLeave(ChatPostDto chatPostDto, String username) {

        if (MessageType.JOIN.equals(chatPostDto.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", username + " 님이 입장했습니다");
        }

        if (MessageType.LEAVE.equals(chatPostDto.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", username + " 님이 퇴장했습니다");
        }
    }


}
