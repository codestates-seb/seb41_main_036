package com.main36.picha.domain.member.mapper;

import com.main36.picha.domain.member.dto.MemberPatchDto;
import com.main36.picha.domain.member.dto.MemberPostDto;
import com.main36.picha.domain.member.dto.ProfileHomeDto;
import com.main36.picha.domain.member.dto.SignUpResponseDto;
import com.main36.picha.domain.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-10T10:34:40+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.username( memberPostDto.getUsername() );
        member.email( memberPostDto.getEmail() );
        member.password( memberPostDto.getPassword() );
        member.phoneNumber( memberPostDto.getPhoneNumber() );
        member.address( memberPostDto.getAddress() );

        member.point( 0 );
        member.memberTitle( "" );
        member.aboutMe( "" );
        member.picture( "" );

        return member.build();
    }

    @Override
    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.memberId( memberPatchDto.getMemberId() );
        member.username( memberPatchDto.getUsername() );
        member.phoneNumber( memberPatchDto.getPhoneNumber() );
        member.address( memberPatchDto.getAddress() );

        return member.build();
    }

    @Override
    public SignUpResponseDto memberToSignUpResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        SignUpResponseDto.SignUpResponseDtoBuilder signUpResponseDto = SignUpResponseDto.builder();

        signUpResponseDto.email( member.getEmail() );
        signUpResponseDto.password( member.getPassword() );
        signUpResponseDto.phoneNumber( member.getPhoneNumber() );
        signUpResponseDto.address( member.getAddress() );
        signUpResponseDto.username( member.getUsername() );
        signUpResponseDto.createdAt( member.getCreatedAt() );

        return signUpResponseDto.build();
    }

    @Override
    public ProfileHomeDto memberToProfileHomeDto(Member member) {
        if ( member == null ) {
            return null;
        }

        ProfileHomeDto.ProfileHomeDtoBuilder profileHomeDto = ProfileHomeDto.builder();

        if ( member.getMemberId() != null ) {
            profileHomeDto.memberId( member.getMemberId() );
        }
        profileHomeDto.username( member.getUsername() );
        profileHomeDto.memberTitle( member.getMemberTitle() );
        profileHomeDto.phoneNumber( member.getPhoneNumber() );
        profileHomeDto.address( member.getAddress() );
        profileHomeDto.picture( member.getPicture() );
        profileHomeDto.email( member.getEmail() );
        profileHomeDto.aboutMe( member.getAboutMe() );
        profileHomeDto.createdAt( member.getCreatedAt() );
        profileHomeDto.modifiedAt( member.getModifiedAt() );

        profileHomeDto.totalMyPosts( member.getPosts().size() );
        profileHomeDto.totalMySaves( member.getSaves().size() );

        return profileHomeDto.build();
    }
}
