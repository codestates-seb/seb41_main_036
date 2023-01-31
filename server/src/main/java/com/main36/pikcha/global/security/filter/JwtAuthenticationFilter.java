package com.main36.pikcha.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.main36.pikcha.global.security.dto.LoginDto;
import com.main36.pikcha.global.security.dto.LoginResponseDto;
import com.main36.pikcha.global.security.dto.TokenDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.userdetails.AuthMember;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.utils.CookieUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;


@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private final JwtGenerator jwtGenerator;
    private final AuthenticationManager authenticationManager;

    private final CookieUtils cookieUtils;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // ServletInputSteam을 LoginDto 클래스 객체로 역직렬화 (즉, JSON 객체꺼냄)
        log.info("# attemptAuthentication : loginDto.getEmail={}, login.getPassword={}", loginDto.getUsername(), loginDto.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        AuthMember authMember = (AuthMember) authResult.getPrincipal();
        TokenDto tokenDto = jwtGenerator.generateTokenDto(authMember);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기
        log.info("=========successfulAuth {}========", refreshToken);
        content(response);

        cookieUtils.setCookieInHeader(response, refreshToken);

        // 응답 바디 설정
        Gson gson = new Gson();
        LoginResponseDto of = LoginResponseDto.ofAuthMember(authMember, BEARER_PREFIX + accessToken);
        response.getWriter().write(gson.toJson(new DataResponseDto<>(of), DataResponseDto.class));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private void content(HttpServletResponse response) {
        // #1
//        response.setContentType("text/plain");
//        response.setCharacterEncoding("utf-8");

        // #2
        // response.setHeader("Content-type", "text/plain;charset=utf-8"); // 한글이 깨질 수 있으므로 utf-8로 설정

        // #3
         response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);

    }
}
