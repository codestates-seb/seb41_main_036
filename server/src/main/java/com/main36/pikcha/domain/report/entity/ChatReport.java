package com.main36.pikcha.domain.report.entity;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatReportId;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "chat_id")
    private ChatMessage chatMessage;

    public ChatReport(Member member, ChatMessage chatMessage) {
        this.member = member;
        this.chatMessage = chatMessage;
    }
}
