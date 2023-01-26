package com.main36.pikcha.domain.like.entity;


import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post.entity.Post;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class PostLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postLikesId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public PostLikes(Member member, Post post) {
        this.member = member;
        this.post = post;
    }
}
