package com.sktel.nscan.port.database;

import com.sktel.nscan.adapters.database.Sample;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.port.database
 * fileName       : SampleMapper
 * author         : ksd83
 * date           : 2024-03-06
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-03-06        ksd83       최초 생성
 */
@Mapper
public interface SampleMapper {
    List<Sample> findAll();
    Sample findById(long seq);
    void save(Sample customer);
    void update(Sample customer);
    void delete(long id);
}
