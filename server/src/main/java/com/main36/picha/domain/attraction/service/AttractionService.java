package com.main36.picha.domain.attraction.service;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.repository.AttractionRepository;
import com.main36.picha.domain.attraction_file.service.AttractionImageService;
import com.main36.picha.domain.attraction_likes.entity.AttractionLikes;
import com.main36.picha.domain.attraction_likes.repository.AttractionLikesRepository;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AttractionService {
    private final AttractionRepository attractionRepository;
    private final AttractionImageService attractionImageService;

    private final AttractionLikesRepository attractionLikesRepository;


    public Attraction createAttraction(Attraction attraction){
        verifyExistsAttraction(attraction.getAttractionAddress());
        return attractionRepository.save(attraction);
    }

    public Attraction updateAttraction(Attraction attraction){
        Attraction findAttraction = findVerifiedAttraction(attraction.getAttractionId());

        Optional.ofNullable(attraction.getAttractionAddress())
                .ifPresent(findAttraction::setAttractionAddress);
        Optional.ofNullable(attraction.getAttractionName())
                .ifPresent(findAttraction::setAttractionName);
        Optional.ofNullable(attraction.getAttractionDescription())
                .ifPresent(findAttraction::setAttractionDescription);

        // 이미지를 바꾸는 경우 기존 이미지를 삭제
        Optional.ofNullable(attraction.getAttractionImage())
                .ifPresent(attractionImage-> {
                    if(findAttraction.getAttractionImage()!= null) {
                        attractionImageService.deleteAttractionImage(
                                findAttraction.getAttractionImage().getAttractionImageId());
                    }
                    findAttraction.setAttractionImage(attractionImage);
                });
        Optional.ofNullable(attraction.getProvince())
                .ifPresent(findAttraction::setProvince);

        return attractionRepository.save(findAttraction);
    }

    public Attraction findAttraction(long attractionId){
        return findVerifiedAttraction(attractionId);
    }

    public Page<Attraction> findAttractions(int page, int size) {
        return attractionRepository.findAll(PageRequest.of(
                page,size, Sort.by("attractionId").ascending()
                ));
    }

    public Page<Attraction> findFilteredAttractions(List<String> provinces, int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("attractionId").descending());
        return attractionRepository.findAllByProvinceIn(provinces, pageable);
    }

    public void deleteAttraction(long attractionId){
        Attraction findAttraction = findVerifiedAttraction(attractionId);
        //attraction image도 같이 삭제(s3에서도 이미지파일 삭제)
        attractionImageService.deleteAttractionImage(findAttraction.getAttractionImage().getAttractionImageId());
        attractionRepository.delete(findAttraction);
    }

    public boolean voteAttraction(Member member, Attraction attraction){
        // 좋아요를 누른적이 있나?
        Optional<AttractionLikes> likes = attractionLikesRepository.findByMemberAndAttraction(member, attraction);

        // 좋아요를 이미 눌렀다면
        if(likes.isPresent()){
            // 좋아요 데이터를 삭제하고
            attractionLikesRepository.delete(likes.get());
            // 명소의 likes를 하나 감소시킨다
            attraction.setLikes(attraction.getLikes()-1);
            // 지금은 좋아요를 누르지 않은 상태라는것을 반환한다.
            return false;
        }
        // 좋아요를 누르지 않았으면
        else{
            // 좋아요 데이터를 생성하고
            attractionLikesRepository.save(AttractionLikes.builder().attraction(attraction).member(member).build());
            // 명소의 likes를 하나 증가시킨다.
            attraction.setLikes(attraction.getLikes()+1);
            // 지금은 좋아요를 누른 상태라는것을 반환한다.
            return true;
        }
    }

    public boolean isVoted(Member member, Attraction attraction) {
        Optional<AttractionLikes> likes = attractionLikesRepository.findByMemberAndAttraction(member, attraction);
        return likes.isPresent();
    }

    private Attraction findVerifiedAttraction(long attractionId){
        return attractionRepository.findById(attractionId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.ATTRACTION_NOT_FOUND));
    }

    // 각 명소들의 구분은 id가 아닌 address이다.
    private void verifyExistsAttraction(String address) {
        Optional<Attraction> optionalAttraction = attractionRepository.findByAttractionAddress(address);
        if(optionalAttraction.isPresent()){
            throw new BusinessLogicException(ExceptionCode.ATTRACTION_EXISTS);
        }
    }


}
