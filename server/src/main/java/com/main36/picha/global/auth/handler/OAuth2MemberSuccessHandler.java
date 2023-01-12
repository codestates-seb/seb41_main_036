package com.main36.picha.global.auth.handler;


import com.main36.picha.domain.member.dto.OauthMemberDto;
import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.mapper.MemberMapper;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.auth.jwt.JwtTokenizer;
import com.main36.picha.global.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        savedMember(name, email, picture);


    }

    private void savedMember(String name, String email, String picture) {
        OauthMemberDto oauthMemberDto = new OauthMemberDto(name, email, picture);
        Member member = mapper.oauthMemberDtoToMember(oauthMemberDto);
        memberService.createMember(member);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username,
                          List<String> authorities) throws IOException {

        delegateAccessToken(username, authorities);
        delegateRefreshToken(username);
        createURI(accessToken, refreshToken).toString();

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
        Date expiration = jwtTokenizer.get
    }




}
