package com.main36.picha.global.authorization.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.main36.picha.global.authorization.dto.LoginDto;
import com.main36.picha.global.authorization.dto.LoginResponseDto;
import com.main36.picha.global.authorization.dto.TokenDto;
import com.main36.picha.global.authorization.userdetails.AuthMember;
import com.main36.picha.global.response.DataResponseDto;
import com.main36.picha.global.utils.ErrorResponder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;

@Slf4j

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
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
        TokenDto tokenDto = tokenProvider.generateTokenDto(authMember);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기

        ResponseCookie cookie = getResponseCookie(refreshToken);

        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//        response.setCharacterEncoding("utf-8");
        response.setHeader("Set-Cookie", cookie.toString());
        response.setHeader("Authorization", "Bearer " + accessToken);
        Gson gson = new Gson();
        LoginResponseDto of = LoginResponseDto.of(authMember);
        response.getWriter().write(gson.toJson(new DataResponseDto<>(of), DataResponseDto.class));
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);



        //tokenProvider.refreshTokenSetHeader(refreshToken,response); // RefreshToken Header response 생성

      // login 완료시 Response 응답 만들기

//        // 로그인 성공시 Refresh Token Redis 저장 ( key = Refresh Token / value = Access Token )
//        int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
//        redisDao.setValues(refreshToken,accessToken, Duration.ofMinutes(refreshTokenExpirationMinutes));


    }

    private static ResponseCookie getResponseCookie(String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(3 * 24 * 60 * 60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        return cookie;
    }

}
