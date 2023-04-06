package com.main36.pikcha.domain.chat.mapper;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.member.entity.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ChatMapper {

    default ChatMessage postDtoToChatMessage(ChatPostDto postDto, Member member) {
        return ChatMessage.builder()
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(postDto.getType())
                .content(postDto.getContent())
                .verifyKey(postDto.getVerifyKey())
                .build();
    }

    ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage);
}
