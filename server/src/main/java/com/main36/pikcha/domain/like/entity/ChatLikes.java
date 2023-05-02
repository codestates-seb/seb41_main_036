package com.main36.pikcha.domain.like.entity;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatLikesId;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "chat_id")
    private ChatMessage chatMessage;

    @Builder
    public ChatLikes(Member member, ChatMessage chatMessage) {
        this.member = member;
        this.chatMessage = chatMessage;
    }
}
