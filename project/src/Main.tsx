import styled from 'styled-components';
import KakaoMap from './components/KakaoMap';
import Place from "./pages/Place";
import Post from "./pages/Post";
import axios from 'axios';

import {useRecoilState} from "recoil"
import {useRecoilValue} from "recoil"
import { LoginState, AuthToken, RefreshToken} from "./recoil/state"

const Header = styled.div`
  width: 100%;
  background-color: pink;
  height: 157px;
`;

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
`;

const Footer = styled.div`
  width: 100%;
  background-color: skyblue;
  height: 157px;
`;


function Main() {
  
  const islogin = useRecoilValue(LoginState)
  const authToken = useRecoilValue(AuthToken)
  const refreshToken = useRecoilValue(RefreshToken)



  const testBtn = () => {

    console.log("리코일로그인상태: ",islogin)
    console.log("리코일 어스토큰: ",authToken)
    console.log("리코일 리프토큰: ",refreshToken)
    console.log("로컬파시스트: ", localStorage.getItem('recoil-persist'))
    
  }

  const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    return axios
      .post(process.env.REACT_APP_DB_HOST + "/users/login", {
        username: "tutu@naver.com",
        password: 12121212,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("성공")
        }
      })
      .catch((err) => {
        console.error(err);
        alert("회원이 아닙니다.");
      });
  };


  
  return (
    <>
    <Header>header헤더</Header>
    <Body> Bodt 바디
      <button onClick={testBtn}>콘솔버튼</button>
      <button onClick={onClickLogin}>로긴버튼</button>
        
    </Body>
    <Footer>footer</Footer>
    </>
  );
}

export default Main;
