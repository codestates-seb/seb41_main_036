package com.main36.pikcha.domain.post.entity;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.like.entity.PostLikes;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.image.entity.PostImage;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor/*(access = AccessLevel.PROTECTED)*/
@AllArgsConstructor
@Builder
@Entity
@Setter
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(length = 30, name = "post_title", nullable = false)
    private String postTitle;

    @Column(name = "views", nullable = false, columnDefinition = "integer default 0")
    private int views;

    @Column(name = "likes", nullable = false, columnDefinition = "integer default 0")
    private int likes;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "post_id")
    private List<PostImage> postImages = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.PERSIST,  CascadeType.REMOVE}, orphanRemoval = true)
    @JoinColumn(name = "post_id")
    private List<HashTag> hashTags = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST,  CascadeType.REMOVE}, orphanRemoval = true)
//    @JoinColumn(name = "post_id")
    private List<PostLikes> postLikes = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "contents", joinColumns = @JoinColumn(name= "post_id"))
    @OrderColumn
    @Column(name = "post_contents")
    private List<String> postContents = new ArrayList<>();
}
