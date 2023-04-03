package com.main36.pikcha.domain.chat.entity;

import com.main36.pikcha.global.audit.Auditable;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    private String content;
    private String sender;
    private MessageType type;
    @Getter
    public enum MessageType {
        JOIN ,CHAT, LEAVE
    }
}
