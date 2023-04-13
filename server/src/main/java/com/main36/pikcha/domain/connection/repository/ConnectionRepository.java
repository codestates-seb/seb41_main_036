package com.main36.pikcha.domain.connection.repository;


import com.main36.pikcha.domain.connection.entity.Connection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    void deleteConnectionByMemberId(Long memberId);
    Optional<Connection> findTopBySessionId(String sessionId);
}
