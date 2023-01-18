package com.main36.picha.global.auth.handler;


import com.main36.picha.domain.member.dto.OauthMemberDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.mapper.MemberMapper;
import com.main36.picha.domain.member.repository.MemberRepository;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final MemberMapper mapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();

        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
        List<String> authorities = authorityUtils.createRoles(email);

        savedMember(name, email, picture);
        redirect(request, response, email, authorities);

    }

    private void savedMember(String name, String email, String picture) {
        OauthMemberDto oauthMemberDto = new OauthMemberDto(name, email, picture);
        Member member = mapper.oauthMemberDtoToMember(oauthMemberDto);
        memberService.createOauth2Member(member);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          List<String> authorities) throws IOException {

        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);
        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generatedAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(8080)
//                .port(80)
                .path("/receive-token.html")
//                .path("/token")
                .queryParams(queryParams)
                .build()
                .toUri();


    }
}
