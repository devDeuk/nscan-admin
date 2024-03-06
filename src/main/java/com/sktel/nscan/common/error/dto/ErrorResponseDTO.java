package com.sktel.nscan.common.error.dto;

import com.sktel.nscan.common.error.ErrorResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class ErrorResponseDTO {
    private int status;                             //상태 코드
    private LocalDateTime timestamp;                //발생 시각
    private ErrorResponse errorResponse;

    public ErrorResponseDTO(HttpStatus status, ErrorResponse error) {
        this.status = status.value();
        this.timestamp = LocalDateTime.now();
        this.errorResponse = error;
    }
}
