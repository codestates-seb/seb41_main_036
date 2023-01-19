package com.main36.picha.global.authorization.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
//    private String grantType;
//    private String authorizationType;
//    private Long accessTokenExpiresIn;
    private String accessToken;

    private String refreshToken;
}
