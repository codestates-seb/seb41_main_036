package com.main36.pikcha.domain.image.repository;

import com.main36.pikcha.domain.image.entity.AttractionImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttractionImageRepository extends JpaRepository<AttractionImage, Long> {
    Optional<AttractionImage> findByAttractionImageFileName(String fileName);
}
