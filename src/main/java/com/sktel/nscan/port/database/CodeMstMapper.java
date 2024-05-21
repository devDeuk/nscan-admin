package com.sktel.nscan.port.database;

import com.sktel.nscan.adapters.database.CodeMst;
import com.sktel.nscan.domain.dto.CodeMstDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * packageName    : com.sktel.nscan.port.database
 * fileName       : CodeMstMapper
 * author         : P069278
 * date           : 2024-05-20(0020)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-20(0020)        P069278       최초 생성
 */
@Mapper
public interface CodeMstMapper {

    /**
     * Code mst 리스트
     *
     * @param codeMstDTO the code mst dto
     * @return the list
     */
    List<CodeMst> codeMstLst(CodeMstDTO codeMstDTO);


    /**
     * Code mst 상세
     *
     * @param seq the seq
     * @return the code mst
     */
    CodeMst codeMstDtl(long seq);

}
