import React, { useState } from "react";
import styled from "styled-components";
import ButtonForm from "./Button";
import axios from "../utils/axiosinstance";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState, AuthToken, LoggedUser } from "../recoil/state";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
interface ButtonProps {
  backgroundcolor?: string;
  color?: string;
  hoverbackgroundcolor?: string;
  hovercolor?: string;
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
  width: 30%;
  height: 70%;
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
  width: 30%;
  height: 70%;
  border-radius: ${(props) =>
    props.overlay ? "30px 0px 0px 30px" : "0px 30px 30px 0px"};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
`;
const Rightoverlay = styled.div<OverlayProps>`
  width: 30%;
  height: 70%;
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
  width: 30%;
  height: 70%;
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
const OauthBtn = styled.button<ButtonProps>`
  width: 50px;
  height: 50px;
  border: 0px;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 30px;
  color: ${(props) => props.color};
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
  &:hover {
    background-color: ${(props) => props.hoverbackgroundcolor};
  }
`;
const InputStyle = styled.input`
  width: 75%;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid var(--black-400);
  padding-top: 10px;
  font-size: 15px;
  margin-bottom: 5px;
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
  width: 75%;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
`;

const CustomPadding = styled.div<PaddingProps>`
  padding: ${(props) => props.padding};
`;
const Logo = styled.img`
  width: 200px;
  height: 50px;
  font-size: 40px;
  margin-top: 15px;
  cursor: pointer;
`;
const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  right: 1.6em;
  bottom: 7em;
  color: var(--black-700);
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

const SocitalLoginContinaer = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-around;
`;

const LoginInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 130px;

  span {
    width: 70%;
    text-align: left;
  }
`;

const LoginHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    // if (loginemailErr || loginpasswordErr) {
    //   alert("로그인 양식을 지켜주세요.");
    //   return;
    // }

