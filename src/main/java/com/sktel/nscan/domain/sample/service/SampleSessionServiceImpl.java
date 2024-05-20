package com.sktel.nscan.domain.sample.service;

import com.sktel.nscan.port.service.sample.SampleSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

/**
 * packageName    : com.sktel.nscan.domain.sample.service
 * fileName       : SampleSessionServiceImpl
 * author         : ksd83
 * date           : 2022-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-21        ksd83       최초 생성
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class SampleSessionServiceImpl implements SampleSessionService {

    private final StringRedisTemplate stringRedisTemplate;

    @Override
    public void getRedisStringValue(String key) {

        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        log.info("Redis key : " + key);
        log.info("Redis value : " + stringValueOperations.get(key));
    }


    @Override
    public void setRedisStringValue(String key, String value) {
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        stringValueOperations.set(key, value);

        log.info("Redis key : " + key);
        log.info("Redis value : " + stringValueOperations.get(key));
    }
}
