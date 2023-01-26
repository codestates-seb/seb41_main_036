package com.main36.pikcha.domain.like.entity;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AttractionLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionLikesId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @Builder
    public AttractionLikes(Member member, Attraction attraction) {
        this.member = member;
        this.attraction = attraction;
    }
}
