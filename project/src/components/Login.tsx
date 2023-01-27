import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonForm from "./Button";
import Axios from "axios";
import axios from "../utils/axiosinstance";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState, AuthToken, LoggedUser } from "../recoil/state";


interface TextProps {
  fontSize: string;
  color: string;
  fontweight: string;
}
interface PaddingProps {
  padding: string;
}
interface OverlayProps {
  overlay: boolean;
}
const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const Signincontainer = styled.div<OverlayProps>`
  width: 40%;
  height: 100%;
  border-radius: ${(props) =>
    props.overlay ? "30px 0px 0px 30px" : "0px 30px 30px 0px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
`;
const Logincontainer = styled.div<OverlayProps>`
  width: 40%;
  height: 100%;
  border-radius: ${(props) =>
    props.overlay ? "30px 0px 0px 30px" : "0px 30px 30px 0px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
`;
const Rightoverlay = styled.div<OverlayProps>`
  width: 40%;
  height: 100%;
  border-radius: ${(props) =>
    props.overlay ? "0px 30px 30px 0px" : "30px 0px 0px 30px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-300);
  transition: all 0.5s;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
`;
const Leftoverlay = styled.div<OverlayProps>`
  width: 40%;
  height: 100%;
  border-radius: ${(props) =>
    props.overlay ? "0px 30px 30px 0px" : "30px 0px 0px 30px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-300);
  transition: all 0.5s;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
`;
const GButton = styled.button`
  width: 50px;
  height: 50px;
  border: 0px;
  background-color: var(--purple-300);
  border-radius: 30px;
  color: white;
  font-size: 20px;
  &:hover {
    background-color: var(--purple-400);
  }
`;
const InputStyle = styled.input`
  width: 62%;
  height: 45px;
  border: 0px;
  border-bottom: 1px solid var(--black-400);
  padding-top: 10px;
  padding-left: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--black-600);
  }
`;
const TextStyle = styled.div<TextProps>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
  padding-top: 10px;
`;
const ErrMsg = styled.div<TextProps>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
  padding-top: 10px;
  align-self: flex-start;
  padding-left: 20%;
`;

