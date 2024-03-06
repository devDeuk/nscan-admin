package com.sktel.nscan.common.error;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {
    private final String errorCode;                     //에러 코드
    private final String message;                   //에러 메시지

    public ErrorResponse(String errCode, String message) {
        this.errorCode = errCode;
        this.message = message;
    }

    public ErrorResponse(com.sktel.nscan.common.error.ErrorCode errorCode){
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMsg();
    }
}