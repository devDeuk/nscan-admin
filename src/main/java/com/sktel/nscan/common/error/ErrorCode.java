package com.sktel.nscan.common.error;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
public enum ErrorCode {
    SQL_CONN_ERROR("DB001", "Database 접속 에러가 발생했습니다."),
    //Bad_request
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST.toString(), "Invalid parameter included"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND.toString(), "Resource not exists"),
    REQ_ARGU_NOT_VALIE(BAD_REQUEST.toString(),"MethodArgumentNotValidException"),

    MEMBER_NOT_FOUND("BIZ001", "해당 유저 정보를 찾을 수 없습니다"),
    UNAUTHORIZED_MEMBER("BIZ002", "인증이 실패된 유저입니다."),
    REFRESH_TOKEN_NOT_FOUND("BIZ003", "로그아웃 된 사용자입니다"),
    DUPLICATE_RESOURCE("BIZ004", "데이터가 이미 존재합니다"),
    SESSESION_EXPIRED("BIZ005", "세션이 만료되었습니다. 다시 로그인 하십시오."),

    SYSTEM_CHECKING("SYS001", "시스템 점검중입니다."),
    SYSTEM_ERROR_OCCURRED("SYS002", "시스템 에러가 발생하였습니다."),

    ;

    private final String errorCode;
    private final String msg;

    ErrorCode(String errorCode, String msg){
        this.errorCode = errorCode;
        this.msg = msg;
    }
}