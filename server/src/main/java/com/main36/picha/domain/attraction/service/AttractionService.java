package com.main36.picha.domain.attraction.service;

import com.main36.picha.domain.attraction.entity.Attraction;
import com.main36.picha.domain.attraction.repository.AttractionRepository;
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

        return attractionRepository.save(findAttraction);
    }

    public Attraction findAttraction(long attractionId){
        return findVerifiedAttraction(attractionId);
    }

    public Page<Attraction> findAttractions(int page, int size) {
        return attractionRepository.findAll(PageRequest.of(
                page,size, Sort.by("attractionId").descending()
                ));
    }

    public void deleteAttraction(long attractionId){
        Attraction findAttraction = findVerifiedAttraction(attractionId);

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
