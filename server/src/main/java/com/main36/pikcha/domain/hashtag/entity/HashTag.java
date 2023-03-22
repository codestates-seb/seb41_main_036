package com.main36.pikcha.domain.hashtag.entity;


import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor/*(access = AccessLevel.PROTECTED)*/
@AllArgsConstructor
@Entity
public class HashTag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hashTagId;
    @Setter
    @Column(length = 10, name = "hashtag_content")
    private String hashTagContent;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}