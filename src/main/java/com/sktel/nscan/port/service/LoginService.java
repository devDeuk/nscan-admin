package com.sktel.nscan.port.service;

import com.sktel.nscan.domain.login.dto.LoginDTO;
import com.sktel.nscan.domain.login.dto.SMSInfoDTO;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * packageName    : com.sktel.nscan.port.service
 * fileName       : LoginService
 * author         : ksd83
 * date           : 2022-06-24
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-24        ksd83       최초 생성
 */
@Service
public interface LoginService {

    //2차인증 페이지
    LoginDTO CertiSMS(HttpServletRequest request, LoginDTO loginDto);

    //2차인증 인증번호 발송
    LoginDTO CertiSMSsend(HttpServletRequest request);

    //2차인증 점검
    Map<String, String> ConfirmSMS(SMSInfoDTO smsInfoDTO);

    //2차인증 정상 후 최근 3개월간 비밀번호 변경하지 않은 판매자
    Map<String, String> Recent3Month(LoginDTO loginDto);

}
