package com.main36.pikcha.global.aop;

import com.main36.pikcha.domain.member.entity.Member;
import com.main36.pikcha.domain.member.service.MemberService;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import com.main36.pikcha.global.security.jwt.JwtParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

import static java.util.Objects.requireNonNull;

@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
@EnableAspectJAutoProxy
public class LoginAspect {
    private final JwtParser jwtParser;
    private final MemberService memberService;

    @Around("@annotation(com.main36.pikcha.global.aop.LoginUserEmail)")
    public Object getUserEmail(ProceedingJoinPoint joinPoint) throws Throwable {

        HttpServletRequest request = ((ServletRequestAttributes) requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        Object[] args = joinPoint.getArgs();
        String email = jwtParser.getLoginUserEmail(request);
        args[0] = email;

        return joinPoint.proceed(args);
    }

    @Around("@annotation(com.main36.pikcha.global.aop.LoginUser)")
    public Object getUser(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        Object[] args = joinPoint.getArgs();
        Member loginUser = memberService.getLoginMember(request);
        args[0] = loginUser;

        return joinPoint.proceed(args);
    }

}
