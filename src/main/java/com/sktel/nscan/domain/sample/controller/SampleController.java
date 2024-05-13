package com.sktel.nscan.domain.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


    @GetMapping("/list")
    public String getList(HttpServletRequest request, Model model){

        String servletPath = request.getServletPath();
        model.addAttribute("basepath","sample2");

        return "pages/samples/list";
    }


}
