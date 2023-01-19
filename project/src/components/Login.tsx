import React, { useState } from "react";
import styled from "styled-components";
import ButtonForm from "../components/Button";
import axios, { AxiosRequestConfig } from "axios";
import DaumPostcode from "react-daum-postcode";
import Ouaths from "../pages/Ouaths";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  LoginState,
  AuthToken,
  RefreshToken,
  LoggedUser,
} from "../recoil/state";

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
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
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
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
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
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
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
  const [rafresh, setRefresh] = useRecoilState(RefreshToken);
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
    }

    return axios
      .post(process.env.REACT_APP_DB_HOST + "/users/login", {
        username: loginemail,
        password: loginpassword,
      })
      .then((res) => {
        const { authorization, refreshtoken } = res.headers;
        if (res.status === 200) {
          axios.defaults.headers.common["authorization"] = authorization;
          axios.defaults.headers.common["refreshtoken"] = refreshtoken;
        console.log("로그인성공");
          setIslogin(true);
          setAuth(authorization);
          setRefresh(refreshtoken);
          setLoggedUser(loginemail);
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
    }
    if (!signemailErr && !signpasswordErr && !phonenumberErr) {
      return axios
        .post(process.env.REACT_APP_DB_HOST + "/users/signup", {
          email: signemail,
          password: signpassword,
          phoneNumber: phonenumber,
          address: address,
          username: username,
        },{
            withCredentials:true,
        },
        // {
        //     headers:{
        //         "Content-Type": "application.json",
        //     },
        // }
        )
        .then((res) => {
            console.log(res);
          if (res.status === 201) {
            console.log("회원가입 성공")
            // navigate("/login");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("이미 존재하는 회원입니다.");
        });
    }
  };

  const onClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // e.preventDefault();
    // return axios
    // .post("/users/logout", {
    //     email: ";;",
    // })
    // .then((res) => {
    //     if (res.status === 201) {
    //         setIslogin(false);
    //         setAuth(null);
    //         setRefresh(null);
    //         navigate("/login");
    //       }
    // })
    // .catch((err) => console.error(err));
  };

  const Loginhandler = () => {
    // axios
    // .post("/users/login", {
    //     username: loginemail,
    //     password: loginpassword,
    // })
    // .then((res) => {
    //     console.log(res)
    //     // navigate("/");
    // })
    // .catch((err)=>console.error(err))
    // setIslogin(!isLogin)
    // setAuth("어우")
    // setRefresh("리프")

    axios.defaults.headers.common["Authorization"] = "어스";
    axios.defaults.headers.common["Refresh"] = "리프";

    setIslogin(true);
    setAuth(loginemail);
    setRefresh(loginpassword);
    setLoggedUser(loginemail);

    // localStorage.setItem("userId", loginemail);
    // localStorage.setItem("authorizationToken(이메일)", loginemail );
    // localStorage.setItem("refreshToken(패스워드)", loginpassword);
    navigate("/");
  };

  const Signuphandler = () => {
    axios
      .post("/users/signup", {
        email: signemail,
        password: signpassword,
        phoneNumber: phonenumber,
        address: address,
        username: username,
      })
      .then((res) => {
        console.log(res);
        console.log("리스폰스: ", res);
        console.log("리스폰스헤더", res.headers);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const GoogleHandler = () => {
    axios
      // .post("/login/oauth2/code/google", {
      //     username: loginemail,
      //     password: loginpassword,
      // })
      .get("/oauth2/authorization/google", {
        // headers: {
        //     "Content-Type" : "application/x-www-form-urlencoded"
        // }
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const googlelogin = () => {
    // window.location.href =
    //   "http://pikcha36.o-r.kr:8080/oauth2/authorization/google";
    // const query = window.location.search;
    // console.log("이게무야2", query);
    // const param = new URLSearchParams(query);
    // console.log(param);
    // navigate("/");
  };

  //회원가입은
  //상태가 200으로 오면

  // 일반 로그인 상태 관리 로직
  // recoil과 sessionStorage 이용. recoil에는 토큰, 로그인 상태값이 들어갈것임
  // 이메일, 패스워드를 서버에 보냄
  //로그인 성공 (res.status = 200) => res.headers.AT, res.headers.RT에서 토큰값을 받아와 sessionStorage에 각각 저장 및 sessionStorage에 userid저장
  //마찬가지로 recoil의 상태에도 토큰 및 로그인상태 저장
  //성공 시 usenavigate를 이용해 / (메인페이지일듯?) 으로 이동

  //페이지를 새로고침 할때 마다 session에 userid값이 존재하는지 확인, 확인하면 recoil에 로그인 상태 및 세션에 있는 토큰 상태 저장
  //이를 통해 로그인 헤더상태 유지

  //다른 페이지에서 로그인 되어야 가능한 행위들을 할 때 세션에 있는 토큰값들을 받아와서 실어 보낸 뒤 응답 받음
  //멘토님이 주신 코드를 보면 axios 공통헤더에 토큰을 넣어둠

  //찾아볼것) 리코일은 새로고침해도 상태가 유지되는가? 다른 프로젝트는 리코일만 써서 루트페이지에서 로그인상태유지.
  //백단에서 로그인 상태정보를 관리해주나? 어떤 프로젝트는 res.data.initiallogin 값을 쓰긴함. 이것을 쓰는걸수도
  //localstorage는 브라우저가 꺼져도 상태를 유지해주는데 세션을 쓸지 이것을 쓸지

  //로그아웃 시 recoil의 로그인상태, 토큰값 초기화 및 세션의 id 및 토큰값도 초기화
  //서버의 /logout에 요청을 보내서 로그아웃을 알림
  //비로그인시 헤더로변경
  //메인페이지로 usenavigate 하면 될듯

  //구글이 문제..
  //client ID를 백단것을 써야하나?

  //수정할 것들
  //1. 주소 검색 모달창
  //2. 회원가입 버튼을 누르거나 로그인 버튼을 누를 시 input내용삭제? 아니면 그냥 새로고침으로 퉁치기 => 경고문으로 대체 및 네비게이트
  //3. 브라우저 창 크기가 줄어도 css 안망가지게 (헤더나 푸터 침범 등) =>  최소 크기를 설정 또는 position fix 등 css 만지기
  //4. 주소 입력 컴포넌트 분리하고싶다..
  //5. porps로 상태를 내리면 랜더링이 어떻게 되는가? 찾아보기
  //6. 유효성검사 더 신중히 닉네임은 어떤식으로 검사? 중복 닉네임 가능 등?
  //  => 중복된 계정이거나 그러면 res.status가 다르게 올테니 경고창을 다르게 표시 및 새로고침

  //현재 로직
  // 로그인 성공 시 로그인상태, token을 recoil 및 localStorage에 저장
  // import로 recoilState 및 recoilValue 등을 선언 후 값 사용.
  // const islogin = useRecoilValue(LoginState)
  // const authToken = useRecoilValue(AuthToken)
  // const refreshToken = useRecoilValue(RefreshToken)

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
        {/* <GButton onClick={GoogleHandler}>묵은지</GButton>
        <GButton onClick={googlelogin}>묵은지</GButton>

        <Ouaths /> */}
        <TextStyle color="#6154F8" fontSize="45px" fontweight="bold">
          로그인
        </TextStyle>
        <CustomPadding padding="30px 0px 0px 0px"></CustomPadding>
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
          backgroundcolor="var(--purple-300)"
          border="0px white"
          color="white"
          fontsize="24px"
          hoverbackgroundcolor="var(--purple-400)"
          text="로그인"
        //   onClick={Loginhandler}
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
          backgroundcolor="var(--purple-300)"
          border="0px white"
          color="white"
          fontsize="24px"
          hoverbackgroundcolor="var(--purple-400)"
          text="회원가입"
          // onClick={Signuphandler}
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
          backgroundcolor="var(--purple-300)"
          border="1px solid white"
          color="white"
          fontsize="24px"
          hoverbackgroundcolor="white"
          hovercolor="var(--purple-300)"
          text="로그인"
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
          backgroundcolor="var(--purple-300)"
          border="1px solid white"
          color="white"
          fontsize="24px"
          hoverbackgroundcolor="white"
          hovercolor="var(--purple-300)"
          text="회원가입"
          onClick={onClickBtn}
        ></ButtonForm>
      </Rightoverlay>
    </Wrapper>
  );
};

export default Login;
