package com.main36.picha.domain.member.dto;


import com.main36.picha.global.audit.Auditable;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Builder
public class SignUpResponseDto {

    private String email;

    private String password;

    private String phoneNumber;

    private String address;

    private String username;

    private LocalDateTime createdAt;

}
