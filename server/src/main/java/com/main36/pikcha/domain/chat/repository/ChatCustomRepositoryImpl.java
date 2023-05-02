package com.main36.pikcha.domain.chat.repository;

import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.main36.pikcha.domain.chat.entity.QChatMessage.chatMessage;


@Repository
@RequiredArgsConstructor
public class ChatCustomRepositoryImpl implements ChatCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public Slice<ChatMessage> findMessageByRange(Long gte, Long lte, Pageable pageable) {
        List<ChatMessage> contents = jpaQueryFactory.select(chatMessage)
                .from(chatMessage)
                .where(chatMessage.chatId.between(gte-1, lte-1))
                .orderBy(chatMessage.chatId.asc())
                .limit(pageable.getPageSize()+1)
                .fetch();
        return checkLastPage(pageable, contents);
    }

    private SliceImpl<ChatMessage> checkLastPage(Pageable pageable, List<ChatMessage> contents) {
        boolean hasNext = contents.size() > pageable.getPageSize();
        if(hasNext) contents.remove(contents.size()-1);
        // 조회한 데이터의 사이즈가 더 크다 == 받은 사이즈보다 더 많다.
        return new SliceImpl<>(contents, pageable, hasNext);
    }
}
