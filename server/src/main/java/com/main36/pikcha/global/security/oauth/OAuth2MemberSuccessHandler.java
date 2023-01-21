//package com.main36.picha.global.authorization.oauth;
//
//
//import com.main36.picha.domain.refreshToken.repository.RefreshTokenRepository;
//import com.main36.picha.global.authorization.jwt.JwtProvider;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Collection;
//import java.util.List;
//
//@Slf4j
//@RequiredArgsConstructor
//public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//
//    private final JwtProvider jwtProvider;
//    private final RefreshTokenRepository refreshTokenRepository;
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
//        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
//        String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
////        for (Map.Entry<String, Object> entry : oAuth2User.getAttributes().entrySet()) {
////            log.info("key ={}" + " /  " + "value = {}", entry.getKey(), entry.getValue());
////        }
//        Collection<? extends GrantedAuthority> authorities1 = oAuth2User.getAuthorities();
//
//
//        List<String> authorities =
//                authorityUtils.createRoles(authMember.getEmail());
//        boolean oauthMember = memberService.isPresentOauthMember(email);
//        if (!oauthMember) {
//            savedMember(name, email, picture);
//        }
//        redirect(request, response, email, authorities);
//
//
//    }
//}
//
//    private void savedMember(String name, String email, String picture) {
//        MemberDto.Oauth oauthMemberDto = new MemberDto.Oauth(name, email, picture);
//        Member member = mapper.oauthMemberDtoToMember(oauthMemberDto);
//        memberService.createOauth2Member(member);
//    }
//
//    private void redirect(HttpServletRequest request,
//                          HttpServletResponse response,
//                          String username,
//                          List<String> authorities) throws IOException {
//
//        String accessToken = delegateAccessToken(username, authorities);
//        String refreshToken = delegateRefreshToken(username);
//        String uri = createURI(request, accessToken, refreshToken).toString();
//        getRedirectStrategy().sendRedirect(request, response, uri);
//    }
//
//    private String delegateAccessToken(String username, List<String> authorities) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", username);
//        claims.put("roles", authorities);
//
//        var subject = username;
//
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String accessToken = jwtTokenizer.generatedAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        return accessToken;
//    }
//
//    private String delegateRefreshToken(String username) {
//        String subject = username;
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        return refreshToken;
//    }
//
//    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
////        queryParams.add("refresh_token", refreshToken);
//
//        String serverName = request.getServerName();
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host(serverName)
//                .port(8080)
//                .path("/users/token")
//                .queryParams(queryParams)
//                .build()
//                .toUri();
////    }
//    }
