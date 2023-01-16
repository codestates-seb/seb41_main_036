package com.main36.picha.domain.member.mapper;

import com.main36.picha.domain.member.dto.*;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.post.dto.PostResponseDto;
import com.main36.picha.domain.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.domain.Auditable;
import org.springframework.stereotype.Component;

import java.util.List;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper  {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    SignUpResponseDto memberToSignUpResponseDto(Member member);

    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    ProfileHomeDto memberToProfileHomeDto(Member member);

    List<PostResponseDto> postListToPostResponseDtos(List<Post> posts);
    @Mapping(target = "password", constant = "")
    @Mapping(target = "phoneNumber", constant = "")
    @Mapping(target = "address", constant = "")

    @Mapping(target = "memberTitle", constant = "")
    Member oauthMemberDtoToMember(OauthMemberDto oauthMemberDto);

}
