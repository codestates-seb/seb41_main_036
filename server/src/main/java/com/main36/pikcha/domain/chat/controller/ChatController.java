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
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/chat/test")
    public ResponseEntity testChat(ChatPostDto chatPostDto) {
        Member member = memberService.findMemberByMemberId(1L);
        chatService.createMessage(mapper.postDtoToChatMessage(chatPostDto, member));
        return ResponseEntity.ok(new DataResponseDto<>(null));
    }

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
    public void deleteMessages(ChatDeleteDto chatDeleteDto) {

        List<Long> ids = chatDeleteDto.getIds();
        Long memberId = chatDeleteDto.getMemberId();

        // 모두 삭제할 수 있는 채팅이라면
        if (verifyId(ids, memberId)) {
            List<Long> longs = chatService.deleteMessages(ids);
            messagingTemplate.convertAndSend("/topic/messages", longs);
        }
        // 하나라도 삭제가 불가능하다면
        else {
            messagingTemplate.convertAndSend("/topic/messages", "CDF");
        }
    }

    @GetMapping("/app/enter")
    public ResponseEntity getInitMessages(){
        List<ChatMessage> messageList = chatService.getInitialMessages();
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
    }

    @GetMapping("/app/load/{chat-id}")
    public ResponseEntity getMoreMessagesAfter(@PathVariable(value = "chat-id", required = false) Long lastChatId){
        List<ChatMessage> messageList = chatService.getMoreMessages(lastChatId);
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
    }

    @GetMapping("/app/load/{year-month}")
    public ResponseEntity findMessagesBetween(@PathVariable(value = "year-month", required = false) String yearAndMonth){
        List<ChatMessage> messageList = chatService.getMessagesBetween(yearAndMonth);
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
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

    private boolean verifyId(List<Long> chatIds, Long memberId) {
        if (memberId == 1) {
            return true;
        }
        boolean flag = true;

        for (Long id : chatIds) {
            ChatMessage findChat = chatService.findVerifiedChatMessage(id);
            // 삭제가 불가능한 id인 경우 메세지를 뿌리고 false 반환
            if (!findChat.getMemberId().equals(memberId)) {
                messagingTemplate.convertAndSend("/topic/messages", "MNA_" + id);
                flag = false;
            }
        }

        return flag;
    }

}
