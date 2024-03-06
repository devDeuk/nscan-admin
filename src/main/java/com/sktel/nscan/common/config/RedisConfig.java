package com.sktel.nscan.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * RedisConfig 의 설명을 여기에 작성한다.
 * @author  2022/02/17
 * @Version 1.0.0
 * @Date ihyejin
 * @Description :  Redis사용을 위한 공통 Configuration.
 * Host, port 정보 및 bean 선언한다.
 * =======================================================
 * DATE         AUTHOR          NOTE
 ---------------------------------------------------------
 */

@Configuration
@EnableRedisRepositories
public class RedisConfig {

    @Value("${spring.redis.host}")  //application.yaml 파일에 설정
    private String redisHost;

    @Value("${spring.redis.port}")  //application.yaml 파일에 설정
    private int redisPort;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisHost, redisPort);
        return lettuceConnectionFactory;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }
}