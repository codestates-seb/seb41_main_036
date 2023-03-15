package com.main36.pikcha.domain.chat.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@NoArgsConstructor
//@Entity
public class ChatMessage {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long Id;
//    private MessageType type;
    private String sender;
    private String message;

//    public enum MessageType {
//        ENTER, TALK
//    }
}
