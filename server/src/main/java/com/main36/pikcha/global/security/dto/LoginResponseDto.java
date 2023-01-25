package com.main36.pikcha.global.security.dto;

import com.main36.pikcha.global.security.userdetails.AuthMember;
import lombok.Builder;
import lombok.Data;

@Data
public class LoginResponseDto {

    private Long memberId;
    private String email;
    private String roles;
    private String accessToken;

    private String refreshToken;
    @Builder
    public LoginResponseDto(Long memberId, String email, String roles, String accessToken) {
        this.memberId = memberId;
        this.email = email;
        this.roles = roles;
        this.accessToken = accessToken;
    }

    @Builder
    public static LoginResponseDto of(AuthMember authMember, String accessToken){
        return LoginResponseDto.builder()
                .memberId(authMember.getMemberId())
                .email(authMember.getEmail())
                .roles(authMember.getRoles().get(0))
                .accessToken(accessToken)
                .build();
    }

}
