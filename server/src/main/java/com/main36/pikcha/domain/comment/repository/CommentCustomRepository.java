package com.main36.pikcha.domain.comment.repository;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.post.entity.Post;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import java.util.List;

import static com.main36.pikcha.domain.comment.entity.QComment.comment;

@Repository
public class CommentCustomRepository {
    private JPAQueryFactory jpaQueryFactory;

    public CommentCustomRepository(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Comment> findCommentByPost(Post post){
        return jpaQueryFactory.selectFrom(comment)
                .leftJoin(comment.parent)
                .fetchJoin()
                .where(comment.post.postId.eq(post.getPostId()))
                .orderBy(comment.parent.commentId.asc().nullsFirst(), comment.createdAt.asc())
                .fetch();
    }
}
