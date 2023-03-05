package com.main36.pikcha.domain.member.mapper;

import com.main36.pikcha.domain.member.dto.*;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post.dto.PostResponseDto;
import com.main36.pikcha.domain.save.dto.SaveResponseDto;
import com.main36.pikcha.global.security.dto.LoginResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.stream.Collectors;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    MemberResponseDto.SignUp memberToSignUpResponseDto(Member member);

    //    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
//    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    default MemberResponseDto.Profile memberToProfileHomeDto(Member member) {
        return MemberResponseDto.Profile.builder()
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .memberTitle(member.getMemberTitle())
                .phoneNumber(member.getPhoneNumber())
                .address(member.getAddress())
                .picture(member.getPicture())
                .email(member.getEmail())
                .totalMyPosts(member.getPosts().size())
                .totalMySaves(member.getSaves().size())
                .posts(member.getPosts().stream()
                        .map(post -> {
                            return PostResponseDto.Profile.builder()
                                    .postId(post.getPostId())
                                    .postTitle(post.getPostTitle())
                                    .pictureUrl(post.getPostImages().isEmpty() ? "" : post.getPostImages().get(0).getPostImageUrl())
                                    .views(post.getViews())
                                    .likes(post.getLikes())
                                    .createdAt(post.getCreatedAt())
                                    .modifiedAt(post.getModifiedAt())
                                    .build();
                        }).collect(Collectors.toList()))
                .saves(member.getSaves().stream()
                        .map(save -> {
                            return SaveResponseDto.builder()
                                    .attractionId(save.getAttraction().getAttractionId())
                                    .attractionName(save.getAttraction().getAttractionName())
                                    .fixedImage(save.getAttraction().getFixedImage())
                                    .likes(save.getAttraction().getLikes())
                                    .saves(save.getAttraction().getSaves())
                                    .build();
                        }).collect(Collectors.toList()))
                .createdAt(member.getCreatedAt())
                .modifiedAt(member.getModifiedAt())
                .build();

    }


    @Mapping(target = "password", constant = "")
    @Mapping(target = "phoneNumber", constant = "")
    @Mapping(target = "address", constant = "")
    @Mapping(target = "memberTitle", constant = "")
    Member oauthMemberDtoToMember(MemberDto.Oauth oauthMemberDto);

    default LoginResponseDto memberToLoginResponseDto(Member member) {
        return LoginResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .roles(member.getRoles().get(0))
                .build();
    }

}
