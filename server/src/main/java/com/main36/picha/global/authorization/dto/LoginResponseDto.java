package com.main36.picha.global.authorization.dto;

import com.main36.picha.global.authorization.userdetails.AuthMember;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LoginResponseDto {

    private Long memberId;
    private String email;
    private String roles;

    @Builder
    public LoginResponseDto(Long memberId, String email, String roles) {
        this.memberId = memberId;
        this.email = email;
        this.roles = roles;
    }

    public static LoginResponseDto of(AuthMember authMember){
        return LoginResponseDto.builder()
                .memberId(authMember.getMemberId())
                .email(authMember.getEmail())
                .roles(authMember.getRoles().get(0))
                .build();
    }
}
