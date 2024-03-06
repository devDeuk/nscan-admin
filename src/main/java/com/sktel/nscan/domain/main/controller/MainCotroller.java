package com.sktel.nscan.domain.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * packageName    : com.sktel.nscan.domain.main.controller
 * fileName       : MainCotroller
 * author         : ksd83
 * date           : 2022-06-22
 * description    : Dashboard관련 요청 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-22        ksd83       최초 생성
 */
@Controller
@RequestMapping(value="/main")
public class MainCotroller {

    @GetMapping("/dashboard/{id}")
    public String admDashBoard(@PathVariable  String id){
        if(id.equals("usr")) {
            return "main/usrDashBoard";
        }else{
            return "main/admDashBoard";
        }
    }

    /**
     * Faq
     * @return
     */
    @GetMapping("/faq")
    public String faq(){
        return "main/faq";
    }

    /**
     * 시스템 점검
     * @return
     */
    @GetMapping("/systemInfo")
    public String systemInfo(){
        return "main/systemInfo";
    }

    /**
     * 시스템 점검 jq-grid
     * @return
     */
    @GetMapping("/systemInfoLst")
    public String systemInfoLst(){
        return "main/systemInfo";
    }

}
