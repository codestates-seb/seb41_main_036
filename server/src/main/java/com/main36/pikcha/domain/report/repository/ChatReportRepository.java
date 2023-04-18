package com.main36.pikcha.domain.report.repository;


import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.report.entity.ChatReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatReportRepository extends JpaRepository<ChatReport, Long> {
    Optional<ChatReport> findByMemberAndChatMessage(Member member, ChatMessage chatMessage);

    @Query(value = "select c from ChatReport c where c.member.memberId = :memberId and c.chatMessage.chatId = :chatId")
    Optional<ChatReport> findByMemberIdAndChatId(long memberId, long chatId);
}
