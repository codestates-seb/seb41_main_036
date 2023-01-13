package com.main36.picha.domain.member.mapper;

import com.main36.picha.domain.member.dto.MemberPatchDto;
import com.main36.picha.domain.member.dto.MemberPostDto;
import com.main36.picha.domain.member.dto.ProfileHomeDto;
import com.main36.picha.domain.member.dto.SignUpResponseDto;
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

    @Mapping(target = "point", constant = "0")
    @Mapping(target = "memberTitle", constant = "")
    @Mapping(target = "aboutMe", constant = "")
    @Mapping(target = "picture", constant = "")
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    SignUpResponseDto memberToSignUpResponseDto(Member member);

    @Mapping(target = "totalMyPosts", expression = "java(member.getPosts().size())")
    @Mapping(target = "totalMySaves", expression = "java(member.getSaves().size())")
    ProfileHomeDto memberToProfileHomeDto(Member member);

    List<PostResponseDto> postListToPostResponseDtos(List<Post> posts);
}
