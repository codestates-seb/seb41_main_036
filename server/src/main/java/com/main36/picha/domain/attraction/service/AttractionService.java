package com.main36.picha.domain.attraction.service;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.repository.AttractionRepository;
import com.main36.picha.domain.attraction_file.service.AttractionImageService;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AttractionService {
    public final AttractionRepository attractionRepository;
    public final AttractionImageService attractionImageService;

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
                    attractionImageService.deleteAttractionImage(
                            findAttraction.getAttractionImage().getAttractionImageId());
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

    public void deleteAttraction(long attractionId){
        Attraction findAttraction = findVerifiedAttraction(attractionId);
        //attraction image도 같이 삭제(s3에서도 이미지파일 삭제)
        attractionImageService.deleteAttractionImage(findAttraction.getAttractionImage().getAttractionImageId());
        attractionRepository.delete(findAttraction);
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
