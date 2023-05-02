package com.main36.pikcha.domain.chat.handler;

import com.main36.pikcha.domain.connection.entity.Connection;
import com.main36.pikcha.domain.connection.repository.ConnectionRepository;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.repository.MemberRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.security.jwt.JwtParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Slf4j
@Component
@RequiredArgsConstructor
public class FilterChannelInterceptor implements ChannelInterceptor {
    private final JwtParser jwtParser;
    private final ConnectionRepository repository;
    private final MemberRepository memberRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        String sessionId = headerAccessor.getSessionId();
        String token = "";
        log.info("full message: {}",  message);
        log.info("auth: {}", headerAccessor.getNativeHeader("Authorization"));
        // Stomp 연결 요청을 받으면
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            token = headerAccessor.getNativeHeader("Authorization").get(0);
            onConnect(token, sessionId);
        }
        //throw new MessagingException("no permission! ");
        return message;
    }
    private void onConnect(String token, String sessionId){
        log.info("msg: " + "connect!");
        // jwt 토큰에서 Bearer 를 짜르고
        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            token = token.substring(7);
        }
        // Jwt accessToken 검증한다
        jwtParser.verifyAccessToken(token);
        // 검증이 완료되면 jwt 토큰 안 이메일로 회원 정보를 받아오고
        Member user = memberRepository.findByEmail(jwtParser.getBody(token).get("sub").toString()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        // 이미 연결이 있다면 데이터 삭제
//        Optional<Connection> findConnection = repository.findByMemberId(user.getMemberId());
//        findConnection.ifPresent(repository::delete);
        // 연결 테이블에 memberid와 sessionId를 묶은 데이터를 추가한다.
        repository.save(new Connection(user.getMemberId(), user.getUsername(), sessionId));
    }

/*    private void onDisconnect(String sessionId){
        Connection connection = repository.findTopBySessionId(sessionId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CONNECTION_NOT_FOUND));
        long memberId = connection.getMemberId();
        log.info("Disconnected User Id : " + memberId);
        repository.delete(connection);
        log.info("Connection data has been deleted");
    }*/
}
