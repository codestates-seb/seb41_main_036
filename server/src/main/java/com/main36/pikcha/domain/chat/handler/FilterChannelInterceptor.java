package com.main36.pikcha.domain.chat.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Slf4j
public class FilterChannelInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("full message: {}",  message);
        log.info("auth: {}", headerAccessor.getNativeHeader("Authorization"));
//        log.info("class name: {}", headerAccessor.getHeader("nativeHeaders").getClass()); -> 작동방식 공부!
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            log.info("msg: " + "connect!");
        }
        //throw new MessagingException("no permission! ");
        return message;
    }
}
