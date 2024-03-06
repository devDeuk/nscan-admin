package com.sktel.nscan.common.config;


import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonBean {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setPropertyCondition(Conditions.isNotNull())   // null일경우 복사하지 않도록 설정
                .setFieldMatchingEnabled(true)  // setter없이 맵핑 되도록 설정
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)  // setter없이 맵핑 되도록 설정
                .setMatchingStrategy(MatchingStrategies.STRICT);    // 필드명이 같을때만 맵핑하도록 설정
        return modelMapper;
    }
}

