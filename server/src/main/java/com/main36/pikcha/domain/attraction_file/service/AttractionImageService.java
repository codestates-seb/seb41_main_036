package com.main36.pikcha.domain.attraction_file.service;

import com.main36.pikcha.domain.attraction_file.entity.AttractionImage;
import com.main36.pikcha.domain.attraction_file.repository.AttractionImageRepository;
import com.main36.pikcha.global.config.S3Service;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttractionImageService {
    String dirname = "image";
    private final S3Service s3Service;
    private final AttractionImageRepository attractionImageRepository;

    public AttractionImage createAttractionImage(MultipartFile file) throws IOException {
        AttractionImage attractionImage = new AttractionImage();

        // 현재 날짜, 시간을 기준으로 생성한 10자리 숫자를 생성
//        int dateTimeInteger = (int) (new Date().getTime()/1000);

        // 생성된 날짜 + 원래 파일 이름 = 생성되는 파일 이름
        String imageFileName = /*dateTimeInteger+*/file.getOriginalFilename();

        String imageUrl = s3Service.upload(file, dirname, imageFileName);

        attractionImage.setAttractionImageFileName(imageFileName);
        attractionImage.setAttractionImageFileUrl(imageUrl);
        return attractionImageRepository.save(attractionImage);
    }

    public AttractionImage updateAttractionImage(AttractionImage attractionImage) {
        AttractionImage findAttractionImage = findVerifiedAttractionImage(attractionImage.getAttractionImageId());

        Optional.ofNullable(attractionImage.getAttractionImageFileName())
                .ifPresent(findAttractionImage::setAttractionImageFileName);
        Optional.ofNullable(attractionImage.getAttractionImageFileUrl())
                .ifPresent(findAttractionImage::setAttractionImageFileUrl);

        return attractionImageRepository.save(findAttractionImage);
    }

    public AttractionImage findAttractionImage(long attractionImageId){
        return findVerifiedAttractionImage(attractionImageId);
    }

    public Page<AttractionImage> findAttractionImages(int page, int size) {

        return attractionImageRepository.findAll(PageRequest.of(page, size,
                Sort.by("attractionImageId").ascending()));
    }

    public void deleteAttractionImage(long attractionImageId){
        AttractionImage findattractionImage = findVerifiedAttractionImage(attractionImageId);
        String fileName = findattractionImage.getAttractionImageFileName();
        String filePath = dirname+ "/" + fileName;
        s3Service.delete(filePath);
        attractionImageRepository.delete(findattractionImage);
    }

    private AttractionImage findVerifiedAttractionImage(long attractionImageId){
        return attractionImageRepository.findById(attractionImageId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.ATTRACTION_IMAGE_NOT_FOUND));
    }
    public void verifyAttractionImage(String fileName){
        Optional<AttractionImage> optionalAttractionImage =
                attractionImageRepository.findByAttractionImageFileName(fileName);
        if(optionalAttractionImage.isPresent())
            throw new BusinessLogicException(ExceptionCode.ATTRACTION_IMAGE_EXISTS);
    }
}
