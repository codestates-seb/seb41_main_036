package com.main36.pikcha.domain.attraction.service;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import com.main36.pikcha.domain.attraction.repository.AttractionRepository;
import com.main36.pikcha.domain.like.entity.AttractionLikes;
import com.main36.pikcha.domain.like.repository.AttractionLikesRepository;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.save.entity.Save;
import com.main36.pikcha.domain.save.repository.SaveRepository;
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
public class AttractionService {
    private final AttractionRepository attractionRepository;
    private final AttractionLikesRepository attractionLikesRepository;
    private final SaveRepository saveRepository;

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
        Optional.ofNullable(attraction.getProvince())
                .ifPresent(findAttraction::setProvince);

        return attractionRepository.save(findAttraction);
    }

    @Transactional(readOnly = true)
    public Attraction findAttraction(long attractionId){
        return findVerifiedAttraction(attractionId);
    }

    @Transactional(readOnly = true)
    public Page<Attraction> findAttractions(int page, int size) {
        return attractionRepository.findAll(PageRequest.of(
                page,size, Sort.by("attractionId").ascending()
                ));
    }
    @Transactional(readOnly = true)
    public Page<Attraction> findFilteredAttractions(List<String> provinces, int page, int size, String sort){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return attractionRepository.findAllByProvinceIn(provinces, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Attraction> findAllProvincesAttractions(int page, int size, String sort){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return attractionRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Attraction> findFilteredSearchedAttractions(List<String> provinces, String keyword, int page, int size, String sort){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return attractionRepository.findByAttractionNameContainingIgnoreCaseAndProvinceIn(keyword, provinces, pageable);
    }
    @Transactional(readOnly = true)
    public Page<Attraction> findAllSearchedAttractions(String keyword, int page, int size, String sort){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
        return attractionRepository.findByAttractionNameContainingIgnoreCase(keyword, pageable);
    }


    public void deleteAttraction(long attractionId){
        Attraction findAttraction = findVerifiedAttraction(attractionId);

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

    public boolean isVoted(long memberId, long attractionId){
        return attractionLikesRepository.findByMemberIdAndAttractionId(memberId, attractionId).isPresent();
    }

    public boolean saveAttraction(Member member, Attraction attraction){
        // 즐겨찾기를 누른적이 있나?
        Optional<Save> save = saveRepository.findByMemberAndAttraction(member, attraction);

        // 즐겨찾기를 이미 눌렀다면
        if(save.isPresent()){
            // 즐겨찾기 데이터를 삭제하고
            saveRepository.delete(save.get());
            // 명소의 saves를 하나 감소시킨다
            attraction.setSaves(attraction.getSaves()-1);
            // 지금은 즐겨찾기를 누르지 않은 상태라는것을 반환한다.
            return false;
        }
        // 즐겨찾기를 누르지 않았으면
        else{
            // 즐겨찾기 데이터를 생성하고
            saveRepository.save(Save.builder().attraction(attraction).member(member).build());
            // 명소의 saves를 하나 증가시킨다.
            attraction.setSaves(attraction.getSaves()+1);
            // 지금은 즐겨찾기를 누른 상태라는것을 반환한다.
            return true;
        }
    }

    public boolean isSaved(long memberId, long attractionId) {
        return saveRepository.findByMemberIdAndAttractionId(memberId, attractionId).isPresent();
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
