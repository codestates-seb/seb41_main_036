import styled from "styled-components";
import Login from "../components/Login_Sign/SignSide";
// import Login from "../components/Login333";
import { Header } from "../components/Header/index";
import OverlayR from "../components/Login_Sign/OverlayRight";
import OverlayL from "../components/Login_Sign/OverlayLeft";
import LoginSide from "../components/Login_Sign/LoginSide";
import SignSide from "../components/Login_Sign/SignSide";
import * as s from "../components/Login_Sign/LoginSignStyle";

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

function LoginSign() {
  return (
    <>
      <Body>
        <s.Wrapper>
          <SignSide />
          <LoginSide />
          <OverlayL />
          <OverlayR />
        </s.Wrapper>
      </Body>
      <Footer>footer</Footer>
    </>
  );
}

export default LoginSign;
