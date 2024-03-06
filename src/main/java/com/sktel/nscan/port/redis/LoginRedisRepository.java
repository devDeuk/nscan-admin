package com.sktel.nscan.port.redis;

import com.sktel.nscan.adapters.database.redis.LoginRedis;
import org.springframework.data.repository.CrudRepository;

public interface LoginRedisRepository extends CrudRepository<LoginRedis, String> {
}
