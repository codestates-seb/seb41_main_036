package com.main36.pikcha.global.security.oauth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Data
public class CustomOAuth2User implements OAuth2User, Serializable {

    private List<GrantedAuthority> authorities;
    private Map<String, Object> userAttributes;
    private String registrationId;

    @Builder
    public CustomOAuth2User(List<GrantedAuthority> authorities, Map<String, Object> userAttributes, String registrationId) {
        this.authorities = authorities;
        this.userAttributes = userAttributes;
        this.registrationId = registrationId;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return userAttributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return registrationId;
    }
}
