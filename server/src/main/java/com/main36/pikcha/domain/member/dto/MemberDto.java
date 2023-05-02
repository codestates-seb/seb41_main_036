package com.main36.pikcha.domain.member.dto;

import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Data
    @Builder
    public static class Post {
        @NotBlank(message = "not allowed null values and spaces.")
        @Email(message = "please match the email format.")
        private String email;
        @NotBlank(message = "not allowed null values and spaces.")
        @Pattern(message = "'숫자', '문자' 무조건 1개 이상, '최소 8자에서 최대 20자' 허용, !@#$%^&* 특수문자만 허용",
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$")
        private String password;
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phoneNumber;
        private String address;
        @NotBlank(message = "not allowed null values and spaces.")
        private String username;
    }

    @Data
    @Builder
    public static class Patch {
        private long memberId;
        @NotBlank(message = "not allowed null values and spaces.")
        private String username;
        private String phoneNumber;
        private String address;
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class Oauth {
        @Column(nullable = false)
        private String username;
        @Column(nullable = false, updatable = false, unique = true)
        private String email;
        @Column(name = "picture")
        private String picture;
    }

}
