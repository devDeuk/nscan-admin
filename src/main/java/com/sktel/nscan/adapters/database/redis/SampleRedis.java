package com.sktel.nscan.adapters.database.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * packageName    : com.sktel.nscan.adapters.database.redis
 * fileName       : SmpleRedis
 * author         : ksd83
 * date           : 2022-06-19
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-19        ks`d83       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@RedisHash(value = "SampleRedis", timeToLive = (60L * 60L * 24L * 7L))
public class SampleRedis implements Serializable {
    @Id
    private String seq ;
    private String title;
    private String content;
    private String creNm;
    private LocalDateTime creDt;
}
