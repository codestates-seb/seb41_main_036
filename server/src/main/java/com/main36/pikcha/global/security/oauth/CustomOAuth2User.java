package com.main36.pikcha.global.security.oauth;

import lombok.AllArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;

@ToString
@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User, Serializable {

    private Long memberId;

    private Map<String, Object> attributes;

    private String attributeKey;

//    public static CustomOAuth2User of(Long memberId, OAuth2Attribut)

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return null;
    }

    public Long getMemberId() {
        return this.memberId;
    }
}
