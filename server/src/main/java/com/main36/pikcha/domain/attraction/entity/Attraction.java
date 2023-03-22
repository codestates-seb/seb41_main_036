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

    @Column(length = 25, name = "attraction_name", nullable = false)
    private String attractionName;

    @Lob
    @Column(name = "attraction_description", nullable = false)
    private String attractionDescription;

    @Column(length = 50, name = "attraction_address", nullable = false)
    private String attractionAddress;

    @Column(name = "likes", nullable = false)
    @ColumnDefault("0")
    private Long likes;

    @Column(name = "saves", nullable = false)
    @ColumnDefault("0")
    private Long saves;

    @Column(name = "num_of_posts")
    @ColumnDefault("0")
    private Long numOfPosts;

    @Lob
    @Column(name = "fixed_image")
    private String fixedImage;

    @Column(length = 10, name = "province", nullable = false)
    private String province;

/*    @Column(name = "rank")
    @ColumnDefault("100")
    private Long rank;
    @Column(name = "rank_change", nullable = false)
    @ColumnDefault("0")
    private Long rankChange;*/

    @OneToMany(mappedBy = "attraction", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();
}
