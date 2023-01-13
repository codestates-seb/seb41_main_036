package com.main36.picha.domain.attraction_file.entity;

import com.main36.picha.domain.attraction.entity.Attraction;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
public class AttractionImage{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionImageId;

    @Column(nullable = false)
    private String attractionImageFileName;

    @Column(nullable = false)
    private String attractionImageFileUrl;
}
