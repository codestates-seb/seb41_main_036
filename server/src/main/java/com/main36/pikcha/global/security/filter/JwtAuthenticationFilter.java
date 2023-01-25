package com.main36.pikcha.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.main36.pikcha.global.security.dto.LoginDto;
import com.main36.pikcha.global.security.dto.LoginResponseDto;
import com.main36.pikcha.global.security.dto.TokenDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.security.userdetails.AuthMember;
import com.main36.pikcha.global.response.DataResponseDto;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;


@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtGenerator jwtGenerator;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(JwtGenerator jwtGenerator, AuthenticationManager authenticationManager) {
        this.jwtGenerator = jwtGenerator;
        this.authenticationManager = authenticationManager;
    }

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

        // Detail 문제로 -> 삽입 x
        AuthMember authMember = (AuthMember) authResult.getPrincipal();
        TokenDto tokenDto = jwtGenerator.generateTokenDto(authMember);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기

        // response 토큰 설정
        ResponseCookie cookie = getResponseCookie(refreshToken);
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        response.setHeader("Set-Cookie", cookie.toString());
        response.setHeader("Authorization", BEARER_PREFIX + accessToken);

//        setCookie(response, refreshToken);

        Gson gson = new Gson();
        LoginResponseDto of = LoginResponseDto.of(authMember, BEARER_PREFIX + accessToken);
        response.getWriter().write(gson.toJson(new DataResponseDto<>(of), DataResponseDto.class));
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);


        //tokenProvider.refreshTokenSetHeader(refreshToken,response); // RefreshToken Header response 생성

    }

    private static ResponseCookie getResponseCookie(String refreshToken) {

        return ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(3 * 24 * 60 * 60) // 쿠키 유효기간 설정 (3일)
                .path("/")
                .secure(false)
                .httpOnly(true)
                .sameSite("None")
                .build();
    }

//    private static void setCookie(HttpServletResponse response, String refreshToken) {
//
//        Cookie cookie = new Cookie("name", refreshToken);
//        cookie.setMaxAge(3 * 24 * 60 * 60);
//        cookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false); // 문제점!
//        response.addCookie(cookie);
//    }

    public String getCookie(HttpServletRequest req){
        Cookie[] cookies=req.getCookies(); // 모든 쿠키 가져오기
        if(cookies!=null){
            for (Cookie c : cookies) {
                String name = c.getName(); // 쿠키 이름 가져오기
                String value = c.getValue(); // 쿠키 값 가져오기
                if (name.equals("refreshToken")) {
                    return value;
                }
            }
        }
        return null;
    }

}
