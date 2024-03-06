package com.sktel.nscan.common.dto;

import com.sktel.nscan.common.error.ErrorCode;
import com.sktel.nscan.common.error.ErrorResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class ResponseDTO<T> {
    private T data;
    private final int status = HttpStatus.OK.value();                       //상태 코드
    private LocalDateTime timestamp;                                        //발생 시각
    private ErrorResponse errorResponse;

    public ResponseDTO(T data, String errorCode, String errorMsg) {
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.errorResponse = new ErrorResponse(errorCode,errorMsg);
    }

    public ResponseDTO(T data) {
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.errorResponse = null;
    }

    public ResponseDTO(T data, ErrorCode errorCode) {
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.errorResponse = new ErrorResponse(errorCode);
    }
}
