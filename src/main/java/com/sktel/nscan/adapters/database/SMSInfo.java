package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : SMSInfo
 * author         : ksd83
 * date           : 2022-06-28
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-28        ksd83       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@Alias("SMSInfo")
public class SMSInfo {

    private String login_id;
    private String certi_num;
    private String co_cl_cd;
    private String scrt_num;
    private String mov_phon_num;
    private String callnum;
    private String login_dt;
    private String sms_certi_seq;
    private String ip_addr;		//로그인 IP 주소추가
    private String browser;		//로그인 브라우저추가
    private String session_id;		//로그인 세션_ID추가
    private String scrt_num_sha256;

    //기변 sms인증 추가
    private String sms_ser_num;	//SMS일련번호
    private String audit_id;		//최종변경자ID
    private String audit_dtm;		//최종변경일시
    private String appl_form_num;	//신청서번호
    private String svc_num;		//서비스번호
    private String svc_mgmt_num;	//서비스관리번호
    private String auth_num;		//인증번호
    private String auth_rslt_cd;	//인증결과코드
    private String conn_ip_addr;	//접속IP주소
}
