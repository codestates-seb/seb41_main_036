package com.main36.picha.domain.attraction.dto;

import lombok.Data;
import org.springframework.boot.convert.DataSizeUnit;

import java.util.List;

@Data
public class AttractionFilterDto {
    List<String> provinces;
}
