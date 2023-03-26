package com.main36.pikcha.domain.chat.controller;


import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private ChatService chatService;

    @GetMapping("/search")
    public List<ChatMessage> searchMessages(@RequestParam String keyword) {
        return chatService.searchMessages(keyword);
    }
}
