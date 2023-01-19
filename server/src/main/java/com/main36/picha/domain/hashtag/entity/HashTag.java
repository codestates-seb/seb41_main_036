package com.main36.picha.domain.hashtag.entity;


import com.main36.picha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class HashTag extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hashTagId;

    @Column(name = "hash_tag_name")
    private String HashTagContent;

}