package com.sktel.nscan.domain.controller;

import com.sktel.nscan.domain.dto.CodeMstDTO;
import com.sktel.nscan.port.service.CodeMstService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping("/list")
    public String getList(HttpServletRequest request, Model model) throws Exception{

        String servletPath = request.getServletPath();
        model.addAttribute("basepath","code");

        CodeMstDTO codeMstDTO = new CodeMstDTO();

        //service
        List<CodeMstDTO> list = codeMstService.codeMstLst(codeMstDTO);


        return "pages/code/code_master_list";
    }

    @GetMapping("/view")
    public String getView(HttpServletRequest request, Model model){

        String servletPath = request.getServletPath();
        model.addAttribute("basepath","code");

        return "pages/code/code_master_view";
    }

}
