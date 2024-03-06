package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : LoginLog
 * author         : ksd83
 * date           : 2022-06-27
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-27        ksd83       최초 생성
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@Alias("LoginLog")
public class LoginLog implements Serializable {

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
