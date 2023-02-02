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
    private final MemberService memberService;
    private final JwtGenerator jwtGenerator;
    private final CookieUtils cookieUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        Member member = memberService.findMemberByOauth2Id(authentication.getName());

        String refreshToken = jwtGenerator.generateRefreshToken(member.getMemberId().toString());
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        cookieUtils.setCookieInHeader(response, refreshToken);

        redirect(request, response, member.getEmail(), member.getMemberId(), member.getRoles());

        log.info("# Oauth2 Login successfully!");
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          Long memberId,
                          List<String> authorities) throws IOException {

        String accessToken = jwtGenerator.generateAccessToken(username, authorities);
        String uri = createURI(request, accessToken, memberId).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(HttpServletRequest request, String accessToken, Long memberId) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", accessToken);
        queryParams.add("id", memberId.toString());
//        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
//                .host("localhost")
//                .port("3000")
//                .path("/oauth")
                .host("pikcha36.o-r.kr") // 배포 후 사용
                .path("/oauth") // 배포 후 사용
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}