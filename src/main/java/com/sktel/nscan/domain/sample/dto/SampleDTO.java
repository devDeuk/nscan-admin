package com.sktel.nscan.domain.sample.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;


@Setter
@Getter
@NoArgsConstructor
@ToString
public class SampleDTO {
    private long seq;
    private String title;
    private String content;
    private Date creDt;
    private String creNm;
}
