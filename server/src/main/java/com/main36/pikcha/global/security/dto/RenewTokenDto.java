package com.main36.pikcha.global.security.dto;

import lombok.*;

import java.util.Date;

@Getter
public class RenewTokenDto {

    private Long memberId;
    private String email;
    private String accessToken;
    private long accessTokenExpiresIn;

    @Builder
    public RenewTokenDto(Long memberId, String email, String accessToken, long accessTokenExpiresIn) {
        this.memberId = memberId;
        this.email = email;
        this.accessToken = accessToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
    }
}
