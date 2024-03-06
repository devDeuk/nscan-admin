package com.sktel.nscan.port.service;

/**
 * packageName    : com.sktel.nscan.port.service
 * fileName       : SampleSessionService
 * author         : ksd83
 * date           : 2022-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-21        ksd83       최초 생성
 */
public interface SampleSessionService {

    void getRedisStringValue(String key);
    void setRedisStringValue(String key, String value);
}
