package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.attraction.dto.AttractionLikesResponseDto;
import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.chat.dto.*;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.entity.ChatMessage.MessageType;
import com.main36.pikcha.domain.chat.mapper.ChatMapperSecond;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMapperSecond mapper;
    private final ChatService chatService;
    private final MemberService memberService;


    // 테스트용 채팅 생성 메서드
    @PostMapping("/chat/test")
    public ResponseEntity testChat(@RequestBody ChatPostDto chatPostDto) {
        log.info("content = {}", chatPostDto.getContent());
        log.info("verifyKey = {}", chatPostDto.getVerifyKey());
        log.info("type = {}", chatPostDto.getType());
        Member member = memberService.findMemberByMemberId(1L);
        ChatMessage message = chatService.createMessage(mapper.postDtoToChatMessage(chatPostDto, member));
        return ResponseEntity.ok(new DataResponseDto<>(message));
    }

    // 받은 채팅 저장 후 뿌리기
    @MessageMapping("/chat")
//  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
    public void processMessage(ChatPostDto chatPostDto) {
//        ZoneId zoneId = ZoneId.systemDefault();

        Member member = memberService.findMemberByMemberId(chatPostDto.getMemberId());
        log.info("loginMember.getEmail() in ChatController ={}", member.getEmail());
//        handleJoinAndLeave(chatPostDto, member.getUsername());
        if (MessageType.JOIN.equals(chatPostDto.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", new ChatEntranceDto(member.getUsername(), member.getMemberId(), MessageType.JOIN));
        }
        if (MessageType.CHAT.equals(chatPostDto.getType())) {
            ChatPostDto handleChatPostDto = handleException(chatPostDto);
            ChatMessage chatMessage = mapper.postDtoToChatMessage(handleChatPostDto, member);
            ChatMessage message = chatService.createMessage(chatMessage);
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message);
            //            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message, zoneId);
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
        }
    }

    // 채팅에 답장하기
    @MessageMapping("/reply")
    public void replyMessage(ChatReplyDto chatReplyDto) {
        Member member = memberService.findMemberByMemberId(chatReplyDto.getMemberId());

        if (MessageType.REPLY.equals(chatReplyDto.getType())) {
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(chatService.createMessage(mapper.replyDtoToChatMessage(chatReplyDto, member)));
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
        }

    }

    // 채팅 삭제하기
    @MessageMapping("/delete")
    public void deleteMessages(ChatDeleteDto chatDeleteDto) {

        List<Long> ids = chatDeleteDto.getIds();
        Long memberId = chatDeleteDto.getMemberId();

        // 모두 삭제할 수 있는 채팅이라면
        if (verifyId(ids, memberId)) {
            List<Long> longs = chatService.deleteMessages(ids);
            messagingTemplate.convertAndSend("/topic/messages", new ChatDeleteResponseDto(longs));
        }
        // 하나라도 삭제가 불가능하다면
        else {
            messagingTemplate.convertAndSend("/topic/messages", new ChatDeleteErrorResponseDto("채팅 삭제가 불가능합니다"));
            log.info("Chat Deletion has failed => CDF");
        }
    }

    // 채팅방 입장했을 시 채팅목록 불러오기
    @GetMapping("/app/enter")
    public ResponseEntity getInitMessages(){
        List<ChatMessage> messageList = chatService.getInitialMessages();
        Collections.reverse(messageList);
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
    }

    // 마지막 채팅 id 이후로 채팅 더 불러오기
    @GetMapping("/app/load/{chat-id}")
    public ResponseEntity getMoreMessagesAfter(@PathVariable(value = "chat-id", required = false) Long lastChatId){
        List<ChatMessage> messageList = chatService.getMoreMessages(lastChatId);
        Collections.reverse(messageList);
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
    }

    // 연도&월을 기준 특정 검색어로 채팅 검색하기
    @GetMapping("/app/search/{content}/{year-month}")
    public ResponseEntity findMessagesBetween(@PathVariable(value = "content") String content,
                                              @PathVariable(value = "year-month") String yearAndMonth){
        List<ChatMessage> messageList = chatService.getMessagesBetween(content, yearAndMonth);
        return new ResponseEntity(new DataResponseDto<>(messageList), HttpStatus.OK);
    }

    // 채팅 좋아요
    @LoginUser
    @PostMapping("/app/likes/{chat-id}")
    public ResponseEntity<DataResponseDto<?>> voteAttraction(Member loginUser,
                                                             @PathVariable("chat-id") @Positive long chatId) {

        Member member = memberService.findMemberByMemberId(loginUser.getMemberId());
        ChatMessage chatMessage = chatService.findVerifiedChatMessage(chatId);
        boolean status = chatService.voteChat(member, chatMessage);

        ChatLikesResponseDto response = new ChatLikesResponseDto();
        response.setIsVoted(status);
        response.setLikes(chatMessage.getLikes());

        return new ResponseEntity<>(new DataResponseDto<>(response), HttpStatus.OK);
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
            messagingTemplate.convertAndSend("/topic/messages", new ChatEntranceDto());
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
//                messagingTemplate.convertAndSend("/topic/messages", "MNA_" + id);
                log.info("chatId_{} cannot be deleted", id);
                flag = false;
            }
        }

        return flag;
    }

}
