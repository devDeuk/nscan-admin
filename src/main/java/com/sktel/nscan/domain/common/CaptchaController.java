package com.sktel.nscan.domain.common;

import com.sktel.nscan.common.utils.captcha.GoogleRecaptcha;
import com.sktel.nscan.common.utils.captcha.SimpleCaptchaUtil;
import lombok.extern.slf4j.Slf4j;
import nl.captcha.Captcha;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * packageName    : com.sktel.nscan.domain.common
 * fileName       : CaptchaController
 * author         : ksd83
 * date           : 2022-06-27
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-27        ksd83       최초 생성
 */
@Controller
@RequestMapping("/captcha")
@Slf4j
public class CaptchaController {

    @GetMapping("/simplecaptcha")
    public String simplecaptcha (){
        return "common/captcha/simplecaptcha";
    }

    @GetMapping("/captchaImg")
    public void captchaImg (HttpServletRequest request, HttpServletResponse response){
        log.info("============captchaImg========================");
        new SimpleCaptchaUtil().getImgCaptCha(request, response);
    }

    @PostMapping("/captchaAudio")
    public void captchaAudio (HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.info("============captchaAudio========================");
        Captcha captcha = (Captcha) request.getSession().getAttribute(Captcha.NAME);
        String getAnswer = captcha.getAnswer();
        new SimpleCaptchaUtil().getAudioCaptCha(request, response, getAnswer);
    }

    @PostMapping("/chkAnswer")
    public ResponseEntity<String>  chkAnswer (HttpServletRequest request, HttpServletResponse response){
        log.info("============chkAnswer========================");

        String result = "";
        Captcha captcha = (Captcha) request.getSession().getAttribute(Captcha.NAME);
        String ans = request.getParameter("answer");

        log.info("==ans : " + ans);

        if(ans!=null && !"".equals(ans)){
            if(captcha.isCorrect(ans)){
                request.getSession().removeAttribute(Captcha.NAME);
                result ="200";
            }else{
                result ="300";
            }
        }

        ResponseEntity<String> entity = new ResponseEntity<String>(result, HttpStatus.OK);
        return entity;
    }
    @PostMapping("/googleRobotCheck")
    public ResponseEntity<String>  googleRobotCheck (HttpServletRequest request, HttpServletResponse response) throws Exception{
        log.info("============googleRobotCheck========================");
        String result ="";
        String token =request.getParameter("token");
        boolean googleCaptcha = GoogleRecaptcha.isValid(token);

        if(googleCaptcha){
            result ="200";
        }else{
            result ="300";
        }

        ResponseEntity<String> entity = new ResponseEntity<String>(result, HttpStatus.OK);
        return entity;
    }
}
