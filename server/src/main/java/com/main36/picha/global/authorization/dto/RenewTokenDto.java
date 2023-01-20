package com.main36.picha.global.authorization.dto;

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
