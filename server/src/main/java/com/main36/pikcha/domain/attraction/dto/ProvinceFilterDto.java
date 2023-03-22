package com.main36.pikcha.domain.attraction.dto;

import lombok.Data;

import java.util.List;

@Data
// 지역 필터링 dto
public class ProvinceFilterDto {
    List<String> provinces;
}
