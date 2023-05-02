/*
package com.main36.pikcha.domain.chat.mapper;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatReplyDto;
import com.main36.pikcha.domain.chat.dto.ChatReplyResponseDto;
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
                .targetId(null)
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(postDto.getType())
                .content(postDto.getContent())
                .verifyKey(postDto.getVerifyKey())
                .build();
    }

    default ChatMessage replyDtoToChatMessage(ChatReplyDto replyDto, Member member) {
        return ChatMessage.builder()
                .memberId(member.getMemberId())
                .targetId(replyDto.getTargetId())
                .targetContent()
                .targetPicture()
                .targetUsername()
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(replyDto.getType())
                .content(replyDto.getContent())
                .verifyKey(replyDto.getVerifyKey())
                .build();
    }


    default ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage){
        return ChatResponseDto.builder()
                .chatId(chatMessage.getChatId())
                .memberId(chatMessage.getMemberId())
                .targetId(chatMessage.getTargetId() == null? null : chatMessage.getTargetId())
                .targetContent(chatMessage.getTargetContent())
                .targetPicture()
                .targetUsername()
                .picture(chatMessage.getPicture())
                .username(chatMessage.getUsername())
                .createdAt(chatMessage.getCreatedAt())
                .content(chatMessage.getContent())
                .verifyKey(chatMessage.getVerifyKey())
                .type(chatMessage.getType())
                .build();
    }

    List<ChatResponseDto> chatMessagesToResponseDtos(List<ChatMessage> chatMessageList);

}
*/
