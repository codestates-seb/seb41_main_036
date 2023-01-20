package com.main36.picha.global.authorization.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main36.picha.global.exception.BusinessLogicException;
import com.main36.picha.global.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String BEARER_TYPE = "bearer";
    private final JwtProvider jwtProvider;


    // 인증에서 제외할 url
    private static final List<String> EXCLUDE_URL =
            List.of("/",
                    "/h2",
                    "/signup",
                    "/login",
                    "/attractions",
                    "/home",
                    "posts",
                    "/oauth2/authorization/google"
            );

    /* 실제 필터링 로직은 doFilterInternal 에서 수행
     * JWT 토큰의 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할
     * 가입/로그인/재발급을 제외한 Request 요청은 모두 이 필터를 거치게 됨
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            // 헤더에서 AccessToken 토큰 꺼내오기
            String jwt = resolveToken(request);

            // 토큰 검증을 통과하면 다음 필터 진행
            if (StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
                // 토큰으로부터 Authentication 객체를 만듬
                Authentication authentication = jwtProvider.getAuthentication(jwt);

                log.info("# Token verification success !");

                // SecurityContext 에 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (RuntimeException e) {

            if (e instanceof BusinessLogicException) {
                ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(ErrorResponse.of(((BusinessLogicException) e).getExceptionCode()));
                response.getWriter().write(json);
                response.setStatus(((BusinessLogicException) e).getExceptionCode().getStatus());
            }
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }

    // OncePerRequestFilter의 shouldNotFilter(); 오버라이딩함
    // EXCLUDE_URL과 동일한 요청이들어 왔을 경우, 현재 필터를 진행하지 않고 다음 필터를 진행
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        boolean result = EXCLUDE_URL.stream().anyMatch(exclude -> exclude.equalsIgnoreCase(request.getServletPath()));
        log.info("# Exclude url check = {}, result check = {}", request.getServletPath(), result);
        return result;
    }

}