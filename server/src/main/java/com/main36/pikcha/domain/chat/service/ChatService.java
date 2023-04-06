package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
//@Transactional
public class ChatService {

    private final ChatRepository chatRepository;

    // 채팅 저장하기
    public ChatMessage createMessage(ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }

    public ChatMessage updateMessage(ChatMessage chatMessage) {
        ChatMessage findMessage = findVerifiedChatMessage(chatMessage.getId());
        // 메세지만 수정가능
        Optional.ofNullable(chatMessage.getContent())
                .ifPresent(findMessage::setContent);
        return chatRepository.save(findMessage);
    }

    /* 커서기반 페이지네이션 구현*/
    // 처음 채팅방 들어왔을 때 채팅내역 불러오기 (마지막 id부터 **개 불러오기) -

    // 커서 위치 올리면 마지막 id 이후로로 채팅 내역 "더 **개" 불러오기
    public List<ChatMessage> findMessage(String content){
        return chatRepository.findChatMessageByMessageContainingIgnoreCase(content);
    }

    public Page<ChatMessage> findMessages(int page, int size){
        return chatRepository.findAll(PageRequest.of(
                page,size, Sort.by("Id").descending()
        ));
    }
    //    public ChatMessage deleteMessage(ChatMessage chatMessage)
    public ChatMessage findVerifiedChatMessage(Long messageId) {

        return chatRepository.findById(messageId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND));
    }



//    LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0, 0);
    //LocalDateTime endDateTime = LocalDateTime.of(year, month, 31, 23, 59, 59);
//    LocalDateTime startDateTime = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
//    LocalDateTime endDateTime = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
}
