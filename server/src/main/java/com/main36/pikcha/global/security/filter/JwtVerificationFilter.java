package com.main36.pikcha.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main36.pikcha.global.security.jwt.JwtGenerator;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.response.ErrorResponse;
import com.main36.pikcha.global.security.jwt.JwtParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@Slf4j
@Validated
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String BEARER_TYPE = "bearer";
    private final JwtGenerator jwtGenerator;
    private final JwtParser jwtParser;

    private static final List<String> EXCLUDE_URL =
            List.of("/",
                    "/h2",
                    "/signup",
                    "/login",
                    "/logout",
                    "/attractions/main/rank",
                    "/attractions/maps",
                    "/oauth2/authorization/google",
                    "/oauth2/authorization/kakao",
                    "/stomp-websocket"
            );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        boolean result = EXCLUDE_URL.stream().anyMatch(exclude -> exclude.equalsIgnoreCase(request.getServletPath()));
        log.info("# Exclude url check = {}, result check = {}", request.getServletPath(), result);

        return result;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = getAccessToken(request);
            log.info("==== jwt ===== {}", jwt);
            if (StringUtils.hasText(jwt) && jwtParser.verifyAccessToken(jwt)) {
                Authentication authentication = jwtGenerator.getAuthentication(jwt);
                log.info("# Token verification success !");
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

    private String getAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }
}