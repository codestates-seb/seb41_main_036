package com.main36.pikcha.domain.image.entity;

import com.main36.pikcha.domain.post.entity.Post;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

//    @ManyToOne
//    @JoinColumn(name = "post_id")
//    private Post post;
}
