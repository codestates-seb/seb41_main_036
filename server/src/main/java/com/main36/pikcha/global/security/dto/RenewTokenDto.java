package com.main36.pikcha.global.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RenewTokenDto {

    private Long memberId;
    private String email;
    private String accessToken;
    private Long accessTokenExpiresIn;
}
