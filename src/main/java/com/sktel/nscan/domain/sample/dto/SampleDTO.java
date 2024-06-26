package com.sktel.nscan.domain.sample.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;


@Setter
@Getter
@NoArgsConstructor
@ToString
public class SampleDTO {
    private long seq;
    private String title;
    private String content;
    private String creNm;
    private LocalDateTime creDt;
}
