package com.main36.pikcha.domain.connection.entity;

import com.main36.pikcha.global.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Connection extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long connectionId;
    @Setter
    private Long memberId;
    @Setter
    private String username;
    @Setter
    private String sessionId;

    public Connection(Long memberId, String username, String sessionId) {
        this.memberId = memberId;
        this.username = username;
        this.sessionId = sessionId;
    }
}
