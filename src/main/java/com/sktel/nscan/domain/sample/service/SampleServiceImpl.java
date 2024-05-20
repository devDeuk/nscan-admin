package com.sktel.nscan.domain.sample.service;

import com.sktel.nscan.adapters.database.Sample;
import com.sktel.nscan.common.error.ErrorCode;
import com.sktel.nscan.common.error.exception.BizException;
import com.sktel.nscan.domain.sample.dto.SampleDTO;
import com.sktel.nscan.port.database.SampleMapper;
import com.sktel.nscan.port.service.sample.SampleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * packageName    : com.sktel.nscan.domain.sample.service
 * fileName       : SampleServiceImpl
 * author         : ksd83
 * date           : 2022-06-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-18        ksd83       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SampleServiceImpl implements SampleService {

    private final SampleMapper sampleMapper;
    private final ModelMapper modelMapper;

    @Override
    public List<Sample> getAllSampleList() {
        return sampleMapper.findAll();
    }


    @Override
    public SampleDTO getSample(long seq) {
        Optional<Sample> optionalSample = Optional.ofNullable(sampleMapper.findById(seq));
        if(!optionalSample.isPresent()){
            throw new BizException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return modelMapper.map(optionalSample.get(), SampleDTO.class);
    }

    @Transactional(isolation = Isolation.DEFAULT)
    public void insertSample(SampleDTO sampleRequestDTO) {
        sampleMapper.save(modelMapper.map(sampleRequestDTO, Sample.class));
    }

    @Transactional(isolation = Isolation.DEFAULT)
    public void updateCustomer(SampleDTO sampleRequestDTO) {

        long seq = sampleRequestDTO.getSeq();

        if(null != getSample(seq)){
            sampleMapper.update(modelMapper.map(sampleRequestDTO, Sample.class));
        }else{
            //존재하지 않을 경우 Exception
            throw new BizException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }

    @Transactional(isolation = Isolation.DEFAULT)
    public void deleteCustomer(long seq) {
        if(null != getSample(seq)){
            sampleMapper.delete(seq);
        }else{
            //존재하지 않을 경우 Exception
            throw new BizException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }
}
