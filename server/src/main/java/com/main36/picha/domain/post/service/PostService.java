package com.main36.picha.domain.post.service;


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

        return postRepository.save(post);
    }

//    public Post updatePost(Post post) {
//        getVerifiedPostById(post);
//
//
//    }
//

    private Post getVerifiedPostById(Post post) {
        Optional<Post> byId = postRepository.findById(post.getPostId());
        return byId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    public Post findPost(Long postId) {
        Optional<Post> optionalPost =  postRepository.findById(postId);
        Post post = optionalPost.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        int views = post.getViews();
        post.setViews(views + 1);
        return post;
    }

    public Page<Post> findAllPostsByNewest(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("postId").descending());

        return postRepository.findAll(pageable);
    }

    public void deletePost(long postId, long memberId) {
        Post post = findPost(postId);
    }

}
