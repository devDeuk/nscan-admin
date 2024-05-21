package com.sktel.nscan.domain.controller;

import com.sktel.nscan.adapters.database.CodeMst;
import com.sktel.nscan.domain.dto.CodeMstDTO;
import com.sktel.nscan.port.service.CodeMstService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * packageName    : com.sktel.nscan.domain.controller
 * fileName       : CodeMasterController
 * author         : P069278
 * date           : 2024-05-20(0020)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-05-20(0020)        P069278       최초 생성
 */
@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/code/")
public class CodeMasterController {

    private final CodeMstService codeMstService;

    /**
     * Code Master 테이블 목록조회
     *
     * @param request the request
     * @param model   the model
     * @return the list
     * @throws Exception the exception
     */
    @GetMapping("/list")
    public String getList(HttpServletRequest request, Model model) throws Exception{

        String servletPath = request.getServletPath();
        model.addAttribute("basepath","code");

        CodeMstDTO codeMstDTO = new CodeMstDTO();
        //service
        List<CodeMst> codelist = codeMstService.codeMstLst(codeMstDTO);
        log.info(codelist.toString());
        model.addAttribute("codelist", codelist);

        return "pages/code/code_master_list";
    }


    /**
     * Code Master 테이블 상세보기
     *
     * @param request the request
     * @param model   the model
     * @return the string
     */
    @GetMapping("/view")
    public String getView(HttpServletRequest request,@RequestParam final Long seq, Model model) throws Exception{

        String servletPath = request.getServletPath();
        model.addAttribute("basepath","code");

        CodeMst cdmst = codeMstService.codeMstDtl(seq);
        model.addAttribute("cdmst", cdmst);

        return "pages/code/code_master_view";
    }

}
