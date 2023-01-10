package com.main36.picha.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Builder
public class ProfileHomeDto {

    private long memberId;

    private String username;

    private String memberTitle;

    private String phoneNumber;

    private String address;

    private String picture;

    private String email;

    private String aboutMe;

    private int totalMyPosts;

    private int totalMySaves;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    //TODO: 프로필화면 내 지도색칠을 위해 post address 정보 주기
//    private List<Post> postList;
}
