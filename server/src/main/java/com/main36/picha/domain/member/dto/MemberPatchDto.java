package com.main36.picha.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import net.bytebuddy.asm.Advice;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Data
@Builder
public class MemberPatchDto {

    private long memberId;

    @NotBlank(message = "not allowed null values and spaces.")
    private String username;

    private String phoneNumber;

    private String address;

//    @NotBlank(message = "not allowed null values and spaces.")
//    @Email(message = "please match the email format.")
//    private String email;

//    @NotBlank(message = "not allowed null values and spaces.")
////    @Pattern(message = "'숫자', '문자' 무조건 1개 이상, '최소 8자에서 최대 20자' 허용, !@#$%^&* 특수문자만 허용",
////            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$")
//    private String password;





}
