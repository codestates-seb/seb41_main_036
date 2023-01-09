package com.main36.picha.domain.save.entity;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Save {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long saveId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

}
