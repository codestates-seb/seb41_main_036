package com.main36.picha.domain.refreshToken.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


import com.main36.picha.global.audit.Auditable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken extends Auditable {
    @Id
    @Column(name = "rt_key")
    // member id 값이 들어감
    private Long key;

    @Column(name = "rt_value")
    // refresh token (String)
    private String value;

    @Builder
    public RefreshToken(Long key, String value) {
        this.key = key;
        this.value = value;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }

}
