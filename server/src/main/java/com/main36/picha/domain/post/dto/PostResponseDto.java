package com.main36.picha.domain.post.dto;


import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostResponseDto {
    private Long memberId;
    private Long postId;
    private String attractionName;
    private String postTitle;
    private String attractionAddress;
    private String postContent;
//    private List<String> hashtags;
    private LocalDateTime createdAt;
}
