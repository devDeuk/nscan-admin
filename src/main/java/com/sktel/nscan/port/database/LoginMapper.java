package com.sktel.nscan.port.database;

import com.sktel.nscan.adapters.database.Login;
import com.sktel.nscan.adapters.database.LoginLog;
import com.sktel.nscan.adapters.database.SMSInfo;
import com.sktel.nscan.adapters.database.UserInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * packageName    : com.sktel.nscan.port.database
 * fileName       : LoginMapper
 * author         : ksd83
 * date           : 2024-03-06
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-03-06        ksd83       최초 생성
 */
@Mapper
public interface LoginMapper {
    String selectMovPhonNum(Login login);

    int getLoginErrorCnt(Login login);

    Object selectCertiNum(SMSInfo smsInfo);

    int insertCertiSMS(SMSInfo smsInfo);

    String getSMScertiSeq(SMSInfo smsInfo);

    void initLoginST(SMSInfo smsInfo);

    int uptLoginDt(SMSInfo smsInfo);

    UserInfo getUserInfo(Login login);

    int insertLoginLog(LoginLog loginLog);

    int getExceptionIdCnt(String login_id);

    void updLoginRlseObjYN(String login_id);
}