    // return axios
    //   .post(process.env.REACT_APP_DB_HOST + "/login", {
    //     username: loginemail,
    //     password: loginpassword,
    //   })
    //   .then((res) => {
    //     const { memberId, accessToken } = res.data.data;
    //     if (res.status === 200) {
    //       console.log("로그인성공");
    //       setIslogin(true);
    //       setAuth(accessToken);
    //       setLoggedUser(loginemail);
    //       localStorage.setItem("loginStatus", "true ");
    //       localStorage.setItem("Authorization", `${accessToken}`);
    //       localStorage.setItem("memberId", memberId);
    //       axios.defaults.headers.common["Authorization"] = accessToken;
    //       navigate(-1);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("회원이 아닙니다.");
    //   });
    loginHandle();
  };

  const onClickSignin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // if (signemailErr || signpasswordErr || phonenumberErr) {
    //   alert("회원가입 양식을 제대로 채워주세요.");
    //   return;
    // }
    // if (!signemailErr && !signpasswordErr && !phonenumberErr) {
    //   return axios
    //     .post(
    //       process.env.REACT_APP_DB_HOST + "/signup",
    //       {
    //         email: signemail,
    //         password: signpassword,
    //         phoneNumber: phonenumber,
    //         address: address,
    //         username: username,
    //       },
    //       {
    //         withCredentials: true,
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.status === 201) {
    //         console.log("회원가입 성공");
    //         window.location.replace("/login")
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       alert("이미 존재하는 회원입니다.");
    //     });
    // }
    singHandle();
  };

  const loginHandle = () => {
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
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("회원이 아닙니다.");
      });
  };

  const singHandle = () => {
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
            window.location.replace("/login");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("이미 존재하는 회원입니다.");
        });
    }
  };

  // const onKeyPress = (e:
  //   KeyboardEvent<HTMLInputElement>
  //   ) => {
  //   e.preventDefault();

  //   if(overlays === false){
  //     if (loginemailErr || loginpasswordErr) {
  //       alert("로그인 양식을 지켜주세요.");
  //       return;
  //     }

  //     return axios
  //       .post(process.env.REACT_APP_DB_HOST + "/login", {
  //         username: loginemail,
  //         password: loginpassword,
  //       })
  //       .then((res) => {
  //         const { memberId, accessToken } = res.data.data;
  //         if (res.status === 200) {
  //           console.log("로그인성공");
  //           setIslogin(true);
  //           setAuth(accessToken);
  //           setLoggedUser(loginemail);
  //           localStorage.setItem("loginStatus", "true ");
  //           localStorage.setItem("Authorization", `${accessToken}`);
  //           localStorage.setItem("memberId", memberId);
  //           axios.defaults.headers.common["Authorization"] = accessToken;
  //           navigate(-1);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         alert("회원이 아닙니다.");
  //       });
  //   }

  //   if(overlays === true){
  //     if (signemailErr || signpasswordErr || phonenumberErr) {
  //       alert("회원가입 양식을 제대로 채워주세요.");
  //       return;
  //     }
  //     if (!signemailErr && !signpasswordErr && !phonenumberErr) {
  //       return axios
  //         .post(
  //           process.env.REACT_APP_DB_HOST + "/signup",
  //           {
  //             email: signemail,
  //             password: signpassword,
  //             phoneNumber: phonenumber,
  //             address: address,
  //             username: username,
  //           },
  //           {
  //             withCredentials: true,
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res);
  //           if (res.status === 201) {
  //             console.log("회원가입 성공");
  //             window.location.replace("/login")
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           alert("이미 존재하는 회원입니다.");
  //         });
  //     }
  //   }

  // }

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
          <CloseButton onClick={handleAddress.clickInput}>
            <AiOutlineCloseCircle />
          </CloseButton>
        </>
      )}

      <Logincontainer overlay={overlays}>
        <LoginHeaderContainer>
          <TextStyle color="#6154F8" fontSize="23px" fontweight="bold">
            로그인
          </TextStyle>
          <TextStyle color="#6154F8" fontSize="15px" fontweight="bold">
            SNS 계정으로 로그인
          </TextStyle>
          <SocitalLoginContinaer>
            <OauthBtn
              color="blue"
              backgroundcolor="var(--black-300)"
              hoverbackgroundcolor="var(--black-500)"
              onClick={googleLogin}
            >
              G
            </OauthBtn>
            <OauthBtn
              color="black"
              backgroundcolor="#FFE90A"
              hoverbackgroundcolor="#FFD240"
              onClick={kakaoLogin}
            >
              K
            </OauthBtn>
          </SocitalLoginContinaer>
        </LoginHeaderContainer>
        <LoginInputContainer>
          <InputStyle
            placeholder="이메일을 입력하세요."
            onChange={handleLoginEmailChange}
          ></InputStyle>
          {loginemailErr && loginemail.length !== 0 ? (
            <ErrMsg color="red" fontSize="12px" fontweight="normal">
              올바른 이메일 형식이 아닙니다.
            </ErrMsg>
          ) : null}
          <InputStyle
            placeholder="비밀번호를 입력하세요."
            onChange={handleLoginPasswordChange}
            type="password"
          ></InputStyle>
        </LoginInputContainer>
        {/* {loginpasswordErr && loginpassword.length !== 0 ? (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            비밀번호를 8자이상 입력해주세요.
          </ErrMsg>
        ) : null} */}
        <ButtonForm
          width="90px"
          height="35px"
          fontsize="15px"
          text="로그인"
          type="violet"
          onClick={onClickLogin}
        ></ButtonForm>
      </Logincontainer>
      <Signincontainer overlay={overlays}>
        <TextStyle color="#6154F8" fontSize="23px" fontweight="bold">
          회원가입
        </TextStyle>
        <TextStyle color="#6154F8" fontSize="15px" fontweight="bold">
          SNS 계정으로 가입하기
        </TextStyle>
        <SocitalLoginContinaer>
          <OauthBtn
            color="blue"
            backgroundcolor="var(--black-300)"
            hoverbackgroundcolor="var(--black-500)"
            onClick={googleLogin}
          >
            G
          </OauthBtn>
          <OauthBtn
            color="black"
            backgroundcolor="#FFE90A"
            hoverbackgroundcolor="#FFD240"
            onClick={kakaoLogin}
          >
            K
          </OauthBtn>
        </SocitalLoginContinaer>
        <InputStyle
          placeholder="이메일"
          onChange={handleSignEmailChange}
        ></InputStyle>
        {signemailErr && signemail.length !== 0 ? (
          <ErrMsg color="red" fontSize="12px" fontweight="normal">
            올바른 이메일 형식이 아닙니다.
          </ErrMsg>
        ) : null}
        <InputStyle
          placeholder="비밀번호"
          onChange={handleSignPasswordChange}
          type="password"
        ></InputStyle>
        {signpasswordErr && signpassword.length !== 0 ? (
          <ErrMsg color="red" fontSize="12px" fontweight="normal">
            비밀번호를 8자이상 입력해주세요.
          </ErrMsg>
        ) : null}
        <InputStyle
          placeholder="비밀번호확인"
          onChange={handlePasswordConfirm}
          type="password"
        ></InputStyle>
        {/* {passwordConfirm === signpassword ? null : (
          <ErrMsg color="red" fontSize="16px" fontweight="normal">
            비밀번호가 다릅니다.
          </ErrMsg>
        )} */}
        <InputStyle
          placeholder="전화번호(-를 포함해서 입력해주세요)"
          onChange={handlePhoneChange}
        ></InputStyle>
        {phonenumberErr && phonenumber.length !== 0 ? (
          <ErrMsg color="red" fontSize="12px" fontweight="normal">
            올바른 전화번호 형식이 아닙니다.
          </ErrMsg>
        ) : null}
        <InputStyle
          placeholder="주소"
          value={address}
          onClick={handleAddress.clickInput}
        ></InputStyle>
        <InputStyle
          placeholder="닉네임"
          onChange={handleUsernameChange}
        ></InputStyle>
        {/* <TextStyle color="red" fontSize='16px' fontweight='normal'>3글자 이상 입력해주세요.</TextStyle> */}
        <ButtonForm
          width="90px"
          height="35px"
          fontsize="15px"
          text="회원가입"
          type="violet"
          onClick={onClickSignin}
          margin="50px 0 0 0"
        ></ButtonForm>
      </Signincontainer>
      <Leftoverlay overlay={overlays}>
        <TextStyle color="white" fontSize="20px" fontweight="normal">
          welcome to the
        </TextStyle>
        <Logo
          src={process.env.PUBLIC_URL + "/logo-white.png"}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <TextStyle color="white" fontSize="20px" fontweight="normal">
          <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
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
        <TextStyle color="white" fontSize="16px" fontweight="bold">
          이미 회원이시라면?
        </TextStyle>
        <CustomPadding padding="20px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="90px"
          height="35px"
          fontsize="15px"
          text="로그인"
          type="white"
          onClick={onClickBtn}
          margin="32px 0 0 0"
        ></ButtonForm>
      </Leftoverlay>
      <Rightoverlay overlay={overlays}>
        <TextStyle color="white" fontSize="20px" fontweight="normal">
          welcome to the
        </TextStyle>
        <Logo
          src={process.env.PUBLIC_URL + "/logo-white.png"}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <CustomPadding padding="70px 0px 0px 0px"></CustomPadding>
        <TextStyle color="white" fontSize="20px" fontweight="normal">
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
        <TextStyle color="white" fontSize="16px" fontweight="bold">
          아직 회원이 아니신가요?
        </TextStyle>
        <CustomPadding padding="50px 0px 0px 0px"></CustomPadding>
        <ButtonForm
          width="90px"
          height="35px"
          fontsize="15px"
          type="white"
          text="회원가입"
          onClick={onClickBtn}
        ></ButtonForm>
      </Rightoverlay>
    </Wrapper>
  );
};

export default Login;
