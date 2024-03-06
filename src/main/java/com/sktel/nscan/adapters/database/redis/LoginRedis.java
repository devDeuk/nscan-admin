package com.sktel.nscan.adapters.database.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

/**
 * packageName    : com.sktel.nscan.adapters.database.redis
 * fileName       : LoginRedis
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@RedisHash(value = "LoginRedis", timeToLive = (60L * 60L * 24L * 7L))
public class LoginRedis  {

    @Id
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
}
