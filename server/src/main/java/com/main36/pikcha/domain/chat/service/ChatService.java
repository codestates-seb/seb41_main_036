package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatCustomRepositoryImpl;
import com.main36.pikcha.domain.chat.repository.ChatRepository;
import com.main36.pikcha.domain.like.entity.AttractionLikes;
import com.main36.pikcha.domain.like.entity.ChatLikes;
import com.main36.pikcha.domain.like.repository.ChatLikesRepository;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.report.entity.ChatReport;
import com.main36.pikcha.domain.report.repository.ChatReportRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatLikesRepository chatLikesRepository;
    private final ChatReportRepository reportRepository;
    private final ChatCustomRepositoryImpl chatCustomRepository;
    private static final int PAGE_SIZE = 20;

    // 1. 채팅 저장하기
    public ChatMessage createMessage(ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }

    // 2. 처음 채팅방 들어왔을 때 채팅내역 불러오기 (마지막 id부터 **개 불러오기) -
    public List<ChatMessage> getInitialMessages(){
        return chatRepository.findTop20ByOrderByChatIdDesc();
    }

    // 3-1. id 이전 채팅내역 20개 불러오기
    public List<ChatMessage> getMoreMessagesLessThanEqual(Long lte){
        return chatRepository.findTop20ByChatIdLessThanOrderByChatIdDesc(lte);
    }

    public List<ChatMessage> getMoreMessagesLessThan(Long lte){
        return chatRepository.findTop20ByChatIdLessThanOrderByChatIdDesc(lte);
    }

    // 3-2.id 이후로 채팅내역 20개 불러오기
    public List<ChatMessage> getMoreMessagesGreaterThanEqual(Long gte){
        return chatRepository.findTop20ByChatIdGreaterThanEqualOrderByChatIdDesc(gte);
    }

    // 3-3. 두 id 사이의 채팅내역 20개 불러오기
//    public List<ChatMessage> getMoreMessagesGreaterThanEqualLessThanEqual(Long gte, Long lte){
//        return chatRepository.findTop20ByChatIdGreaterThanEqualAndChatIdLessThanEqualOrderByChatIdAsc(gte, lte);
//    }

    public Slice<ChatMessage> getMoreMessagesGreaterThanEqualLessThanEqual(Long gte, Long lte){
        return chatCustomRepository.findMessageByRange(gte, lte, PageRequest.ofSize(PAGE_SIZE));
    }

    public Long numOfMessagesOfRange(Long gte, Long lte) {
        return chatRepository.countTop20ByChatIdGreaterThanEqualAndChatIdLessThanEqual(gte, lte);
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
        return chatRepository.findChatMessagesByContentContainingIgnoreCaseAndCreatedAtBetweenOrderByCreatedAtAsc(content, startDateTime, endDateTime);
    }

    // 5. 답장 -> 댓글 targetId = null -> targetId
    // 답장은 서비스에서 구현할 부분 없음!

    // 6. 채팅 삭제하기( 삭제 모드 -> 여러개 삭제 )
    // 현재는 "삭제된 메세지"로 내용을 바꾸고 type을 "삭제"로 변경함
    public List<Long> deleteMessages(List<Long> ids){
        try {
//            ids.stream().forEach(id -> chatRepository.deleteById(id));
            for(Long id : ids) {
                ChatMessage verifiedChatMessage = findVerifiedChatMessage(id);
                verifiedChatMessage.setContent("삭제된 메세지입니다");
                verifiedChatMessage.setType(ChatMessage.MessageType.DELETE);
                chatRepository.save(verifiedChatMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.CHAT_CANNOT_BE_DELETED);
        }
        return ids;
    }

    // 7. 채팅 좋아요
    public boolean voteChat(Member member, ChatMessage chatMessage){
        // 좋아요를 누른적이 있나?
        Optional<ChatLikes> likes = chatLikesRepository.findByMemberAndChatMessage(member, chatMessage);

        // 좋아요를 이미 눌렀다면
        if(likes.isPresent()){
            // 좋아요 데이터를 삭제하고
            chatLikesRepository.delete(likes.get());
            // 명소의 likes를 하나 감소시킨다
            chatMessage.setLikes(chatMessage.getLikes()-1);
            // 지금은 좋아요를 누르지 않은 상태라는것을 반환한다.
            return false;
        }
        // 좋아요를 누르지 않았으면
        else{
            // 좋아요 데이터를 생성하고
            chatLikesRepository.save(ChatLikes.builder().chatMessage(chatMessage).member(member).build());
            // 명소의 likes를 하나 증가시킨다.
            chatMessage.setLikes(chatMessage.getLikes()+1);
            // 지금은 좋아요를 누른 상태라는것을 반환한다.
            return true;
        }
    }
    public boolean isVoted(long memberId, long chatId){
        return chatLikesRepository.findByMemberIdAndChatId(memberId, chatId).isPresent();
    }

    // 채팅 신고하기
    public ChatMessage reportMessage(Member reporter, long reportedChatId){
        // 신고된 메세지 조회
        ChatMessage verifiedChatMessage = findVerifiedChatMessage(reportedChatId);

        // report 데이터 생성
        reportRepository.save(new ChatReport(reporter, verifiedChatMessage));

        long reported = verifiedChatMessage.getReported();
        // 2회 신고 누적인 경우
        if(verifiedChatMessage.getReported() == 2) {
            verifiedChatMessage.setContent("3회 이상 신고된 메세지입니다");
            verifiedChatMessage.setType(ChatMessage.MessageType.REPORT);
        }
        verifiedChatMessage.setReported(reported+1);
        return chatRepository.save(verifiedChatMessage);
    }
    public boolean isReported(long memberId, long chatId){
        return reportRepository.findByMemberIdAndChatId(memberId, chatId).isPresent();
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
