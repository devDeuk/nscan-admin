package com.sktel.nscan.domain.login.service;

import com.sktel.nscan.adapters.database.Login;
import com.sktel.nscan.adapters.database.LoginLog;
import com.sktel.nscan.adapters.database.SMSInfo;
import com.sktel.nscan.adapters.database.UserInfo;
import com.sktel.nscan.common.error.ErrorCode;
import com.sktel.nscan.common.error.exception.BizException;
import com.sktel.nscan.common.utils.DateUtil;
import com.sktel.nscan.common.utils.SHA256SaltHash;
import com.sktel.nscan.common.utils.SmsUtil;
import com.sktel.nscan.common.utils.StringUtil;
import com.sktel.nscan.domain.login.dto.LoginDTO;
import com.sktel.nscan.domain.login.dto.LoginLogDTO;
import com.sktel.nscan.domain.login.dto.SMSInfoDTO;
import com.sktel.nscan.domain.main.dto.UserInfoDTO;
import com.sktel.nscan.port.database.LoginMapper;
import com.sktel.nscan.port.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName    : com.sktel.nscan.domain.login.service
 * fileName       : LoginServiceImpl
 * author         : ksd83
 * date           : 2022-06-24
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-24        ksd83       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LoginServiceImpl implements LoginService {

    private final LoginMapper loginMapper;

    private final ModelMapper modelMapper;

    @Override
    public LoginDTO CertiSMS(HttpServletRequest request, LoginDTO loginDTO) {

        //3. sha256SaltHash로 비밀번호 파라미터 암호화
        loginDTO.setScrt_num_sha256(SHA256SaltHash.encode(loginDTO.getScrt_num(), loginDTO.getLogin_id()));


        //4. 휴대폰 번호가져오기
        //Optional<Login> optionalLogin = Optional.ofNullable(loginMapper.selectMovPhonNum(loginDto));
        //log.info("optionalLogin.get()  :" + optionalLogin.get());

        String callnum = loginMapper.selectMovPhonNum(modelMapper.map(loginDTO, Login.class));
        log.info("callnum  :" + callnum);


        // '-'와 공백제거 전 전화번호(SMSphonNumChng 비교를 위해 사용)
        String callnum_bf = callnum;
        // 휴대폰번호 [callnum] 값에서 '-' 과 공백 제거
        callnum = StringUtil.replace(StringUtil.callNumFormat(callnum), "-", "");

        String login_norm_yn = "Y";
        String login_msg = "";
        String successYn = "";
        String smsCertSuccessYn ="";

        //10회이상 틀렸는지 확인
        int loginErrorCnt = loginMapper.getLoginErrorCnt(modelMapper.map(loginDTO, Login.class));
        log.info("loginErrorCnt : " + loginErrorCnt);

        // 에러가 10회또는 그이상일경우 error
        if(loginErrorCnt >= 10) {
            successYn ="logErrorCntOver";

        }else{
            if (callnum.equals("FAIL")) {
                successYn ="callNumFail";
                login_norm_yn = "N";
                login_msg = "로그인 아이디 또는 비밀번호를 확인해 주시기 바랍니다.";
            }else if (callnum.equals("") || callnum.equals("null")) {
                successYn = "needPhoneNum";
                login_norm_yn = "N";
                login_msg = "휴대폰 번호를 변경해 주시기 바랍니다.";
            }else{

                login_msg = "로그인 정상";
            }

        }

        LoginLogDTO loginLogDTO = new LoginLogDTO();
        loginLogDTO.setLogin_id(loginDTO.getLogin_id());
        loginLogDTO.setLogin_norm_yn(login_norm_yn);
        loginLogDTO.setLogin_msg(login_msg);
        loginLogDTO.setIp_addr(request.getRemoteAddr() );
        loginLogDTO.setBrowser(request.getHeader("User-Agent"));
        loginLogDTO.setSession_id(request.getSession().getId());
        loginLogDTO.setCre_dt(loginDTO.getLogin_id());

        int loginSeq =  loginMapper.insertLoginLog(modelMapper.map(loginLogDTO, LoginLog.class));

        if(loginSeq > 0){
            if("Y".equals(login_norm_yn)){
                //정상로그인시 기존 실패 갯수 체크 로직 모두 제거
                loginMapper.updLoginRlseObjYN(loginDTO.getLogin_id());
            }
        }
        //초기화

        //로그인 예외조직
        int exceptionCnt = loginMapper.getExceptionIdCnt(loginDTO.getLogin_id());
        if(exceptionCnt > 0) {
            successYn = "success";
            smsCertSuccessYn ="Y";
        }

        loginDTO.setLogin_norm_yn(login_norm_yn);
        loginDTO.setMov_phon_num(callnum);
        loginDTO.setMov_phon_num_bf(callnum_bf);
        loginDTO.setLogin_msg(login_msg);
        loginDTO.setSuccess_yn(successYn);
        loginDTO.setLoginErrorCnt(loginErrorCnt+"");
        loginDTO.setSmsCertSuccessYn(smsCertSuccessYn);
        return loginDTO;
    }

    @Override
    public LoginDTO CertiSMSsend(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginDTO loginDTO  = (LoginDTO)session.getAttribute("loginSession");

        // 문자 발송 6자리 랜덤숫자발생
        String certi_num = Double.toString((Math.random() * 1000000 + 1)).substring(7, 13);

        SMSInfoDTO smsInfoDTO = new SMSInfoDTO();
        smsInfoDTO.setCerti_num(certi_num);
        smsInfoDTO.setLogin_id(loginDTO.getLogin_id());
        smsInfoDTO.setIp_addr(request.getRemoteAddr());
        smsInfoDTO.setBrowser(request.getHeader("User-Agent"));
        smsInfoDTO.setSession_id(request.getSession().getId());
        smsInfoDTO.setCo_cl_cd("T");

        if (loginMapper.selectCertiNum(modelMapper.map(smsInfoDTO, SMSInfo.class) ).equals("FAIL")) { //
            // 6자리 DB insert
            //초기화
            loginMapper.initLoginST(modelMapper.map(smsInfoDTO, SMSInfo.class));
            if (loginMapper.insertCertiSMS(modelMapper.map(smsInfoDTO, SMSInfo.class)) != 1) {
                log.info("SMS인증 오류");
            }else {
                // =============================
                // vo.setLogin_dt(userInfoService.getSMS_certi_seq(vo)); 날짜까지 포함
                // =============================
                String getSeq = loginMapper.getSMScertiSeq(modelMapper.map(smsInfoDTO, SMSInfo.class));
                if (!getSeq.equals("FAIL")) {
                    loginDTO.setSms_certi_seq(getSeq);
                }
            }
            String callnum = loginDTO.getMov_phon_num();
            String login_id = loginDTO.getLogin_id();

            String sendernum = "114"; //발신번호
            String callmsg = "[SKT T-GATE SMS 문자인증] ";

            String certinum = (String) loginMapper.selectCertiNum(modelMapper.map(smsInfoDTO, SMSInfo.class));

            callmsg += "[" + certinum + "] 정확하게 입력하여 주세요.";

            if (callnum.equals("FAIL")) {
                loginDTO.setSuccess_yn("callNumFail");
            } else if (certinum.equals("FAIL")) {
                request.setAttribute("successYn", "smsSendFail");
                loginDTO.setSuccess_yn("smsSendFail");
            } else {
                try {
                    SmsUtil.sendSms(callnum, login_id, sendernum, callmsg);
                } catch (Exception e) {
                    e.getMessage();
                }
                loginDTO.setSuccess_yn("smsSend");
            }


        }else{
            loginDTO.setSuccess_yn("ing");
        }

        return loginDTO;
    }

    @Override
    public Map<String, String> ConfirmSMS(SMSInfoDTO smsInfoDTO) {
        Map<String, String> returnMap = new HashMap<>();

        String successYn;
        String rtnUrl;
        // SMS 인증 확인
        if (smsInfoDTO.getCerti_num().equals(loginMapper.selectCertiNum(modelMapper.map(smsInfoDTO, SMSInfo.class)))){
            successYn ="success";
            rtnUrl = "login/smsCerti_result";
            // ******************************************
            // 로그인 성공시, 시간 업데이트
            // ******************************************
            int resultCount = loginMapper.uptLoginDt(modelMapper.map(smsInfoDTO, SMSInfo.class));
            String result;
            if (resultCount > 0) {
                result = "success";
            } else {
                result = "fail";
            }
            log.info(smsInfoDTO.getLogin_id() + " login Date update : " + result);

        }else{
            successYn = "fail";
            rtnUrl = "login/smsCerti";
        }

        //로그인 이후 user체크, 중복체크 및 비밀번호 변경 체크
        returnMap.put("rtnUrl", rtnUrl);
        returnMap.put("successYn", successYn);

        return returnMap;
    }

    @Override
    public Map<String, String> Recent3Month(LoginDTO loginDTO) {
        Map<String, String> returnMap = new HashMap<>();

        log.info("Recent3Month");

        String msg = null;
        String rtnUrl = null;
        String error_gubun = null;   //
        String popPwdChk = "N"; //비밀번호 변경 체크 로직

        log.info("loginDTO :" + loginDTO);
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        try{
            Optional<UserInfo> optionalUserInfo = Optional.ofNullable(loginMapper.getUserInfo(modelMapper.map(loginDTO, Login.class)));

            if(!optionalUserInfo.isPresent()){
                throw new BizException(ErrorCode.MEMBER_NOT_FOUND);
            }
            userInfoDTO = modelMapper.map(optionalUserInfo.get(), UserInfoDTO.class);

            log.info("userInfoDTO : " + userInfoDTO);

            if (!"00".equals(userInfoDTO.getMktg_org_lvl_cd())
                    && !"20".equals(userInfoDTO.getMktg_org_lvl_cd())
                    && !"30".equals(userInfoDTO.getMktg_org_lvl_cd())
                    && !"40".equals(userInfoDTO.getMktg_org_lvl_cd())) { //판매자만 체크

                if ("".equals(StringUtil.strNull(userInfoDTO.getPwd_upd_dt()))) { // 패스워드 변경일이 없을경우
                    // 비밀번호 변경
                    popPwdChk = "Y";

                } else { // 패스워드 변경일이 있을경우
                    //비밀번호 변경일 + 3개월
                    String pwd_upd_dt = DateUtil.getOffsetMonth(userInfoDTO.getPwd_upd_dt(), 3, "yyyyMMddhhmmss");

                    // 비밀번호 변경 후 3개월 경과되면 비밀번호 변경 팝업
                    if (DateUtil.getCompareDate(pwd_upd_dt.substring(0, 8), DateUtil.getCurrentTime().substring(0, 8)) == true) {
                        // 3달뒤 update 날짜
                        log.info("2비빌번호 변경대상 업데이트 대상");
                        // 비밀번호 변경
                        popPwdChk = "Y";
                    }
                }

                if("Y".equals(popPwdChk)){
                    rtnUrl = "login/chgPwd.jsp";
                }

            }

        }catch (Exception e){
            msg ="로그인 ID가 중복이 되었습니다.";
            error_gubun ="2";
            rtnUrl = "common/error/errorMovePage";
            returnMap.put("msg", msg);
            returnMap.put("gubun", error_gubun);
        }


        returnMap.put("rtnUrl", rtnUrl);
        returnMap.put("popPwdChk", popPwdChk);

        return returnMap;
    }



}

