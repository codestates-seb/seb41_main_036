package com.main36.pikcha.domain.hashtag.service;

import com.main36.pikcha.domain.hashtag.entity.HashTag;
import com.main36.pikcha.domain.hashtag.repository.HashTagRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class HashTagService{
    private final HashTagRepository hashTagRepository;
    public HashTag createHashTag(HashTag hashTag) {
        return hashTagRepository.save(hashTag);
    }
    public HashTag updateHashTag(HashTag hashTag) {
        HashTag findHashTag = findVerifiedHashTag(hashTag.getHashTagContent());

        Optional.ofNullable(hashTag.getHashTagContent())
                .ifPresent(findHashTag::setHashTagContent);

        return hashTagRepository.save(findHashTag);
    }
    public void deleteHashTag(HashTag hashTag){
        HashTag findHashTag = findVerifiedHashTag(hashTag.getHashTagContent());

        hashTagRepository.delete(findHashTag);
    }
    public HashTag findVerifiedHashTag(String content){
        return hashTagRepository.findByHashTagContent(content)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.HASHTAG_NOT_FOUND));
    }
}
