package com.main36.pikcha.domain.member.entity;

import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.save.entity.Save;
import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends Auditable {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String oauthId;
    @Column(nullable = false)
    private String username;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(name = "member_title")
    private String memberTitle;

    @Column(name = "picture")
    private String picture;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Save> saves = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String oauthId, String name, String email, String imageUrl, List<String> roles) {
        this(null, oauthId, name, email, imageUrl, roles);
    }

    public Member(Long id, String oauthId, String name, String email, String imageUrl, List<String> roles) {
        this.memberId = id;
        this.oauthId = oauthId;
        this.username = name;
        this.email = email;
        this.picture = imageUrl;
        this.roles = roles;

        this.address = "";
        this.phoneNumber = "";
        this.password = "";
    }

    public Member update(String name, String email, String imageUrl) {
        this.username = name;
        this.email = email;
        this.picture = imageUrl;
        return this;
    }
}
