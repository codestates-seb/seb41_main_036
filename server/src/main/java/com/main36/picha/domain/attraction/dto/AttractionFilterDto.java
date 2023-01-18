package com.main36.picha.domain.attraction.dto;

import lombok.Data;
import org.springframework.boot.convert.DataSizeUnit;

import java.util.List;

@Data
// 지역 필터링 dto
public class AttractionFilterDto {
    List<String> provinces;
}
