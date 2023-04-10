package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRepository chatRepository;

    // 1. 채팅 저장하기
    public ChatMessage createMessage(ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }

    // 2. 처음 채팅방 들어왔을 때 채팅내역 불러오기 (마지막 id부터 **개 불러오기) -
    public List<ChatMessage> getInitialMessages(){
        return chatRepository.findTop3ByOrderByChatIdDesc();
    }

    // 3. 커서 위치 올리면 마지막 id 이후로로 채팅 내역 "더 **개" 불러오기
    public List<ChatMessage> getMoreMessages(Long lastChatId){
        return chatRepository.findTop3ByChatIdLessThanOrderByChatIdDesc(lastChatId);
    }

    // 4. 채팅 날짜로 검색하기
    public List<ChatMessage> getMessagesBetween(String content, String createdYearAndMonth) {

        // ex ) 202204 -> year = 2022 month = 04
        int year = Integer.parseInt(createdYearAndMonth.substring(0, 4));
        int month = Integer.parseInt(createdYearAndMonth.substring(4));

        // 원하는 달의 말일이 몇 일인지 구하기
        Calendar cal = Calendar.getInstance();
        cal.set(year, month-1, 1);
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);

        LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime endDateTime = LocalDateTime.of(year, month, lastDay, 23, 59, 59);
        return chatRepository.findChatMessagesByContentContainingIgnoreCaseAndAndCreatedAtBetweenOrderByCreatedAtAsc(content, startDateTime, endDateTime);
    }

    // 5. 답장 -> 댓글 targetId = null -> targetId

    // 5. 단일채팅 삭제하기( 삭제 모드 -> 여러개 삭제 )
    public void deleteMessages(Long chatId){
        try {
            chatRepository.deleteById(chatId);

        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.CHAT_CANNOT_BE_DELETED);
        }

        // 프론트 삭제 요청 -> 서버에서 NO_CONTENT -> 삭제된 메시지로 변경?
        // 프론트 삭제 요청 -> 서버에서 CHAT_CANNOT_BE_DELETED ->
        // 새로운 사람은 줄 필요가 없음.
        // 미리 채팅을 켜놨던사람들은 "삭제된 메시지입니다"라고 보임
        // 통신 ws
    }

    // 6. 채팅 삭제하기( 삭제 모드 -> 여러개 삭제 )
    public List<Long> deleteMessages(List<Long> ids){
        try {
            ids.stream().forEach(id -> chatRepository.deleteById(id));
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.CHAT_CANNOT_BE_DELETED);
        }
        return ids;
        // 프론트 삭제 요청 -> 서버에서 NO_CONTENT -> 삭제된 메시지로 변경?
        // 프론트 삭제 요청 -> 서버에서 CHAT_CANNOT_BE_DELETED ->
        // 새로운 사람은 줄 필요가 없음.
        // 미리 채팅을 켜놨던사람들은 "삭제된 메시지입니다"라고 보임
        // 통신 ws
    }

    public ChatMessage findVerifiedChatMessage(Long messageId) {

        return chatRepository.findById(messageId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.CHAT_NOT_FOUND));
    }

//    LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0, 0);
    //LocalDateTime endDateTime = LocalDateTime.of(year, month, 31, 23, 59, 59);
//    LocalDateTime startDateTime = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
//    LocalDateTime endDateTime = LocalDateTime.of(year, Month.DECEMBER, 31, 23, 59, 59);
}
