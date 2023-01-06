package com.main36.picha.domain.location.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long locationId;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    private String locationDescription;

    @Column(nullable = false)
    private String locationAddress;

    //위치 정보

}
