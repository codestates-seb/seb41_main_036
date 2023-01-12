package com.main36.picha.global.auth.dto;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
public class LoginDto {
    private String username;
    private String password;
}
