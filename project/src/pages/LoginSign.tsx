import styled from "styled-components";
import OverlayR from "../components/Login_Sign/OverlayRight";
import OverlayL from "../components/Login_Sign/OverlayLeft";
import LoginSide from "../components/Login_Sign/LoginSide";
import SignSide from "../components/Login_Sign/SignSide";
import * as s from "../components/Login_Sign/LoginSignStyle";
import Footer from "../components/Footer";

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
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
      <Footer/>
    </>
  );
}

export default LoginSign;