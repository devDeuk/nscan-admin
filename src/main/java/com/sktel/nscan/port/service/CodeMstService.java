package com.sktel.nscan.port.service;

import com.sktel.nscan.domain.dto.CodeMstDTO;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.domain.serviceImpl
 * fileName       : CodeMstService
 * author         : P069278
 * date           : 2024-05-20(0020)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-20(0020)        P069278       최초 생성
 */
@Service
public interface CodeMstService {


    /**
     * 코드마스터 리스트 - 목록 조회
     *
     * @param codeMstDTO the code mst dto
     * @return the list
     * @throws Exception the exception
     */
    List<CodeMstDTO> codeMstLst(CodeMstDTO codeMstDTO) throws Exception;



}
