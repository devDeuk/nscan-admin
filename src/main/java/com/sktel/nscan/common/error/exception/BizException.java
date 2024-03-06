package com.sktel.nscan.common.error.exception;

import com.sktel.nscan.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class BizException extends RuntimeException {
    ErrorCode errorCode;

    public BizException(ErrorCode errorCode) {
        super(errorCode.getMsg());
        this.errorCode = errorCode;

    }
}
