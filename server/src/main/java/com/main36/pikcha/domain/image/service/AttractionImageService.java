package com.main36.pikcha.domain.image.service;

import com.main36.pikcha.domain.image.entity.AttractionImage;
import com.main36.pikcha.domain.image.repository.AttractionImageRepository;
import com.main36.pikcha.global.config.S3Service;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AttractionImageService {
    private final AttractionImageRepository attractionImageRepository;
    private final String dirName = "attractionImages";
    private final S3Service s3Service;

    public AttractionImage createAttractionImage(MultipartFile file) throws IOException {
        AttractionImage attractionImage = new AttractionImage();
        // 현재 날짜, 시간을 기준으로 생성한 10자리 숫자를 생성
         int dateTimeInteger = (int) (new Date().getTime()/1000);

        // 생성된 날짜 + 원래 파일 이름 = 생성되는 파일 이름
        String imageFileName = dateTimeInteger+file.getOriginalFilename();
        String imageUrl = s3Service.upload(file, dirName, imageFileName);

        attractionImage.setAttractionImageFileName(imageFileName);
        attractionImage.setAttractionImageUrl(imageUrl);
        return attractionImageRepository.save(attractionImage);
    }

    public void deleteAttractionImage(AttractionImage attractionImage){
        AttractionImage findAttractionImage = findVerifiedAttractionImage(attractionImage.getAttractionImageId());
        String fileName = findAttractionImage.getAttractionImageFileName();
        String filePath = dirName + "/" + fileName;
        s3Service.delete(filePath);
        attractionImageRepository.delete(findAttractionImage);
    }

    public void deleteOnlyS3Image(AttractionImage attractionImage){
            AttractionImage findAttractionImage = findVerifiedAttractionImage(attractionImage.getAttractionImageId());
            String fileName = findAttractionImage.getAttractionImageFileName();
            String filePath = dirName + "/" + fileName;
            s3Service.delete(filePath);
    }

    public void deleteAttractionImageByUrl(String attractionImageUrl) {
            AttractionImage findAttractionImage = findAttractionImageByUrl(attractionImageUrl);
            String fileName = findAttractionImage.getAttractionImageFileName();
            String filePath = dirName + "/" + fileName;
            s3Service.delete(filePath);
            attractionImageRepository.delete(findAttractionImage);
    }

    public AttractionImage findVerifiedAttractionImage(long attractionImageId){
        return attractionImageRepository.findById(attractionImageId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_IMAGE_NOT_FOUND));
    }

    public AttractionImage findAttractionImageByUrl(String url){
        return attractionImageRepository.findByAttractionImageUrl(url)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_IMAGE_NOT_FOUND));
    }
}
