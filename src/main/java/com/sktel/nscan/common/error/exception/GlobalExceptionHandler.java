package com.sktel.nscan.common.error.exception;

import com.sktel.nscan.common.dto.ResponseDTO;
import com.sktel.nscan.common.error.ErrorResponse;
import com.sktel.nscan.common.error.dto.ErrorResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Slf4j
//@RestControllerAdvice(annotations = RestController.class)
@RestControllerAdvice//프로젝트 전역에서 발생하는 모든 예외 잡아줌
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    public ResponseEntity<Object> handleExceptionInternal(HttpStatus httpStatus, String errorCode, String msg){
        return new ResponseEntity<>(new ErrorResponseDTO(httpStatus, new ErrorResponse(errorCode,msg)),httpStatus);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handle(Exception ex,
                                         HttpServletRequest request, HttpServletResponse response) {
        System.out.println(Arrays.toString(ex.getStackTrace()));

        if (ex instanceof NullPointerException) {
            return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR, "NullPointerException",ex.getMessage());
        }else if(ex instanceof IllegalArgumentException){
            return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR, "IllegalArgumentException",ex.getMessage());
        }else if(ex instanceof IndexOutOfBoundsException){
            return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR, "IndexOutOfBoundsException",ex.getMessage());
        }
        return handleExceptionInternal(HttpStatus.INTERNAL_SERVER_ERROR, "DEFAULT",ex.getMessage());
    }

    @ExceptionHandler(value= BizException.class)
    public ResponseEntity<Object> handleBizEx(final BizException e){
        return new ResponseEntity<>(new ResponseDTO<>(null,e.errorCode),HttpStatus.OK);
    }
}
