package com.sktel.nscan.domain.login.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName    : com.sktel.nscan.domain.login.dto
 * fileName       : LoginLogDTO
 * author         : ksd83
 * date           : 2022-06-24
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-24        ksd83       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
public class LoginLogDTO {
    private String login_seq;
    private String login_id;
    private String login_norm_yn;
    private String login_msg;
    private String login_rlse_obj_yn;
    private String ip_addr;
    private String browser;
    private String session_id;
    private String cre_dt;
    private String cre_nm;
    private String upd_dt;
    private String upd_nm;

    private String han_nm;
    private String error_cnt;
    private String last_err_dtm;
}
