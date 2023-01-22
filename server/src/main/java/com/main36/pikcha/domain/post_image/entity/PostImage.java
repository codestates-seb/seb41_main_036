package com.main36.pikcha.domain.post_image.entity;

import com.main36.pikcha.domain.post.entity.Post;
import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.utility.nullability.MaybeNull;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class PostImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postImageId;

    @Column(nullable = false)
    private String postImageFileName;

    @Column(nullable = false)
    private String postImageUrl;

    @ManyToOne(fetch =  FetchType.LAZY)
    private Post post;

}
