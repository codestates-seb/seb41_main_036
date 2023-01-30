import React, { useState, useEffect } from "react";
import ButtonForm from "../Button";
import axios from "../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  LoginState,
  AuthToken,
  LoggedUser,
  MemberId,
} from "../../recoil/state";
import { setOverlay } from "../../recoil/setOverlay";
import * as l from "./LoginSignStyle";

const LoginSide = () => {
  const [overlays, setOverlays] = useRecoilState<boolean>(setOverlay);
  const [loginemail, setLoginEmail] = useState<string>("");
  const [loginpassword, setLoginPassword] = useState<string>("");
  const [loginemailErr, setLoginEmailErr] = useState<boolean>(true);
  const [loginpasswordErr, setLoginPasswordErr] = useState<boolean>(true);
  const [isLogin, setIslogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState(AuthToken);
  const [loggedUser, setLoggedUser] = useRecoilState(LoggedUser);
  const [memberId, setMenberId] = useRecoilState(MemberId);

  const navigate = useNavigate();
  const handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    setLoginEmailErr(!EMAIL_REGEX.test(e.target.value));
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginPasswordErr(!(e.target.value.length >= 8));
    setLoginPassword(e.target.value);
  };

  const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    loginHandle();
  };

  const loginHandle = () => {
    if (loginemailErr || loginpasswordErr) {
      alert("로그인 양식을 지켜주세요.");
      return;
    }

    return axios.post(
      process.env.REACT_APP_DB_HOST + "/login",
      {
        username: loginemail,
        password: loginpassword,
      },
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        const { memberId, accessToken } = res.data.data;
        if (res.status === 200) {
          console.log("로그인성공");
          setIslogin(true);
          setAuth(accessToken);
          setLoggedUser(loginemail);
          setMenberId(memberId);
          setOverlays(false);
          localStorage.setItem("loginStatus", "true ");
          localStorage.setItem("Authorization", `${accessToken}`);
          localStorage.setItem("memberId", memberId);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("회원이 아닙니다.");
      });
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (overlays === false) {
        loginHandle();
      }
    }
  };

  const googleLogin = () => {
    window.location.href =
      "https://pikcha36.o-r.kr:8080/oauth2/authorization/google";
  };
  const kakaoLogin = () => {
    window.location.href =
      "https://pikcha36.o-r.kr:8080/oauth2/authorization/kakao";
  };

  return (
    <l.Logincontainer overlay={overlays}>
      <l.LoginHeaderContainer>
        <l.TextStyle color="#6154F8" fontSize="23px" fontweight="bold">
          로그인
        </l.TextStyle>
        <l.TextStyle color="#6154F8" fontSize="15px" fontweight="bold">
          SNS 계정으로 로그인
        </l.TextStyle>
        <l.SocitalLoginContinaer>
          <l.OauthBtn
            color="blue"
            backgroundcolor="var(--black-300)"
            hoverbackgroundcolor="var(--black-500)"
            onClick={googleLogin}
          >
            G
          </l.OauthBtn>
          <l.OauthBtn
            color="black"
            backgroundcolor="#FFE90A"
            hoverbackgroundcolor="#FFD240"
            onClick={kakaoLogin}
          >
            K
          </l.OauthBtn>
        </l.SocitalLoginContinaer>
      </l.LoginHeaderContainer>
      <l.LoginInputContainer>
        <l.InputStyle
          placeholder="이메일을 입력하세요."
          onChange={handleLoginEmailChange}
          onKeyDown={onPressEnter}
        ></l.InputStyle>
        {loginemailErr && loginemail.length !== 0 ? (
          <l.ErrMsg color="red" fontSize="12px" fontweight="normal">
            올바른 이메일 형식이 아닙니다.
          </l.ErrMsg>
        ) : null}
        <l.InputStyle
          placeholder="비밀번호를 입력하세요."
          onChange={handleLoginPasswordChange}
          type="password"
          onKeyDown={onPressEnter}
        ></l.InputStyle>
      </l.LoginInputContainer>
      <ButtonForm
        width="90px"
        height="35px"
        fontsize="15px"
        text="로그인"
        type="violet"
        onClick={onClickLogin}
      ></ButtonForm>
    </l.Logincontainer>
  );
};

export default LoginSide;
