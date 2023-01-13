package com.main36.picha.domain.post.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import java.awt.font.MultipleMaster;
import java.util.List;

@Data
@Builder
public class PostDto{

    @NotBlank(message = "Null값과 빈칸을 허용할 수 없습니다.")
    private String postTitle;
    private String postContent;
//    private List<String> hashtags;
}
