package com.sktel.nscan.port.service;

import com.sktel.nscan.adapters.database.Sample;
import com.sktel.nscan.domain.sample.dto.SampleDTO;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.domain.sample.service
 * fileName       : SampleService
 * author         : ksd83
 * date           : 2022-06-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-18        ksd83       최초 생성
 */
public interface SampleService {
    List<Sample> getAllSampleList();
    SampleDTO getSample(long seq);
    void insertSample(SampleDTO sampleRequestDTO);
    void updateCustomer(SampleDTO sampleRequestDTO);
    void deleteCustomer(long seq);
}


