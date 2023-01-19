package com.main36.picha.global.authorization.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LoginResponseDto {

    private Long memberId;
    private String email;
    private String password;
    private List<String> roles;

}
