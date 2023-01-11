package com.main36.picha.domain.attraction.repository;

import com.main36.picha.domain.attraction.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    Optional<Attraction> findByAttractionAddress(String address);
}
