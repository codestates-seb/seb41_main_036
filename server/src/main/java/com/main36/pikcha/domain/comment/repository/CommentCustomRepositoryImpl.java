package com.main36.pikcha.domain.comment.repository;

import com.main36.pikcha.domain.comment.entity.Comment;
import com.main36.pikcha.domain.post.entity.Post;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.main36.pikcha.domain.comment.entity.QComment.comment;

@Repository
public class CommentCustomRepositoryImpl implements CommentCustomRepository{

    private JPAQueryFactory jpaQueryFactory;


    public CommentCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Page<Comment> findCommentByPost(Post post, Pageable pageable) {
        List<Comment> commentList = findCommentList(post, pageable);

        JPAQuery<Long> countQuery = getCount(post);

        return PageableExecutionUtils.getPage(commentList, pageable, ()-> countQuery.fetchOne());
    }

    @Override
    public List<Comment> findCommentByPost(Post post) {
        return jpaQueryFactory.selectFrom(comment)
                .leftJoin(comment.parent)
                .fetchJoin()
                .where(comment.post.postId.eq(post.getPostId()))
                .orderBy(comment.parent.commentId.asc().nullsFirst(), comment.createdAt.asc())
                .fetch();
    }

    private JPAQuery<Long> getCount(Post post) {
        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(comment.count())
                .from(comment)
                .where(comment.post.postId.eq(post.getPostId()));

        return countQuery;
    }

    private List<Comment> findCommentList(Post post, Pageable pageable){
        return jpaQueryFactory.selectFrom(comment)
                .leftJoin(comment.parent)
                .fetchJoin()
                .where(comment.post.postId.eq(post.getPostId()))
                .orderBy(comment.parent.commentId.asc().nullsFirst(), comment.createdAt.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
