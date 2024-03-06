package com.sktel.nscan.adapters.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * packageName    : com.sktel.nscan.adapters.database
 * fileName       : Login
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
@ToString
@NoArgsConstructor
@Alias("Login")
public class Login implements Serializable {
    private String login_id;
    private String scrt_num;
    private String scrt_num_sha256;
    private String scrt_num_sha1;
    private String mov_phon_num;
    private String mov_phon_num_bf;
    private String login_norm_yn;
    private String login_msg;
    private String success_yn;
    private String captch_yn;
    private String sms_certi_seq;
    private String co_cl_cd;
    private String smsCertSuccessYn;
    private String loginErrorCnt;
}
