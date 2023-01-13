package com.main36.picha.domain.post.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.comment.entity.Comment;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post extends Auditable {
    //TODO : length 지정 생각해보기
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Column(name = "post_image")
    private String postImageUrl;

    @Lob
    @Column(name = "post_content")
    private String postContent;

    @Column(name = "views")
    private int views;

    @Column(name = "likes")
    private int likes;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();


}
