package com.main36.picha.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String cellphoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int point;

    @Column(nullable = false)
    private String memberTitle;

    @Column(nullable = false)
    private String aboutMe;

    @Column(nullable = false)
    private String websiteLink;

}
