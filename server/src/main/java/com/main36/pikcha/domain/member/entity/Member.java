package com.main36.pikcha.domain.member.entity;

import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.save.entity.Save;
import com.main36.pikcha.global.audit.Auditable;
import com.main36.pikcha.global.config.PasswordEncoderConfig;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor/*(access = AccessLevel.PROTECTED)*/
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(name = "oauth_id", updatable = false, unique = true)
    private String oauthId;

    @Column(length = 30, nullable = false)
    private String username;

    @Column(length = 30, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 80, nullable = false)
    private String password;

    @Column(length = 15, name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(length = 50, nullable = false)
    private String address;

    @Column(length = 50, name = "member_title")
    private String memberTitle;

    @Lob
    @Column(name = "picture")
    private String picture;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Save> saves = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String oauthId, String name, String email, String imageUrl, List<String> roles, PasswordEncoder passwordEncoder) {
        this(null, oauthId, name, email, imageUrl, roles, passwordEncoder);
    }

    public Member(Long id, String oauthId, String name, String email, String imageUrl, List<String> roles, PasswordEncoder passwordEncoder) {
        this.memberId = id;
        this.oauthId = oauthId;
        this.username = name;
        this.email = email;
        this.picture = imageUrl;
        this.roles = roles;
        this.address = "";
        this.phoneNumber = "";
        this.password = passwordEncoder.encode(UUID.randomUUID().toString());
    }

    public Member update(String name, String email, String imageUrl) {
        this.username = name;
        this.email = email;
        this.picture = imageUrl;
        return this;
    }
}
