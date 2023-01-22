package com.main36.pikcha.domain.post.entity;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post_image.entity.PostImage;
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
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Setter
    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Setter
    @ElementCollection
    @CollectionTable(name = "contents", joinColumns = @JoinColumn(name= "post_id"))
    @OrderColumn
    @Column(name = "post_contents")
    private List<String> postContents = new ArrayList<>();

    @Setter
    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST)
    private List<HashTag> hashTags = new ArrayList<>();

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

    @Setter
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PostImage> postImages = new ArrayList<>();

}
