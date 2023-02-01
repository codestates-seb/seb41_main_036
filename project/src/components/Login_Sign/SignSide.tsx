import React, { useState } from "react";
import ButtonForm from "../Button";
import axios from "../../utils/axiosinstance";
import DaumPostcode from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { setOverlay } from "../../recoil/setOverlay";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as s from "./LoginSignStyle";

const Login = () => {
  const [overlays, setOverlays] = useRecoilState<boolean>(setOverlay);
  const [signemail, setSignEmail] = useState<string>("");
  const [signpassword, setSignPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [signemailErr, setSignEmailErr] = useState<boolean>(true);
  const [signpasswordErr, setSignPasswordErr] = useState<boolean>(true);
  const [phonenumberErr, setPhonenumberErr] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");

  const handleSignEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    setSignEmailErr(!EMAIL_REGEX.test(e.target.value));
    setSignEmail(e.target.value);
  };

  const handleSignPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignPasswordErr(!(e.target.value.length >= 8));
    setSignPassword(e.target.value);
  };

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PHONE_REGEX = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;
    setPhonenumberErr(!PHONE_REGEX.test(e.target.value));
    setPhonenumber(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAddress = {
    clickInput: () => {
      setOpenPostcode(!openPostcode);
    },
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const onClickSignin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signHandle();
  };

  const signHandle = () => {
    if (signemailErr || signpasswordErr || phonenumberErr) {
      alert("회원가입 양식을 제대로 채워주세요.");
      return;
    }
    if (!signemailErr && !signpasswordErr && !phonenumberErr) {
      return axios
        .post(
          "/signup",
          {
            email: signemail,
            password: signpassword,
            phoneNumber: phonenumber,
            address: address,
            username: username,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setOverlays(false);
            console.log(res.data);
            window.location.replace("/login");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("이미 존재하는 회원입니다.");
        });
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (overlays === true) {
        signHandle();
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
    <s.Wrapper>
      {openPostcode && (
        <>
          <DaumPostcode
            style={{
              display: "block",
              // position: "absolute",
              width: "500px",
              height: "500px",
              padding: "0px",
              zIndex: 10,
            }}
            onComplete={handleAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
          <s.CloseButton onClick={handleAddress.clickInput}>
            <AiOutlineCloseCircle />
          </s.CloseButton>
        </>
      )}
      <s.Signincontainer overlay={overlays}>
        <s.TextStyle color="#6154F8" fontSize="23px" fontweight="bold">
          회원가입
        </s.TextStyle>
        <s.TextStyle color="#6154F8" fontSize="15px" fontweight="bold">
          SNS 계정으로 가입하기
        </s.TextStyle>
        <s.SocitalLoginContinaer>
          <s.OauthBtn
            color="blue"
            backgroundcolor="var(--black-300)"
            hoverbackgroundcolor="var(--black-500)"
            onClick={googleLogin}
          >
            G
          </s.OauthBtn>
          <s.OauthBtn
            color="black"
            backgroundcolor="#FFE90A"
            hoverbackgroundcolor="#FFD240"
            onClick={kakaoLogin}
          >
            K
          </s.OauthBtn>
        </s.SocitalLoginContinaer>
        <s.InputStyle
          placeholder="이메일"
          onChange={handleSignEmailChange}
          onKeyDown={onPressEnter}
        ></s.InputStyle>
        {signemailErr && signemail.length !== 0 ? (
          <s.ErrMsg color="red" fontSize="12px" fontweight="normal">
            올바른 이메일 형식이 아닙니다.
          </s.ErrMsg>
        ) : null}
        <s.InputStyle
          placeholder="비밀번호"
          onChange={handleSignPasswordChange}
          onKeyDown={onPressEnter}
          type="password"
        ></s.InputStyle>
        {signpasswordErr && signpassword.length !== 0 ? (
          <s.ErrMsg color="red" fontSize="12px" fontweight="normal">
            비밀번호를 8자이상 입력해주세요.
          </s.ErrMsg>
        ) : null}
        <s.InputStyle
          placeholder="비밀번호확인"
          onChange={handlePasswordConfirm}
          onKeyDown={onPressEnter}
          type="password"
        ></s.InputStyle>
        {passwordConfirm === signpassword ? null : (
          <s.ErrMsg color="red" fontSize="12px" fontweight="normal">
            비밀번호가 다릅니다.
          </s.ErrMsg>
        )}
        <s.InputStyle
          placeholder="전화번호(-를 포함해서 입력해주세요)"
          onChange={handlePhoneChange}
          onKeyDown={onPressEnter}
        ></s.InputStyle>
        {phonenumberErr && phonenumber.length !== 0 ? (
          <s.ErrMsg color="red" fontSize="12px" fontweight="normal">
            올바른 전화번호 형식이 아닙니다.
          </s.ErrMsg>
        ) : null}
        <s.InputStyle
          placeholder="주소"
          value={address}
          onClick={handleAddress.clickInput}
          onKeyDown={handleAddress.clickInput}
        ></s.InputStyle>
        <s.InputStyle
          placeholder="닉네임"
          onChange={handleUsernameChange}
          onKeyDown={onPressEnter}
        ></s.InputStyle>
        <ButtonForm
          width="90px"
          height="35px"
          fontsize="15px"
          text="회원가입"
          type="violet"
          onClick={onClickSignin}
          margin="50px 0 0 0"
        ></ButtonForm>
      </s.Signincontainer>
    </s.Wrapper>
  );
};

export default Login;
