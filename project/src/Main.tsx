import styled from "styled-components";
import KakaoMap from "./components/KakaoMap";
import Place from "./pages/Place";
import PlaceDetail from "./pages/PlaceDetail";


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

function Main(props:any) {
  return (
    <>
      <Header>header헤더</Header>
      {/* <Body>
        <Place />
      </Body> */}
        <PlaceDetail></PlaceDetail>

      <Footer>footer</Footer>
    </>
  );
}

export default Main;
