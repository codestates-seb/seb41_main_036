package com.main36.pikcha.domain.comment.entity;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.global.audit.Auditable;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.utils.CommentStatusConverter;
import lombok.*;
import org.springframework.batch.item.validator.SpringValidator;

import javax.persistence.*;
import java.net.http.HttpClient;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Lob
    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Convert(converter = CommentStatusConverter.class)
    private CommentStatus status = CommentStatus.Alive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent")
    private Comment parent;

    public void updateParent(Comment parent){
        this.parent = parent;
        parent.getChildren().add(this);
    }

    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "parent", orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    public List<Comment> getChildren(){
        return this.children;
    }

    public void changeStatus(CommentStatus commentStatus) {
        this.status = commentStatus;
    }

    @Getter
    public enum CommentStatus {
        Alive("생존", "1"),
        Dead("사망", "2");

        private String status;
        private String code;

        CommentStatus(String status, String code) {
            this.status = status;
            this.code = code;
        }

        public static CommentStatus ofCode(String code) {
            return Arrays.stream(CommentStatus.values())
                    .filter(v-> v.getCode().equals(code))
                    .findAny()
                    .orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_STATUS_INVALID));
        }
    }
}
