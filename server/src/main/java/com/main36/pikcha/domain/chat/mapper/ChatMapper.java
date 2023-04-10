package com.main36.pikcha.domain.chat.mapper;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.ZoneId;
import java.util.List;


@Mapper(componentModel = "spring")
public interface ChatMapper {


    default ChatMessage postDtoToChatMessage(ChatPostDto postDto, Member member) {
        return ChatMessage.builder()
                .memberId(member.getMemberId())
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(postDto.getType())
                .content(postDto.getContent())
                .verifyKey(postDto.getVerifyKey())
                .build();
    }
    // 1970년 기준 밀리초 계산해보기
    /*@Mapping(target = "createdAt", expression = "java(chatMessage.getCreatedAt().atZone(zoneId).toEpochSecond())")
    ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage, ZoneId zoneId);*/

    ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage);

    List<ChatResponseDto> chatMessagesToResponseDtos(List<ChatMessage> chatMessageList);

}
