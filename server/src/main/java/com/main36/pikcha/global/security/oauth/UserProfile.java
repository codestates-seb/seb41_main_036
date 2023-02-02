package com.main36.pikcha.global.security.oauth;

import com.main36.pikcha.domain.member.entity.Authority;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Getter
public class UserProfile {
    private String oauthId;
    private String name;
    private String email;
    private String imageUrl;

    @Builder
    public UserProfile(String oauthId, String name, String email, String imageUrl) {
        this.oauthId = oauthId;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    public Member toMember(String oauthId, String name, String email, String image, List<String> roles, PasswordEncoder passwordEncoder) {
        return new Member(oauthId, name, email, imageUrl, roles, passwordEncoder);
    }

}