package com.main36.pikcha.domain.chat.mapper;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatReplyDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.dto.ChatSearchResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
@Slf4j
public class ChatMapperSecond {
    private final ChatService chatService;
    public ChatMessage postDtoToChatMessage(ChatPostDto postDto, Member member) {
        return ChatMessage.builder()
                .memberId(member.getMemberId())
                .targetMessage(null)
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(postDto.getType())
                .content(postDto.getContent())
                .likes(0L)
                .reported(0L)
                .verifyKey(postDto.getVerifyKey())
                .build();
    }
    public ChatMessage replyDtoToChatMessage(ChatReplyDto replyDto, ChatMessage target, Member member) {
        if(replyDto.getTargetId() != null) {
            return ChatMessage.builder()
                    .memberId(member.getMemberId())
                    .targetMessage(target)
                    .picture(member.getPicture())
                    .username(member.getUsername())
                    .type(replyDto.getType())
                    .content(replyDto.getContent())
                    .likes(0L)
                    .reported(0L)
                    .verifyKey(replyDto.getVerifyKey())
                    .build();
        }
        else {
            return ChatMessage.builder()
                    .memberId(member.getMemberId())
                    .targetMessage(null)
                    .picture(member.getPicture())
                    .username(member.getUsername())
                    .type(replyDto.getType())
                    .content(replyDto.getContent())
                    .likes(0L)
                    .reported(0L)
                    .verifyKey(replyDto.getVerifyKey())
                    .build();
        }

    }

    public ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage) {
            return ChatResponseDto.builder()
                    .chatId(chatMessage.getChatId())
                    .memberId(chatMessage.getMemberId())
                    .targetChatId(chatMessage.getTargetMessage() == null ? null : chatMessage.getTargetMessage().getChatId())
                    .targetMemberId(chatMessage.getTargetMessage() == null ? null : chatMessage.getTargetMessage().getMemberId())
                    .targetContent(chatMessage.getTargetMessage() == null ? null : chatMessage.getTargetMessage().getContent())
                    .targetPicture(chatMessage.getTargetMessage() == null ? null : chatMessage.getTargetMessage().getPicture())
                    .targetUsername(chatMessage.getTargetMessage() == null ? null : chatMessage.getTargetMessage().getUsername())
                    .picture(chatMessage.getPicture())
                    .username(chatMessage.getUsername())
                    .createdAt(chatMessage.getCreatedAt())
                    .content(chatMessage.getContent())
                    .likes(chatMessage.getLikes())
                    .verifyKey(chatMessage.getVerifyKey())
                    .type(chatMessage.getType())
                    .build();
    }

    public List<ChatResponseDto> chatMessagesToResponseDtos(List<ChatMessage> chatMessageList){
        return chatMessageList.stream().map(this::chatMessageToResponseDto).collect(Collectors.toList());
    }

    public ChatSearchResponseDto chatMessageToSearchResponseDto(ChatMessage chatMessage){
        return ChatSearchResponseDto.builder()
                .chatId(chatMessage.getChatId())
                .memberId(chatMessage.getMemberId())
                .picture(chatMessage.getPicture())
                .username(chatMessage.getUsername())
                .content(chatMessage.getContent())
                .createdAt(chatMessage.getCreatedAt())
                .build();
    }
    public List<ChatSearchResponseDto> chatMessagesToSearchResponseDtos(List<ChatMessage> chatMessageList){
        return chatMessageList.stream().map(this::chatMessageToSearchResponseDto).collect(Collectors.toList());
    }

}
