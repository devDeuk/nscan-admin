package com.sktel.nscan.domain.login.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value="/login")
public class LoginController {


    /**
     * 로그인 페이지
     * @return
     */
    @GetMapping("")
    public String login(){

        return "redirect:lab/index";
    }

}
