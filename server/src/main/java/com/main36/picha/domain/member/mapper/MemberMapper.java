package com.main36.picha.domain.member.mapper;

import com.main36.picha.domain.member.dto.*;
import com.main36.picha.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.domain.Auditable;
import org.springframework.stereotype.Component;



@Mapper(componentModel = "spring")
public interface MemberMapper  {

    @Mapping(target = "point", constant = "0")
    @Mapping(target = "memberTitle", constant = "")
    @Mapping(target = "picture", constant = "")
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    SignUpResponseDto memberToSignUpResponseDto(Member member);

    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    ProfileHomeDto memberToProfileHomeDto(Member member);

    @Mapping(target = "password", constant = "")
    @Mapping(target = "phoneNumber", constant = "")
    @Mapping(target = "address", constant = "")
    @Mapping(target = "point", constant = "0")
    @Mapping(target = "memberTitle", constant = "")
    Member oauthMemberDtoToMember(OauthMemberDto oauthMemberDto);

}
