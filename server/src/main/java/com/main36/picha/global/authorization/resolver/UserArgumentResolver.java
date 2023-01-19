package com.main36.picha.global.authorization.resolver;

import com.main36.picha.domain.member.entity.Member;
import com.main36.picha.domain.member.service.MemberService;
import com.main36.picha.global.authorization.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@RequiredArgsConstructor
@Component
public class UserArgumentResolver implements HandlerMethodArgumentResolver {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        return parameter.getParameterAnnotation(ClientId.class) != null
                && parameter.getParameterType().equals(Long.class);

//        return isLoginUserAnnotation && isUserClass;
//        return parameter.getParameterType().equals(LoginDto.class);
    }

    @Override
    public Long resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws Exception {

        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

        return jwtTokenizer.getUserId(request);

        //Object getPrincipal(); // 주로 ID
        //Object getDetails(); // 사용자 상세정보

//
//        TokenPrincipalDto castedPrincipal = (TokenPrincipalDto) principal;
//        usernamePasswordAuthenticationToken.getPrincipal();
//        return castedPrincipal.getId();
    }
}
