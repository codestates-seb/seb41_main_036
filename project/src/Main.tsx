import styled from 'styled-components';
import KakaoMap from './components/KakaoMap';
import Place from "./pages/Place";
import Post from "./pages/Post";

// import {useRecoilState} from "recoil"
// import {useRecoilValue} from "recoil"
// import { LoginState, AuthToken, RefreshToken} from "./recoil/state"

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
  
  // const islogin = useRecoilValue(LoginState)
  // const authToken = useRecoilValue(AuthToken)
  // const refreshToken = useRecoilValue(RefreshToken)



  // const testBtn = () => {

  //   // console.log("로컬어스", localStorage.getItem("authorizationToken(이메일)"))
  //   // console.log("로컬리프",localStorage.getItem("refreshToken(패스워드)"))
  //   // console.log("로컬아디",localStorage.getItem("userId"))
  //   console.log("리코일로그인상태: ",islogin)
  //   console.log("리코일 어스토큰: ",authToken)
  //   console.log("리코일 리프토큰: ",refreshToken)
  //   console.log("로컬파시스트: ", localStorage.getItem('recoil-persist'))
    
  // }

  
  return (
    <>
    <Header>header헤더</Header>
    <Body> Bodt 바디
      {/* <button onClick={testBtn}>버튼버튼</button> */}
    </Body>
    <Footer>footer</Footer>
    </>
  );
}

export default Main;
