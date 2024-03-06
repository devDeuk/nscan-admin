package com.sktel.nscan.domain.login.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * packageName    : com.sktel.nscan.domain.login.dto
 * fileName       : LoginDTO
 * author         : ksd83
 * date           : 2022-06-24
 * description    : LoginDTO
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-06-24        ksd83       최초 생성
 */
@Setter
@Getter
@NoArgsConstructor
@ToString
public class LoginDTO implements Serializable {

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
