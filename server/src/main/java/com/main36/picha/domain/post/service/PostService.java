package com.main36.picha.domain.post.service;


import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.service.AttractionService;
import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.post.repository.PostRepository;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(Post post) {
        Long numOfPostsPlusOne = post.getAttraction().getNumOfPosts() + 1;
        post.getAttraction().setNumOfPosts(numOfPostsPlusOne);

        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        Post findPost = getVerifiedPostById(post);
        Optional.ofNullable(post.getPostTitle())
                .ifPresent(findPost::setPostTitle);
        Optional.ofNullable(post.getPostContent())
                .ifPresent(findPost::setPostContent);
        Optional.ofNullable(post.getHashTagContent())
                .ifPresent(findPost::setHashTagContent);

        return findPost;
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

    public Post findPostNoneSetView(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        return optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


    public Page<Post> findAllPostsBySort(int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());

        return postRepository.findAll(pageable);
    }

    public void erasePost(Post post) {
        postRepository.delete(post);
    }


}
