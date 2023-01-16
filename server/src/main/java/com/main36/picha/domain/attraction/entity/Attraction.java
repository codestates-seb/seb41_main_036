package com.main36.picha.domain.attraction.entity;

import com.main36.picha.domain.attraction_file.entity.AttractionImage;
import com.main36.picha.global.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
//@DynamicInsert
public class Attraction extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionId;

    @Column(name = "attraction_name", nullable = false)
    private String attractionName;

    @Column(name = "likes", nullable = false)
//    @ColumnDefault("0")
    private int likes =0;
    @Lob
    @Column( name = "attraction_description", nullable = false)
    private String attractionDescription;

    @Column(name = "attraction_address", nullable = false)
    private String attractionAddress;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "attraction_image_id")
    private AttractionImage attractionImage;

//    @Column(name = "attraction_image", nullable = false)
//    private String attractionImage;
    @Column(name = "province", nullable = false)
    private String province;




}
