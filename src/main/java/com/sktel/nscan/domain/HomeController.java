package com.sktel.nscan.domain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@Slf4j
@RequestMapping(value = "/lab")
public class HomeController {

  @GetMapping("/index")
  public String themeIndex() {
    return "theme/index";
  }
}
