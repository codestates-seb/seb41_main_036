package com.main36.pikcha.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // 메시지 브로커가 처리하는 메시지의 경로의 접두사 설정
        registry.enableSimpleBroker("/queue", "/topic");

        // 클라이언트에서 서버로 전송된 메시지를 처리하는 경로의 접두사 설정
        registry.setApplicationDestinationPrefixes("/app");

        //메시지 브로커를 사용하려면, enableStompBrokerRelay 메서드를 사용하여 구성할 수 있습니다.
//        registry.enableStompBrokerRelay()

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
            // WebSocket 전용 엔드포인트 추가
            registry.addEndpoint("/stomp-websocket")
                    .setAllowedOrigins("*");

            // SockJS를 사용한 엔드포인트 추가
            registry.addEndpoint("/stomp-websocket-sockjs")
                    .setAllowedOrigins("*")
                    .withSockJS();
        }

//                .setAllowedOrigins("http://localhost:8080",
//                        "http://localhost:3000",
////                        "http://pikcha36.o-r.kr:8080",
////                        "https://pikcha36.o-r.kr:8080",
////                        "http://pikcha36.o-r.kr:8080",
////                        "https://pikcha36.o-r.kr",
//                        "chrome-extension://cbcbkhdmedgianpaifchdaddpnmgnknn/index.html")
        // ws://localhost:8080/stomp-websocket
}

