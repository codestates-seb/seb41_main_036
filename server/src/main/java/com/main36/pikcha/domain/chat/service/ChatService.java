package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

/*    // 2. 채팅 수정하기 -> 알고보니 수정은 없었다!
    public ChatMessage updateMessage(ChatMessage chatMessage) {
        ChatMessage findMessage = findVerifiedChatMessage(chatMessage.getChatId());

        if (chatMessage.getMemberId() != findMessage.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);
        }

        // 메세지만 수정가능
        Optional.ofNullable(chatMessage.getContent())
                .ifPresent(findMessage::setContent);
        return chatRepository.save(findMessage);
    }*/

//    // 3. 처음 채팅방 들어왔을 때 채팅내역 불러오기 (마지막 id부터 **개 불러오기) -
//    public List<ChatMessage> getInitialChats(){
//        return chatRepository.findTop10ByIdOrderByIdDesc();
//    }
//
//    // 4. 커서 위치 올리면 마지막 id 이후로로 채팅 내역 "더 **개" 불러오기
//    public List<ChatMessage> getMoreChats(Long lastMessageId){
//        return chatRepository.findTop10ByIdLessThanOrderByIdDesc(lastMessageId);
//    }

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
