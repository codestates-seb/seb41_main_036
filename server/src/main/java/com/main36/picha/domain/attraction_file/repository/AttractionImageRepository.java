package com.main36.picha.domain.attraction_file.repository;

import com.main36.picha.domain.attraction_file.entity.AttractionImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttractionImageRepository extends JpaRepository<AttractionImage, Long> {
    Optional<AttractionImage> findByAttractionImageFileName(String fileName);
}
