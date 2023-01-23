package com.main36.pikcha.domain.member.mapper;

import com.main36.pikcha.domain.member.dto.*;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.global.security.dto.LoginResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    MemberResponseDto.SignUp memberToSignUpResponseDto(Member member);

    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    MemberResponseDto.Profile memberToProfileHomeDto(Member member);

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