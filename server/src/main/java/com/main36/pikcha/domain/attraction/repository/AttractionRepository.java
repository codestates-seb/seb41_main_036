package com.main36.pikcha.domain.attraction.repository;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    Optional<Attraction> findByAttractionAddress(String address);
    Page<Attraction> findAllByProvinceIn(List<String> cities, Pageable pageable);

}
