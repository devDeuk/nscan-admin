package com.sktel.nscan.port.service.sample;

import com.sktel.nscan.adapters.database.redis.SampleRedis;
import com.sktel.nscan.domain.sample.dto.SampleDTO;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.port.service
 * fileName       : SampleRedisServie
 * author         : ksd83
 * date           : 2022-06-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-20        ksd83       최초 생성
 */
public interface SampleRedisServie {
    void addSampleToRedisByRepository(SampleDTO sampleDTO);

    List<SampleRedis> getSampleAllList();

    SampleRedis getSampleInfoRedisByRepsoitory(String seq);

    void deleteSampeInfoRedisByRepository(String seq);
}
