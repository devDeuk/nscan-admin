package com.sktel.nscan.domain.sample.service;

import com.sktel.nscan.adapters.database.redis.SampleRedis;
import com.sktel.nscan.common.error.ErrorCode;
import com.sktel.nscan.common.error.exception.BizException;
import com.sktel.nscan.domain.sample.dto.SampleDTO;
import com.sktel.nscan.port.redis.SampleRedisRepository;
import com.sktel.nscan.port.service.SampleRedisServie;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * packageName    : com.sktel.nscan.domain.sample.service
 * fileName       : SampleRedisServiceImpl
 * author         : ksd83
 * date           : 2022-06-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-20        ksd83       최초 생성
 */
@Service
@RequiredArgsConstructor
public class SampleRedisServiceImpl implements SampleRedisServie {

    private final SampleRedisRepository sampleRedisRepository;


    private final ModelMapper modelMapper;

    // 1. RedisRepository
    @Transactional
    public void addSampleToRedisByRepository(SampleDTO sampleDTO) {
        SampleRedis sampleRedis = modelMapper.map(sampleDTO, SampleRedis.class);
        sampleRedisRepository.save(sampleRedis);
    }

    @Override
    public List<SampleRedis> getSampleAllList() {
        List<SampleRedis> sampleRedisList = (List<SampleRedis>) sampleRedisRepository.findAll();
        return sampleRedisList;
    }

    @Override
    public SampleRedis getSampleInfoRedisByRepsoitory(String seq) {
        Optional<SampleRedis> sampleOptional = sampleRedisRepository.findById(seq);
        if(sampleOptional.isPresent()){
            return modelMapper.map(sampleOptional.get(), SampleRedis.class);
        }else{
            throw new BizException(ErrorCode.RESOURCE_NOT_FOUND);
        }
    }

    @Override
    public void deleteSampeInfoRedisByRepository(String seq) {
        Optional<SampleRedis> sampleOptional = sampleRedisRepository.findById(seq);
        if(sampleOptional.isPresent()){
            sampleRedisRepository.delete(sampleOptional.get());
        }else{
            throw new BizException(ErrorCode.RESOURCE_NOT_FOUND);
        }
    }
}
