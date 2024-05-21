package com.sktel.nscan.codemst;

import com.sktel.nscan.adapters.database.CodeMst;
import com.sktel.nscan.domain.dto.CodeMstDTO;
import com.sktel.nscan.port.database.CodeMstMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.codemst
 * fileName       : CodeMstCRUDTest
 * author         : P069278
 * date           : 2024-05-21(0021)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-21(0021)        P069278       최초 생성
 */
@SpringBootTest
@Slf4j
public class CodeMstCRUDTest {

    @Autowired
    CodeMstMapper codeMstMapper;

    @Test
    void list(){
        CodeMstDTO codeMstDTO=new CodeMstDTO();

        List<CodeMst> cdmstLst = codeMstMapper.codeMstLst(codeMstDTO);

        log.info("---- list :", cdmstLst.toString() );

    }

}
