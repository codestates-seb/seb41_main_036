package com.main36.picha.domain.attraction.entity;

import com.main36.picha.global.audit.Auditable;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Attraction extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionId;

    @Column(name = "attraction_name", nullable = false)
    private String attractionName;

    @Column(name = "attraction_description", nullable = false)
    private String attractionDescription;

    @Column(name = "attraction_address", nullable = false)
    private String attractionAddress;

    @Column(name = "attraction_image")
    private String attractionImage;

    @Column(name = "province", nullable = false)
    private String province;
}
