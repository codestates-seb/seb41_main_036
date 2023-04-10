package com.main36.pikcha.domain.chat.mapper;

import com.main36.pikcha.domain.chat.dto.ChatPostDto;
import com.main36.pikcha.domain.chat.dto.ChatReplyDto;
import com.main36.pikcha.domain.chat.dto.ChatResponseDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.chat.service.ChatService;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class ChatMapperSecond {
    private final ChatService chatService;
    public ChatMessage postDtoToChatMessage(ChatPostDto postDto, Member member) {
        return ChatMessage.builder()
                .memberId(member.getMemberId())
                .targetId(null)
                .targetContent(null)
                .targetPicture(null)
                .targetUsername(null)
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(postDto.getType())
                .content(postDto.getContent())
                .verifyKey(postDto.getVerifyKey())
                .build();
    }
    public ChatMessage replyDtoToChatMessage(ChatReplyDto replyDto, Member member) {
        ChatMessage targetMessage = chatService.findVerifiedChatMessage(replyDto.getTargetId());
        return ChatMessage.builder()
                .memberId(member.getMemberId())
                .targetId(targetMessage.getChatId())
                .targetContent(targetMessage.getContent())
                .targetPicture(targetMessage.getPicture())
                .targetUsername(targetMessage.getUsername())
                .picture(member.getPicture())
                .username(member.getUsername())
                .type(replyDto.getType())
                .content(replyDto.getContent())
                .verifyKey(replyDto.getVerifyKey())
                .build();
    }

    public ChatResponseDto chatMessageToResponseDto(ChatMessage chatMessage){
        return ChatResponseDto.builder()
                .chatId(chatMessage.getChatId())
                .memberId(chatMessage.getMemberId())
                .targetId(chatMessage.getTargetId())
                .targetContent(chatMessage.getTargetContent())
                .targetPicture(chatMessage.getTargetPicture())
                .targetUsername(chatMessage.getTargetUsername())
                .picture(chatMessage.getPicture())
                .username(chatMessage.getUsername())
                .createdAt(chatMessage.getCreatedAt())
                .content(chatMessage.getContent())
                .verifyKey(chatMessage.getVerifyKey())
                .type(chatMessage.getType())
                .build();

    }
    public List<ChatResponseDto> chatMessagesToResponseDtos(List<ChatMessage> chatMessageList){
        return chatMessageList.stream().map(this::chatMessageToResponseDto).collect(Collectors.toList());
    }
}
