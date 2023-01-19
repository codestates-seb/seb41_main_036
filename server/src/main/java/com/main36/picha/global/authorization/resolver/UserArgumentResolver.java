package com.main36.picha.global.authorization.resolver;

import com.main36.picha.global.authorization.dto.LoginDto;
import com.main36.picha.global.authorization.jwt.JwtTokenizer;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

@Component
public class UserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        return parameter.getParameterAnnotation(LoginUser.class) != null
                && parameter.getParameterType().equals(Long.class);

//        return isLoginUserAnnotation && isUserClass;
//        return parameter.getParameterType().equals(LoginDto.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws Exception {

        HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        return httpServletRequest.getHeader("User-Agent");
//        String token = JwtTokenizer.getUsername(httpServletRequest);
//        JwtUtil.validateToken(token);
//
//        String userId = JwtUtil.getPayload(token);
//        String ipAddress = httpServletRequest.getRemoteAddr();
//
//        return new UserDto(userId, ipAddress);
    }
}
