package com.main36.picha.domain.member.mapper;

import com.main36.picha.domain.member.dto.*;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper  {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    SignUpResponseDto memberToSignUpResponseDto(Member member);

    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    ProfileHomeDto memberToProfileHomeDto(Member member);

    @Mapping(target = "password", constant = "")
    @Mapping(target = "phoneNumber", constant = "")
    @Mapping(target = "address", constant = "")
    @Mapping(target = "memberTitle", constant = "")
    Member oauthMemberDtoToMember(OauthMemberDto oauthMemberDto);

}
