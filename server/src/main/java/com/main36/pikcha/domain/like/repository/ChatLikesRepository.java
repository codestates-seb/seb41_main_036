package com.main36.pikcha.domain.like.repository;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.like.entity.AttractionLikes;
import com.main36.pikcha.domain.like.entity.ChatLikes;
import com.main36.pikcha.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatLikesRepository extends JpaRepository<ChatLikes, Long> {
    Optional<ChatLikes> findByMemberAndChatMessage(Member member, ChatMessage chatMessage);

    @Query(value = "select c from ChatLikes c where c.member.memberId = :memberId and c.chatMessage.chatId = :chatId")
    Optional<ChatLikes> findByMemberIdAndChatId(long memberId, long chatId);

}