const CustomPadding = styled.div<PaddingProps>`
  padding: ${(props) => props.padding};
`;
const LogoLogo = styled.div`
  width: 330px;
  height: 80px;
  border: 1px solid black;
  background-color: white;
  color: black;
  font-size: 50px;
`;
const CloseButton = styled.button`
  z-index: 100;
  width: 80px;
  height: 50px;
  margin-top: 51%;
  border-radius: 20px;
  background-color: white;
  font-size: 25px;
  color: black;
  position: absolute;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const Login = () => {
  const [overlays, setOverlays] = useState<boolean>(false);
  const [loginemail, setLoginEmail] = useState<string>("");
  const [loginpassword, setLoginPassword] = useState<string>("");

  const [signemail, setSignEmail] = useState<string>("");
  const [signpassword, setSignPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);

  const [loginemailErr, setLoginEmailErr] = useState<boolean>(true);
  const [loginpasswordErr, setLoginPasswordErr] = useState<boolean>(true);

  const [signemailErr, setSignEmailErr] = useState<boolean>(true);
  const [signpasswordErr, setSignPasswordErr] = useState<boolean>(true);
  const [phonenumberErr, setPhonenumberErr] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");

  const [isLogin, setIslogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState(AuthToken);
  const [loggedUser, setLoggedUser] = useRecoilState(LoggedUser);

  const navigate = useNavigate();

  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOverlays(!overlays);
  };
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

  const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (loginemailErr || loginpasswordErr) {
      alert("로그인 양식을 지켜주세요.");
      return;
    }

    return axios
      .post(process.env.REACT_APP_DB_HOST + "/login", {
        username: loginemail,
        password: loginpassword,
      })
      .then((res) => {
        const { memberId, accessToken } = res.data.data;
        if (res.status === 200) {
          console.log("로그인성공");
          setIslogin(true);
          setAuth(accessToken);
          setLoggedUser(loginemail);
          localStorage.setItem("loginStatus", "true ");
          localStorage.setItem("Authorization", `${accessToken}`);
          localStorage.setItem("memberId", memberId);
          axios.defaults.headers.common["Authorization"] = accessToken;
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("회원이 아닙니다.");
      });
  };
  const onClickSignin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (signemailErr || signpasswordErr || phonenumberErr) {
      alert("회원가입 양식을 제대로 채워주세요.");
      return;
    }
    if (!signemailErr && !signpasswordErr && !phonenumberErr) {
      return axios
        .post(
          process.env.REACT_APP_DB_HOST + "/signup",
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
          console.log(res);
          if (res.status === 201) {
            console.log("회원가입 성공");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("이미 존재하는 회원입니다.");
        });
    }
  };

  const googleLogin = () => {
    window.location.href =
      "http://pikcha36.o-r.kr:8080/oauth2/authorization/google";
  };
  const kakaoLogin = () => {
    window.location.href =
      "http://pikcha36.o-r.kr:8080/oauth2/authorization/kakao";
  };

  return (
    <Wrapper>
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
          <CloseButton onClick={handleAddress.clickInput}>닫기</CloseButton>
        </>
      )}

      <Logincontainer overlay={overlays}>
        <TextStyle color="#6154F8" fontSize="45px" fontweight="bold">
          로그인
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>

        <button onClick={kakaoLogin}>카카</button>
        <button onClick={googleLogin}>구글</button>
        <GButton>G</GButton>

        <TextStyle color="#6154F8" fontSize="22px" fontweight="bold">
          SNS 계정으로 로그인
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>
        <InputStyle
          placeholder="이메일"
          onChange={handleLoginEmailChange}
        ></InputStyle>
        {loginemailErr && loginemail.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            올바른 이메일 형식이 아닙니다.
          </ErrMsg>
        ) : (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        )}
        <InputStyle
          placeholder="비밀번호"
          onChange={handleLoginPasswordChange}
          type="password"
        ></InputStyle>
        {loginpasswordErr && loginpassword.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            비밀번호를 8자이상 입력해주세요.
          </ErrMsg>
        ) : (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        )}
        <CustomPadding padding="50px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="180px"
          height="60px"
          fontsize="24px"
          text="로그인"
          type="violet"
          onClick={onClickLogin}
        ></ButtonForm>
        <CustomPadding padding="20px 0px 0px 0px"></CustomPadding>
        <TextStyle color="#6154F8" fontSize="22px" fontweight="bold">
          계정정보를 잊으셨나요?
        </TextStyle>
      </Logincontainer>
      <Signincontainer overlay={overlays}>
        <TextStyle color="#6154F8" fontSize="45px" fontweight="bold">
          회원가입
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>
        <GButton>G</GButton>
        <TextStyle color="#6154F8" fontSize="22px" fontweight="bold">
          SNS 계정으로 가입하기
        </TextStyle>
        <InputStyle
          placeholder="이메일"
          onChange={handleSignEmailChange}
        ></InputStyle>
        {signemailErr && signemail.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            올바른 이메일 형식이 아닙니다.
          </ErrMsg>
        ) : (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        )}
        <InputStyle
          placeholder="비밀번호"
          onChange={handleSignPasswordChange}
          type="password"
        ></InputStyle>
        {signpasswordErr && signpassword.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            비밀번호를 8자이상 입력해주세요.
          </ErrMsg>
        ) : (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        )}
        <InputStyle
          placeholder="비밀번호확인"
          onChange={handlePasswordConfirm}
          type="password"
        ></InputStyle>
        {passwordConfirm === signpassword ? (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        ) : (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            비밀번호가 다릅니다.
          </ErrMsg>
        )}
        <InputStyle
          placeholder="전화번호(-를 포함해서 입력해주세요)"
          onChange={handlePhoneChange}
        ></InputStyle>
        {phonenumberErr && phonenumber.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            올바른 전화번호 형식이 아닙니다.
          </ErrMsg>
        ) : (
          <TextStyle color="white" fontSize="16px" fontweight="normal">
            |
          </TextStyle>
        )}
        <InputStyle
          placeholder="주소"
          value={address}
          onClick={handleAddress.clickInput}
        ></InputStyle>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          |
        </TextStyle>
        <InputStyle
          placeholder="닉네임"
          onChange={handleUsernameChange}
        ></InputStyle>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          |
        </TextStyle>
        {/* <TextStyle color="red" fontSize='16px' fontweight='normal'>3글자 이상 입력해주세요.</TextStyle> */}
        <CustomPadding padding="50px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="180px"
          height="60px"
          fontsize="24px"
          text="회원가입"
          type="violet"
          onClick={onClickSignin}
        ></ButtonForm>
        <CustomPadding padding="20px 0px 0px 0px"></CustomPadding>
        <TextStyle color="#6154F8" fontSize="22px" fontweight="bold">
          계정정보를 잊으셨나요?
        </TextStyle>
      </Signincontainer>
      <Leftoverlay overlay={overlays}>
        <TextStyle color="white" fontSize="25px" fontweight="normal">
          welcome to the
        </TextStyle>
        <LogoLogo>pickcha</LogoLogo>
        <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="30px" fontweight="normal">
          사진찍기 가장 좋은 장소는 어디일까요?
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          pickcha에서 명소부터 포스트까지
        </TextStyle>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          다양한 정보를 통해 나만의 사진을 찍어보세요.
        </TextStyle>
        <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="18px" fontweight="bold">
          이미 회원이시라면?
        </TextStyle>
        <CustomPadding padding="20px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="180px"
          height="60px"
          fontsize="24px"
          text="로그인"
          type="white"
          onClick={onClickBtn}
        ></ButtonForm>
      </Leftoverlay>
      <Rightoverlay overlay={overlays}>
        <TextStyle color="white" fontSize="25px" fontweight="normal">
          welcome to the
        </TextStyle>
        <LogoLogo>pickcha</LogoLogo>
        <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="30px" fontweight="normal">
          사진찍기 가장 좋은 장소는 어디일까요?
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          pickcha에서 명소부터 포스트까지
        </TextStyle>
        <TextStyle color="white" fontSize="18px" fontweight="normal">
          다양한 정보를 통해 나만의 사진을 찍어보세요.
        </TextStyle>
        <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="18px" fontweight="bold">
          아직 회원이 아니신가요?
        </TextStyle>
        <CustomPadding padding="20px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="180px"
          height="60px"
          fontsize="24px"
          type="white"
          text="회원가입"
          onClick={onClickBtn}
        ></ButtonForm>
      </Rightoverlay>
    </Wrapper>
  );
};

export default Login;
