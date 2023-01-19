package com.main36.picha.global.authorization.userdetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.main36.picha.domain.member.entity.Authority;
import com.main36.picha.domain.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;


@Getter
public class AuthMember extends Member implements UserDetails {

    private  Long memberId;
    private String email;
    private String password;
    private List<String> roles;

    private AuthMember(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.roles = member.getRoles();
    }

    private AuthMember(Long memberId, String email, List<String> roles) {
        this.memberId = memberId;
        this.email = email;
        this.password = "";
        this.roles = roles;
    }

    public static AuthMember of(Member member) {
        return new AuthMember(member);
    }

    public static AuthMember of(Long id, String email, List<String> roles) {
        return new AuthMember(id, email, roles);
    }

    @Override
    public List<GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(new SimpleGrantedAuthority(roles.get(0)));
//    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
