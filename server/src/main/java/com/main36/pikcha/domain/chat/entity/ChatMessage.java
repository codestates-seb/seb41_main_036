package com.main36.pikcha.domain.chat.entity;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ChatMessage extends Auditable { // JPA 삭제 constraint
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId; //
    private Long memberId; //
//    private Long targetChatId;
//    private Long targetMemberId;
//    private String targetContent;
//    private String targetPicture;
//    private String targetUsername;
    @OneToOne
    @JoinColumn(name = "target_id")
    private ChatMessage targetMessage;
    private String picture;
    private String username; //
    private MessageType type;
    private String content; //
    private long likes;
    private long reported;
    private String verifyKey;
    public enum MessageType {
        JOIN, LEAVE, CHAT, REPLY, DELETE, ERROR, LIKES, REPORT
    }
}
