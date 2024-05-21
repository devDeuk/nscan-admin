package com.sktel.nscan.domain.serviceImpl;

import com.sktel.nscan.adapters.database.CodeMst;
import com.sktel.nscan.domain.dto.CodeMstDTO;
import com.sktel.nscan.port.database.CodeMstMapper;
import com.sktel.nscan.port.service.CodeMstService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.domain.serviceImpl
 * fileName       : CodeMstServiceImpl
 * author         : P069278
 * date           : 2024-05-20(0020)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-20(0020)        P069278       최초 생성
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CodeMstServiceImpl implements CodeMstService {

    private final CodeMstMapper codeMstMapper;


    @Override
    public List<CodeMst> codeMstLst(CodeMstDTO codeMstDTO) throws Exception {
        return codeMstMapper.codeMstLst(codeMstDTO);
    }

    @Override
    public CodeMst codeMstDtl(Long seq) throws Exception {
        return codeMstMapper.codeMstDtl(seq);
    }
}
