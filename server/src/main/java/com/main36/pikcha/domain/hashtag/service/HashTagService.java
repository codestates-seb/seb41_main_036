package com.main36.pikcha.domain.hashtag.service;

import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.hashtag.repository.HashTagRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class HashTagService{
    private final HashTagRepository hashTagRepository;
    public HashTag createHashTag(HashTag hashTag) {
        return hashTagRepository.save(hashTag);
    }
    /*public HashTag updateHashTag(HashTag hashTag) {
        HashTag findHashTag = findVerifiedHashTag(hashTag.getHashTagContent());

        Optional.ofNullable(hashTag.getHashTagContent())
                .ifPresent(findHashTag::setHashTagContent);

        return hashTagRepository.save(findHashTag);
    }*/
    public void deleteHashTag(HashTag hashTag, long postId){
        HashTag findHashTag = findVerifiedHashTag(hashTag.getHashTagContent(), postId);
        log.info("will delete hashTag : {}", findHashTag.getHashTagContent());
        hashTagRepository.deleteById(findHashTag.getHashTagId());
    }
    public void deleteHashTags(List<HashTag> hashTags, long postId){
        for(HashTag hashTag: hashTags){
            HashTag findHashTag = findVerifiedHashTag(hashTag.getHashTagContent(), postId);
            hashTagRepository.delete(findHashTag);
        }
    }
    public HashTag findVerifiedHashTag(String content, long postId){
        return hashTagRepository.findByPost(content, postId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.HASHTAG_NOT_FOUND));
    }

    public Optional<HashTag> findHashTag(String content){
        return hashTagRepository.findByHashTagContent(content);
    }
}
