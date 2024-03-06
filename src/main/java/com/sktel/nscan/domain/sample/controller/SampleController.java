package com.sktel.nscan.domain.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/sample")
public class SampleController {

    @GetMapping("/index")
    public String samplepage(){
        return "/sample/index";
    }

    @GetMapping("/rest")
    public String samplepage2(){
        return "sample/ajaxRestTest";
    }
}
