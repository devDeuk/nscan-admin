package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : Sample
 * author         : ksd83
 * date           : 2022-06-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-18        ksd83       최초 생성
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Alias("Sample")
public class Sample implements Serializable {
    private long seq;
    private String title;
    private String content;
    private String creNm;
    private LocalDateTime creDt;
}

