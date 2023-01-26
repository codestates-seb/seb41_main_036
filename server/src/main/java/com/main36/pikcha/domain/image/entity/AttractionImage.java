package com.main36.pikcha.domain.image.entity;

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
