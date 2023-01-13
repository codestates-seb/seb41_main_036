package com.main36.picha.domain.member.dto;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Builder
public class SignUpResponseDto {

    private String email;

    private String phoneNumber;

    private String address;

    private String username;

    private String picture;

    private LocalDateTime createdAt;

}
