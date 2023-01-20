package com.main36.picha.global.config;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
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

       // 저장될 위치 + 파일이름
       String filePath = dirName+ "/" + fileName;

       // 확장자 추출
       String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
       String contentType = "";

       //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "txt":
                contentType = "text/plain";
                break;
            case "csv":
                contentType = "text/csv";
                break;
        }

       // 메타데이터 설정
       ObjectMetadata objectMetadata  = new ObjectMetadata();
       objectMetadata.setContentLength(file.getInputStream().available());
       objectMetadata.setContentType(contentType);

       // s3에 이미지 업로드
       try{
           s3Client.putObject(new PutObjectRequest(bucket, filePath, file.getInputStream(), objectMetadata)
                   .withCannedAcl(CannedAccessControlList.PublicRead));
       } catch(SdkClientException e) {
           e.printStackTrace();
       }

        // s3 이미지 url 반환
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
