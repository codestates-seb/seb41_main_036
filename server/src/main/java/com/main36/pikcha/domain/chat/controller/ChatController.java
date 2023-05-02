package com.main36.pikcha.domain.chat.controller;

import com.main36.pikcha.domain.chat.dto.*;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.entity.ChatMessage.MessageType;
import com.main36.pikcha.domain.chat.mapper.ChatMapperSecond;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.connection.repository.ConnectionRepository;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.aop.LoginUser;
import com.main36.pikcha.global.response.DataAndHasNextResponseDto;
import com.main36.pikcha.global.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
//    private final RabbitTemplate rabbitTemplate;
    private final ChatMapperSecond mapper;
    private final ChatService chatService;
    private final MemberService memberService;
    private final ConnectionRepository connectionRepository;
    private static final String CHAT_QUEUE_NAME = "chat.queue";
    private static final String CHAT_EXCHANGE_NAME = "chat.exchange";
    private static final String ROUTING_KEY = "messages";


    // 테스트용 채팅 생성 메서드
    @PostMapping("/chat/test")
    public ResponseEntity testChat(@RequestBody ChatPostDto chatPostDto) {
        log.info("content = {}", chatPostDto.getContent());
        chatPostDto.setContent("안녕하세요");
        log.info("verifyKey = {}", chatPostDto.getVerifyKey());
        chatPostDto.setVerifyKey("askjdhaksjhckz2314");
        log.info("type = {}", chatPostDto.getType());
        chatPostDto.setType(MessageType.CHAT);
        Member member = memberService.findMemberByMemberId(1L);
        ChatMessage message = chatService.createMessage(mapper.postDtoToChatMessage(chatPostDto, member));
        return ResponseEntity.ok(new DataResponseDto<>(message));
    }

/*    @PostMapping("/chat/testtwo")
    public void testChat() {
//        rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, "Sending Test Message");
    }

    @RabbitListener(queues = CHAT_QUEUE_NAME)
    public void receive(String message){
        System.out.println("received : " + message);
    }*/

    // 받은 채팅 저장 후 뿌리기
    @MessageMapping("/chat")
