package com.sktel.nscan.port.database;

import com.sktel.nscan.domain.dto.CodeMstDTO;
import lombok.extern.slf4j.Slf4j;
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

    List<CodeMstDTO> codeMstLst(CodeMstDTO codeMstDTO);

}
