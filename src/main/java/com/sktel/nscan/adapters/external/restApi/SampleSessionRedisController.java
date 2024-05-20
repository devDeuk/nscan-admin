package com.sktel.nscan.adapters.external.restApi;

import com.sktel.nscan.port.service.sample.SampleSessionService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * packageName    : com.sktel.nscan.adapters.external.restApi
 * fileName       : SampleSessionRedisController
 * author         : ksd83
 * date           : 2022-06-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-21        ksd83       최초 생성
 */
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value="/api/sample/restSession")
public class SampleSessionRedisController {

    private final SampleSessionService sampleSessionService;

    @ApiOperation(value = " redis key로 가져오기 ", httpMethod = "GET", notes = " Redis key로 가져오기 API.")
    @GetMapping("/get")
    public ResponseEntity<Object> getRedisRedis(@RequestParam String key){
        log.info("key : "+ key);
        sampleSessionService.getRedisStringValue(key);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @ApiOperation(value = " redis key, value 등록 ", httpMethod = "GET", notes = " Redis key, value 등록하기 API.")
    @GetMapping("/set")
    public ResponseEntity<Object> setRedisStringValue(@RequestParam String key, String value){
        log.info("setRedisStringValue key : "+ key);
        log.info("setRedisStringValue value : "+ value);
        sampleSessionService.setRedisStringValue(key, value);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @ApiOperation(value = " redis session 생성 ", httpMethod = "GET", notes = "session 저장")
    @GetMapping("/session-set")
    public void setRedisSessionRedis(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        session.setAttribute("SAMPLE", "data있다");

        log.info("session.getId() :" + session.getId());
    }

    @ApiOperation(value = " redis session 생성 ", httpMethod = "GET", notes = "session 저장")
    @GetMapping("/session-get")
    public void getRedisSessionRedis(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        String sessionData = (String) session.getAttribute("SAMPLE");
        log.info("sessionData :" + sessionData);
        log.info("session.getId() :" + session.getId());
    }


}
