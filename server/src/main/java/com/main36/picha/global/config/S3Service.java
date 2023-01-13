package com.main36.picha.global.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 파일 저장 위치가 없을때는 s3 버킷 최상위 디렉토리에 저장
   public String upload(MultipartFile file) throws IOException {
       return upload(file, "", file.getOriginalFilename());
   }

   // S3버킷에 파일 저장위치 dirName, 하위에 fileName으로 저장
    public String upload(MultipartFile file, String dirName, String fileName) throws IOException {
       String filePath = dirName+ "/" + fileName;
       ObjectMetadata objectMetadata  = new ObjectMetadata();
       objectMetadata.setContentLength(file.getInputStream().available());
       s3Client.putObject(new PutObjectRequest(bucket, filePath, file.getInputStream(), objectMetadata)
               .withCannedAcl(CannedAccessControlList.PublicRead));
        return s3Client.getUrl(bucket, filePath).toString();
    }

    // s3 버킷에서 파일을 찾고 삭제
    public void delete(String objectName){
       boolean isExistObject = s3Client.doesObjectExist(bucket, objectName);
       if(isExistObject){
           s3Client.deleteObject(bucket, objectName);
           log.info("파일이 삭제되었습니다.");
       }else{
           log.info("파일이 없습니다.");
       }
    }

}
