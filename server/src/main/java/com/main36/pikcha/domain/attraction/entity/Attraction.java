package com.main36.pikcha.domain.attraction.entity;

import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Attraction extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attractionId;

    @Column(name = "attraction_name", nullable = false)
    private String attractionName;

    @Column(name = "likes", nullable = false)
    @ColumnDefault("0")
    private Long likes;

    @Column(name = "saves", nullable = false)
    @ColumnDefault("0")
    private Long saves;

    @Column(name = "num_of_posts")
//    @Formula("(SELECT count(1) FROM post p WHERE p.postId = attractionId)")
    @ColumnDefault("0")
    private Long numOfPosts;
    @Lob
    @Column( name = "attraction_description", nullable = false)
    private String attractionDescription;

    @Column(name = "attraction_address", nullable = false)
    private String attractionAddress;

//    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    @JoinColumn(name = "attraction_image_id")
//    private AttractionImage attractionImage;
    @Column(name = "fixed_image")
    private String fixedImage;

    @Column(name = "province", nullable = false)
    private String province;

    @OneToMany(mappedBy = "attraction", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();
}