//  @SendTo: 애노테이션으로 적용되며, 메서드 반환 값이 메시지로 자동 변환되어 대상에게 전송됩니다.
    public void processMessage(ChatPostDto chatPostDto) {

        Member member = memberService.findMemberByMemberId(chatPostDto.getMemberId());
        log.info("loginMember.getEmail() in ChatController ={}", member.getEmail());
//        handleJoinAndLeave(chatPostDto, member.getUsername());
        if (MessageType.JOIN.equals(chatPostDto.getType())) {
            long currentNumberOfUsers= connectionRepository.count();
            messagingTemplate.convertAndSend("/topic/messages", new ChatEntranceDto(member.getUsername(), member.getMemberId(), currentNumberOfUsers, LocalDateTime.now(),MessageType.JOIN));
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, new ChatEntranceDto(member.getUsername(), member.getMemberId(), MessageType.JOIN));
        }
        if (MessageType.CHAT.equals(chatPostDto.getType())) {
            ChatMessage chatMessage = mapper.postDtoToChatMessage(chatPostDto, member);
            ChatMessage message = chatService.createMessage(chatMessage);
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(message);
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, chatResponseDto);
        }
    }

    // 채팅에 답장하기
    @MessageMapping("/reply")
    public void replyMessage(ChatReplyDto chatReplyDto) {
        Member member = memberService.findMemberByMemberId(chatReplyDto.getMemberId());
        ChatMessage target = chatService.findVerifiedChatMessage(chatReplyDto.getTargetId());

        if (MessageType.REPLY.equals(chatReplyDto.getType())) {
            ChatMessage saved = chatService.createMessage(mapper.replyDtoToChatMessage(chatReplyDto, target, member));
            ChatResponseDto chatResponseDto = mapper.chatMessageToResponseDto(saved);
            messagingTemplate.convertAndSend("/topic/messages", chatResponseDto);
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, chatResponseDto);
        }
    }

    // 채팅 삭제하기
    @DeleteMapping("/app/delete")
    public ResponseEntity deleteMessages(@RequestBody ChatDeleteDto chatDeleteDto) {
        List<Long> ids = chatDeleteDto.getIds();
        Long memberId = chatDeleteDto.getMemberId();
        // 모두 삭제할 수 있는 채팅이라면
        if (verifyId(ids, memberId)) {
            List<Long> longs = chatService.deleteMessages(ids);
            messagingTemplate.convertAndSend("/topic/messages", new ChatDeleteResponseDto(longs));
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, new ChatDeleteResponseDto(longs));
            return ResponseEntity.ok().build();
        }
        // 하나라도 삭제가 불가능하다면
        else {
            messagingTemplate.convertAndSend("/topic/messages", new ChatDeleteErrorResponseDto("채팅 삭제가 불가능합니다"));
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, new ChatDeleteErrorResponseDto("채팅 삭제가 불가능합니다"));
            log.info("Chat Deletion has failed => CDF");
            return ResponseEntity.badRequest().build();
        }
    }

    // 채팅방 입장했을 시 채팅목록 불러오기
    @GetMapping("/app/enter")
    @LoginUser
    public ResponseEntity getInitMessages(Member loginUser){
        List<ChatMessage> messageList = chatService.getInitialMessages();
        Collections.reverse(messageList);
        return new ResponseEntity(new DataResponseDto<>(loginMapping(messageList, loginUser.getMemberId())), HttpStatus.OK);
    }

    // 범위 안에서 채팅 20개 id 내림차순으로 반환
    @GetMapping("/app/load")
    @LoginUser
    public ResponseEntity getRangedMessages(Member loginUser,
                                               @Positive @RequestParam(required = false) Optional<Long> gte,
                                               @Positive @RequestParam(required = false) Optional<Long> lte
                                               /*@PathVariable(value = "chat-id", required = true) Long lastChatId*/){
        List<ChatMessage> messageList = new ArrayList<>();
        boolean hasNext = false;
        // 사이의 댓글 불러오기
        if(gte.isPresent() && lte.isPresent()) {
            Slice<ChatMessage> messages = chatService.getMoreMessagesGreaterThanEqualLessThanEqual(gte.get(), lte.get());
            return new ResponseEntity(new DataAndHasNextResponseDto<>(loginMapping(messages.getContent(), loginUser.getMemberId()), messages), HttpStatus.OK);

//            messageList = chatService.getMoreMessagesGreaterThanEqualLessThanEqual(gte.get(), lte.get());
//            Long numOfMessages = chatService.numOfMessagesOfRange(gte.get(), lte.get());
//            // 더 불러올게 있으면=> querydsl로 리팩토링 필요
//            if( messageList.size() < numOfMessages.intValue()) {
//                hasNext = true;
//            }
//            return new ResponseEntity(new DataAndHasNextResponseDto<>(loginMapping(messageList, loginUser.getMemberId()), hasNext), HttpStatus.OK);
        }
        // 이후 댓글 불러오기
        if(gte.isPresent() && lte.isEmpty()) {
            messageList = chatService.getMoreMessagesGreaterThanEqual(gte.get());
        }
        // 이전 댓글 불러오기
        if(gte.isEmpty() && lte.isPresent()) {
            messageList = chatService.getMoreMessagesLessThanEqual(lte.get());
        }
        Collections.reverse(messageList);
        return new ResponseEntity(new DataResponseDto<>(loginMapping(messageList, loginUser.getMemberId())), HttpStatus.OK);
    }

    @GetMapping("/app/load/{chat-id}")
    @LoginUser
    public ResponseEntity getMoreMessagesAfter(Member loginUser,
                                               @PathVariable(value = "chat-id", required = true) Long lastChatId){
        List<ChatMessage> messageList = chatService.getMoreMessagesLessThan(lastChatId);
        Collections.reverse(messageList);
        return new ResponseEntity(new DataResponseDto<>(loginMapping(messageList, loginUser.getMemberId())), HttpStatus.OK);
    }

    private List<ChatResponseDto> loginMapping(List<ChatMessage> chatMessageList, long memberId) {
        return chatMessageList.stream()
                .map(chatMessage -> ChatResponseDto.builder()
                        .chatId(chatMessage.getChatId())
                        .memberId(chatMessage.getMemberId())
                        .targetChatId(chatMessage.getTargetMessage() == null? null : chatMessage.getTargetMessage().getChatId())
                        .targetMemberId(chatMessage.getTargetMessage() == null? null : chatMessage.getTargetMessage().getMemberId())
                        .targetContent(chatMessage.getTargetMessage() == null? null : chatMessage.getTargetMessage().getContent())
                        .targetPicture(chatMessage.getTargetMessage() == null? null : chatMessage.getTargetMessage().getPicture())
                        .targetUsername(chatMessage.getTargetMessage() == null? null : chatMessage.getTargetMessage().getUsername())
                        .picture(chatMessage.getPicture())
                        .username(chatMessage.getUsername())
                        .createdAt(chatMessage.getCreatedAt())
                        .content(chatMessage.getContent())
                        .likes(chatMessage.getLikes())
                        .isVoted(chatService.isVoted(memberId, chatMessage.getChatId()))
                        .isReported(chatService.isReported(memberId, chatMessage.getChatId()))
                        .verifyKey(chatMessage.getVerifyKey())
                        .type(chatMessage.getType())
                        .build())
                .collect(Collectors.toList());
    }

    // 연도&월을 기준 특정 검색어로 채팅 검색하기
    @GetMapping("/app/search")
    public ResponseEntity findMessagesBetween(@Positive @RequestParam(required = true) String content,
                                              @Positive @RequestParam(required = true) String yearAndMonth){
        List<ChatMessage> messageList = chatService.getMessagesBetween(content, yearAndMonth);
        return new ResponseEntity(new DataResponseDto<>(mapper.chatMessagesToSearchResponseDtos(messageList)), HttpStatus.OK);
    }

    // 채팅 좋아요
    @LoginUser
    @PostMapping("/app/likes/{chat-id}")
    public void likeMessage(Member loginUser,
                               @PathVariable("chat-id") @Positive long chatId) {

        Member member = memberService.findMemberByMemberId(loginUser.getMemberId());
        ChatMessage chatMessage = chatService.findVerifiedChatMessage(chatId);
        boolean status = chatService.voteChat(member, chatMessage);

        ChatLikesResponseDto response = ChatLikesResponseDto.builder()
                .memberId(loginUser.getMemberId())
                .isVoted(status)
                .likes(chatService.findVerifiedChatMessage(chatId).getLikes())
                .chatId(chatMessage.getChatId())
                .type(MessageType.LIKES)
                .build();

        messagingTemplate.convertAndSend("/topic/messages", response);
//        rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, response);

    }

    // 채팅 신고
    @LoginUser
    @PostMapping("/app/report/{chat-id}")
    public ResponseEntity reportMessage(Member loginUser,
                              @PathVariable("chat-id") @Positive long chatId) {
//        ChatMessage findChatMessage = chatService.findVerifiedChatMessage(chatId);
        if(chatService.isReported(loginUser.getMemberId(), chatId)){
            return ResponseEntity.badRequest().build();
        }
        ChatMessage chatMessage = chatService.reportMessage(loginUser, chatId);
        if(MessageType.REPORT.equals(chatMessage.getType())) {
            messagingTemplate.convertAndSend("/topic/messages", new ChatReportResponseDto(chatMessage.getChatId(), "3회 이상 신고된 메세지입니다", MessageType.REPORT));
//            rabbitTemplate.convertAndSend(CHAT_EXCHANGE_NAME, ROUTING_KEY, new ChatReportResponseDto(chatMessage.getChatId(), "3회 이상 신고된 메세지입니다", MessageType.REPORT));
        }
        return ResponseEntity.ok().build();
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
