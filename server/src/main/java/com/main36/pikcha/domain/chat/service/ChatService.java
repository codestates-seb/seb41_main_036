package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
//@Transactional
public class ChatService {

    private final ChatRepository chatRepository;

    // 1. 채팅 저장하기
    public ChatMessage createMessage(ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }

//    // 2. 채팅 수정하기
//    public ChatMessage updateMessage(ChatMessage chatMessage) {
//        ChatMessage findMessage = findVerifiedChatMessage(chatMessage.getId());
//        // 메세지만 수정가능
//        Optional.ofNullable(chatMessage.getContent())
//                .ifPresent(findMessage::setContent);
//        return chatRepository.save(findMessage);
//    }
//
//    // 3. 처음 채팅방 들어왔을 때 채팅내역 불러오기 (마지막 id부터 **개 불러오기) -
//    public List<ChatMessage> getInitialChats(){
//        return chatRepository.findTop10ByIdOrderByIdDesc();
//    }
//
//    // 4. 커서 위치 올리면 마지막 id 이후로로 채팅 내역 "더 **개" 불러오기
//    public List<ChatMessage> getMoreChats(Long lastMessageId){
//        return chatRepository.findTop10ByIdLessThanOrderByIdDesc(lastMessageId);
//    }
//
//    // 5. 채팅 삭제하기
////    public ChatMessage deleteMessage(ChatMessage chatMessage){
////
////    }
//    public ChatMessage findVerifiedChatMessage(Long messageId) {
//
//        return chatRepository.findById(messageId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND));
//    }/



//    LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0, 0);
    //LocalDateTime endDateTime = LocalDateTime.of(year, month, 31, 23, 59, 59);
//    LocalDateTime startDateTime = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
//    LocalDateTime endDateTime = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
}
