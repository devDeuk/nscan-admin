package com.sktel.nscan.domain.login.controller;

import com.sktel.nscan.common.utils.StringUtil;
import com.sktel.nscan.domain.login.dto.LoginDTO;
import com.sktel.nscan.domain.login.dto.SMSInfoDTO;
import com.sktel.nscan.port.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * packageName    : com.sktel.nscan.domain.login.controller
 * fileName       : LoginController
 * author         : ksd83
 * date           : 2022-06-22
 * description    : 로그인 관련 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-22        ksd83       최초 생성
 */
@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value="/login")
public class LoginController {

    private final LoginService loginService;

    /**
     * 로그인 페이지
     * @return
     */
    @GetMapping("")
    public String login(){

        return "redirect:lab/index";
    }

    /**
     * 2차 인증 창
     * @return
     */
    @PostMapping("/certiSMS")
    public ModelAndView CertiSMS(HttpServletRequest request, @RequestParam String login_id, @RequestParam String scrt_num) throws Exception{

        // 세션 생성 후, 세션에 값 저장
        HttpSession session = request.getSession(true);
        session.removeAttribute("loginSession");


        ModelAndView mv = new ModelAndView();
        LoginDTO loginDto = new LoginDTO();
        String captchYN = StringUtil.strNull(request.getParameter("captchYN"),"Y");



        //1.파라미터 정의
        loginDto.setLogin_id(login_id.toUpperCase());
        loginDto.setScrt_num(scrt_num);
        loginDto.setCaptch_yn(captchYN);

        //2.비즈니스 로직
        loginDto = loginService.CertiSMS(request, loginDto);
        mv.addObject("loginDto",loginDto);

        if("Y".equals(loginDto.getSmsCertSuccessYn())){
            mv.addObject("successYn","successPass");
            mv.setViewName("login/smsCerti_result");
        }else{
            mv.setViewName("login/smsCerti");
        }
        //3.session저장
        session.setAttribute("loginSession",loginDto);
        return mv;
    }


    /**
     * 2차인증 SMS발송
     * @return 
     */
    @PostMapping("/certiSMSsend")
    public ModelAndView CertiSMSsend(HttpServletRequest request, HttpServletResponse response){
        ModelAndView mv = new ModelAndView();
        LoginDTO loginDto = new LoginDTO();
        HttpSession session = request.getSession(true);

        loginDto = loginService.CertiSMSsend(request);
        session.setAttribute("loginSession",loginDto);
        mv.addObject("loginDto",loginDto);
        mv.setViewName("login/smsCerti");

        return mv;
    }
    /**
     * 2차인증 SMS인증 확인
     * @return
     */
    @PostMapping("/confirmSMS")
    public ModelAndView ConfirmSMS(HttpServletRequest request, HttpServletResponse response){
        //3개월간 비밀번호 변경 안했을 경우 변경창 팝업 : chgPwd.jsp
        //성공시 // smsCerti_result.jsp
        //실패시 // login/smsCerti
        HttpSession session = request.getSession(true);
        ModelAndView mv = new ModelAndView();
        LoginDTO loginDto = (LoginDTO) session.getAttribute("loginSession");


        // 고객 인증 번호 입력 값
        String certiNum = StringUtil.strNull((String) request.getParameter("certiNum"), "");

        if (certiNum.equals("") || certiNum.equals(null)) {
            loginDto.setSuccess_yn("reInput");
            mv.addObject("loginDto",loginDto);
            mv.setViewName("login/smsCerti");
            return mv;
        }

        String login_id = loginDto.getLogin_id();
        String co_cl_cd = "T";
        String sms_certi_seq = loginDto.getSms_certi_seq();

        SMSInfoDTO smsInfoDTO = new SMSInfoDTO();
        smsInfoDTO.setCerti_num(certiNum);
        smsInfoDTO.setLogin_id(login_id);
        smsInfoDTO.setCo_cl_cd(co_cl_cd);
        smsInfoDTO.setSms_certi_seq(sms_certi_seq);

        String rtnUrl = null;
        String successYn = null;
        String msg = null;
        String gubun = null;
        String popPwdChk = null;

        /* 로그인 정상여부확인 */
        Map<String, String> confirmSMS = loginService.ConfirmSMS(smsInfoDTO);
        //로그인 이후 user체크, 중복체크 및 비밀번호 변경 체크

        rtnUrl = confirmSMS.get("rtnUrl");
        successYn =  confirmSMS.get("successYn");

        log.info("rtnUrl : " + rtnUrl);
        log.info("successYn : " + successYn);
        if("success".equals(successYn)){
            log.info("3개월 비밀번호 체크");
            //로그인 성공 후 3개월 비밀번호 변경하지 않은 판매자 변경페이지 전달
            Map<String, String> recent3Month = loginService.Recent3Month(loginDto);
            popPwdChk =  recent3Month.get("popPwdChk");
            gubun = recent3Month.get("gubun");

            //로그인 중복이거나, 비밀번호 변경 체크 로직이 있을경우 추가적으로 데이터
            if("Y".equals(popPwdChk) || "".equals(gubun) ) {
                msg = recent3Month.get("msg");
                rtnUrl = recent3Month.get("rtnUrl");
            }
        }
        //세션 재정의
        loginDto.setSuccess_yn(successYn);
        session.setAttribute("loginSession",loginDto);
        mv.addObject("loginDto",loginDto);

        mv.addObject("msg", msg);
        mv.addObject("gubun", gubun);
        mv.addObject("rtnUrl", rtnUrl);
        mv.addObject("popPwdChk", popPwdChk);
        mv.addObject("successYn", successYn);


        mv.setViewName(rtnUrl);

        return mv;
    }


    /**
     * 대리점 등록 페이지
     * @return
     */
    @GetMapping("/rgstAgntReq")
    public String rgstAgntReq() {
        return "login/rgstAgntReq";
    }

    /**
     * 대리점 코드 찾기
     * @return
     */
    @GetMapping("/rgstAgntPop")
    public String rgstAgntPop() {
        return "login/rgstAgntPop";
    }


    /**
     * 쇼핑몰 등록 팝업
     * @return
     */
    @GetMapping("/saleSiteSrchPop")
    public String saleSiteSrchPop() {
        return "login/saleSiteSrchPop";
    }

    /**
     * 판매자 ID 찾기
     * @return
     */
    @GetMapping("/selrFindId")
    public String selrFindId() {
        return "login/selrFindId";
    }

    /**
     * 판매자 비밀번호 초기화
     * @return
     */
    @GetMapping("/selrFindPwd")
    public String selrFindPwd() {
        return "login/selrFindPwd";
    }



    @RequestMapping( value = "/loginAction" , method = {RequestMethod.POST, RequestMethod.GET})
    public RedirectView loginAction(HttpServletRequest request, HttpServletResponse response){

        //if(true) throw new BizException(ErrorCode.MEMBER_NOT_FOUND);

        //return "main/sendDash";
        return new RedirectView("/main/dashboard/usr");
    }



}
