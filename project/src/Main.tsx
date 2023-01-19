import styled from "styled-components";
import LoginSign from "./pages/LoginSign";
import KakaoMap from "./components/KakaoMap";
import FixedOnScrollUpHeader from "./components/Header/FixedOnScrollUpHeader";
import Place from "./pages/Place";
import Post from "./pages/Post";
import { Header } from "./components/Header/index";
import HiddenHeader from "./components/Header/HiddenHeader";

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

  return (
    <>

      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      {/* <HiddenHeader /> */}
      {/* <FixedOnScrollUpHeader /> */}
      <Body></Body>
      <Footer>footer</Footer>
    </>
  );
}

export default Main;
