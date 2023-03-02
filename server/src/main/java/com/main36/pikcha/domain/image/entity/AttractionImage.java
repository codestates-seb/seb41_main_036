package com.main36.pikcha.domain.image.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter

public class AttractionImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionImageId;

    @Column(name= "attraction_image_file_name", nullable = false)
    private String attractionImageFileName;

    @Column(name = "attraction_image_url", nullable = false)
    private String attractionImageUrl;
}
