package com.sktel.nscan.domain.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

/**
 * Erorr페이지 관련 컨트롤러
 * packageName    : com.sktel.nscan.domain.common
 * fileName       : CustomErrorController
 * author         : ksd83
 * date           : 2022-06-24
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-24        ksd83       최초 생성
 */
@Controller
@Slf4j
public class CustomErrorController implements ErrorController {
    private String VIEW_PATH = "/common/error/";

    @RequestMapping(value = "/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        log.info("status : " + status);

        if(status != null){
            int statusCode = Integer.valueOf(status.toString());

            if(statusCode == HttpStatus.NOT_FOUND.value()){
                return VIEW_PATH + "404";
            }
            if(statusCode == HttpStatus.FORBIDDEN.value()){
                return VIEW_PATH + "500";
            }
        }
        return VIEW_PATH +"error";
    }

    public String getErrorPath() {
        return null;
    }
}
