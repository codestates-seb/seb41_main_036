package com.main36.pikcha.global.security.oauth;


import com.google.gson.Gson;
import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.response.DataResponseDto;
import com.main36.pikcha.global.security.dto.LoginResponseDto;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.utils.CookieUtils;
import com.main36.pikcha.global.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.List;

import static com.main36.pikcha.global.security.filter.JwtVerificationFilter.BEARER_PREFIX;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final CustomAuthorityUtils customAuthorityUtils;

    private final MemberService memberService;

    private final JwtGenerator jwtGenerator;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        Member member = memberService.findMemberByOauth2Id(authentication.getName());
//        log.info("member ={}", member);
//        String accessToken = BEARER_PREFIX + jwtGenerator.generateAccessToken(member.getEmail(), member.getRoles());
//        log.info("accessToken ={}", accessToken);
//        String refreshToken = jwtGenerator.generateRefreshToken(member.getMemberId().toString());
//        log.info("refreshToken ={}", refreshToken);
//        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//        ResponseCookie cookie = CookieUtils.getResponseCookie(refreshToken);
//        response.setHeader("Set-Cookie", String.valueOf(cookie));
//        response.setHeader("Authorization", BEARER_PREFIX + accessToken);
//        Gson gson = new Gson();
//        LoginResponseDto of = LoginResponseDto.ofMember(member, BEARER_PREFIX + accessToken);
//        String s = gson.toJson(new DataResponseDto<>(of));
//        log.info("of ={}", of);
//        log.info("s ={}", s);
//        response.getWriter().write(gson.toJson(new DataResponseDto<>(of), DataResponseDto.class));

        redirect(request, response, member.getEmail(), member.getMemberId(),member.getRoles());
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          Long memberId,
                          List<String> authorities) throws IOException {
//
        String accessToken = jwtGenerator.generateAccessToken(username, authorities);
        String refreshToken = jwtGenerator.generateRefreshToken(username);
        String uri = createURI(request, accessToken, memberId).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(HttpServletRequest request, String accessToken, Long memberId) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", accessToken);
        queryParams.add("id", memberId.toString());
//        queryParams.add("refresh_token", refreshToken);
        String serverName = request.getServerName();
        log.info("serverName = {}", serverName);
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port("3000")
                .path("/oauth")
//                .host("serverName") // 배포 후 사용
//                .path("/oauth") // 배포 후 사용
                .queryParams(queryParams)
                .build()
                .toUri();

//        http://localhost:3000/oauth2/redirect/"+token
        // 리다이렉트에는 바디를 확인 할 수 없음
        // -> 컨트롤러를 활용
        // -> 쿼리파람으로
    }
}