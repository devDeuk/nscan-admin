package com.sktel.nscan.domain;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@Slf4j
@RequestMapping(value = "/")
public class HomeController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Locale locale, Model model) {
        log.info("welcom home ", locale);

        Date date = new Date();

        DateFormat format1 = DateFormat.getDateInstance(DateFormat.FULL);
        log.info("DateFormat.FULL : " + format1.format(date));
        DateFormat format2 = DateFormat.getDateInstance(DateFormat.LONG);
        log.info("DateFormat.LONG : " + format2.format(date));
        DateFormat format3 = DateFormat.getDateInstance(DateFormat.MEDIUM);
        log.info("DateFormat.MEDIUM : " + format3.format(date));
        DateFormat format4 = DateFormat.getDateInstance(DateFormat.SHORT);
        log.info("DateFormat.SHORT : " + format4.format(date));

        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

        String formattedDate = dateFormat.format(date);

        model.addAttribute("serverTime", formattedDate);

        return "home";
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String main(Model model) {
      model.addAttribute("title", "aaa");
      return "pages/main";
    }
}
