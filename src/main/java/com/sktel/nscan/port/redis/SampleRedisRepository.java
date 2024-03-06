package com.sktel.nscan.port.redis;

import com.sktel.nscan.adapters.database.redis.SampleRedis;
import org.springframework.data.repository.CrudRepository;

public interface SampleRedisRepository extends CrudRepository<SampleRedis, String> {
}
