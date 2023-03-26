package com.main36.pikcha.domain.chat.service;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    @Autowired
    private RedisTemplate<String, ChatMessage> redisTemplate;

    private static final String MESSAGES_KEY = "messages";

    public void saveMessage(ChatMessage message) {
        redisTemplate.opsForList().rightPush(MESSAGES_KEY, message);
    }

    public List<ChatMessage> searchMessages(String keyword) {
        List<ChatMessage> allMessages = redisTemplate.opsForList().range(MESSAGES_KEY, 0, -1);
        return allMessages.stream()
                .filter(message -> message.getContent().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }


}
