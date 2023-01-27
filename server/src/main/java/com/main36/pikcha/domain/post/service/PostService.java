package com.main36.pikcha.domain.post.service;


import com.main36.pikcha.domain.image.service.PostImageService;
import com.main36.pikcha.domain.member.entity.Member;


import com.main36.pikcha.domain.post.entity.Post;
import com.main36.pikcha.domain.post.repository.PostRepository;
import com.main36.pikcha.domain.like.entity.PostLikes;
import com.main36.pikcha.domain.like.repository.PostLikesRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostLikesRepository postLikesRepository;
    private final PostImageService postImageService;

    public Post createPost(Post post) {
        Long numOfPostsPlusOne = post.getAttraction().getNumOfPosts() + 1;
        post.getAttraction().setNumOfPosts(numOfPostsPlusOne);

        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
/*        Post findPost = getVerifiedPostById(post);
        Optional.ofNullable(post.getPostTitle())
                .ifPresent(findPost::setPostTitle);
        Optional.ofNullable(post.getPostContents())
                .ifPresent(findPost::setPostContents);
        Optional.ofNullable(post.getHashTags())
                .ifPresent(findPost::setHashTags);*/

        return postRepository.save(post);
    }

    private Post getVerifiedPostById(Post post) {
        Optional<Post> postById = postRepository.findById(post.getPostId());

        return postById.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    public Post findPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post post = optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        post.setViews(post.getViews() + 1);

        return post;
    }

    @Transactional(readOnly = true)
    public Post findPostNoneSetView(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        return optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    public Page<Post> findAllPostsBySort(int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());

        return postRepository.findAll(pageable);
    }

    public Page<Post> findAllPostsByProvincesSort(List<String> provinces, int page, int size, String sort){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());

        return postRepository.findAllByProvinceIn(provinces, pageable);
    }

    public Page<Post> findAllPostsByAttractionId(long attractionId, int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());

        return postRepository.findAllByAttractionId(attractionId, pageable);
    }

    public List<Post> findAllPostsByAttractionIdMaps(long attractionId){
        return postRepository.findAllByAttractionId(attractionId);
    }

    public void erasePost(Post post) {
        Long numOfPostsSubtractOne = post.getAttraction().getNumOfPosts() - 1;
        post.getAttraction().setNumOfPosts(numOfPostsSubtractOne);
        postRepository.delete(post);
    }

    public boolean votePost(Member member, Post post) {
        // 좋아요를 누른적이 있나?
        Optional<PostLikes> likes = postLikesRepository.findByMemberAndPost(member, post);

        // 좋아요를 이미 눌렀다면
        if (likes.isPresent()) {
            // 좋아요 데이터를 삭제하고
            postLikesRepository.delete(likes.get());
            // post의 likes를 하나 감소시킨다
            post.setLikes(post.getLikes() - 1);
            // 지금은 좋아요를 누르지 않은 상태라는것을 반환한다.
            return false;
        }
        // 좋아요를 누르지 않았으면
        else {
            // 좋아요 데이터를 생성하고
            postLikesRepository.save(PostLikes.builder().post(post).member(member).build());
            // post의 likes를 하나 증가시킨다.
            post.setLikes(post.getLikes() + 1);
            // 지금은 좋아요를 누른 상태라는것을 반환한다.
            return true;
        }
    }
    public boolean isVoted(long memberId, long postId) {
        return postLikesRepository.findByMemberIdAndPostId(memberId, postId).isPresent();
    }

}
