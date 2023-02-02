package com.main36.pikcha.domain.member.entity;

public enum Authority {
    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN");
    private final String key;

    Authority(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
