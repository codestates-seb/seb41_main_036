package com.main36.pikcha.domain.member.dto;

import com.main36.pikcha.domain.post.dto.PostDto;
import com.main36.pikcha.domain.post.dto.PostResponseDto;
import com.main36.pikcha.domain.save.dto.SaveResponseDto;
import com.main36.pikcha.domain.save.entity.Save;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class MemberResponseDto {

    @Data
    @Builder
    public static class SignUp {
        private Long memberId;
        private String email;
        private String phoneNumber;
        private String address;
        private String username;
        private String picture;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    public static class Profile {
        private long memberId;
        private String username;
        private String memberTitle;
        private String phoneNumber;
        private String address;
        private String picture;
        private String email;
        private int totalMyPosts;
        private int totalMySaves;
        private List<PostResponseDto.Profile> posts;
        private List<SaveResponseDto> saves;
        // TODO: save
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        //TODO: 프로필화면 내 지도색칠을 위해 post address 정보 주기
//    private List<Post> postList;
    }

}
