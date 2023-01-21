package com.main36.pikcha.domain.post_hashtag.entity;


import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PostHashTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postHashTagId;

    @ManyToOne
    @JoinColumn(name = "hash_tag_id")
    private HashTag hashTag;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
