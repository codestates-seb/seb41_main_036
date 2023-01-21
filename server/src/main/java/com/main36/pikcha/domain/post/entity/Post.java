package com.main36.pikcha.domain.post.entity;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Setter
    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Setter
    @Lob
    @Column(name = "post_content")
    private String postContent;

    @Setter
    @Column(name = "hash_tag_content")
    private String hashTagContent;

    @Setter
    @Column(name = "views", nullable = false, columnDefinition = "integer default 0")
    private int views;


    @Setter
    @Column(name = "likes", columnDefinition = "integer default 0", nullable = false )
    private int likes;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

}
