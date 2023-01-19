package com.main36.picha.global.utils;

import com.google.gson.Gson;
import com.main36.picha.global.authorization.dto.LoginResponseDto;
import com.main36.picha.global.authorization.userdetails.AuthMember;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

}