package com.sktel.nscan.domain.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *packageName    : com.sktel.nscan.domain.sample.controller
 * fileName       : SampleBoardController
 * author         : P069278
 * date           : 2024-04-01(0001)
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-04-01(0001)        P069278       최초 생성
 */

@Controller
@RequestMapping(value="/sample_board")
public class SampleBoardController {

    @GetMapping
    @ResponseBody
    public String main(){
        return "Hello World";
    }

}
