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
        String accessToken = jwtGenerator.generateAccessToken(member.getEmail(), member.getRoles());
        String refreshToken = jwtGenerator.generateRefreshToken(member.getEmail());

        ResponseCookie cookie = CookieUtils.getResponseCookie(refreshToken);

        Gson gson = new Gson();
        LoginResponseDto of = LoginResponseDto.ofMember(member, BEARER_PREFIX + accessToken);
        String s = gson.toJson(new DataResponseDto<>(of));
        log.info("of ={}", of);
        log.info("s ={}", s);
        response.getWriter().write(gson.toJson(new DataResponseDto<>(of), DataResponseDto.class));

        redirect(request, response, member.getEmail(), member.getRoles());
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          List<String> authorities) throws IOException {
//
//        String accessToken = jwtGenerator.generateAccessToken(username, authorities);
//        String refreshToken = jwtGenerator.generateRefreshToken(username);
        String uri = createURI(request).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(HttpServletRequest request) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
        String serverName = request.getServerName();
        log.info("serverName = {}", serverName);
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(serverName)
                .port(3000)
//                .path("")
//                .path("/token/oauth2")
//                .queryParams(queryParams)
                .build()
                .toUri();

    }
}