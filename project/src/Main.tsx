import styled from "styled-components";
import LoginSign from "./pages/LoginSign";
import KakaoMap from "./components/KakaoMap";
import FixedOnScrollUpHeader from "./components/Header/FixedOnScrollUpHeader";
import Place from "./pages/Place";
import Post from "./pages/Post";
import { Header } from "./components/Header/index";
import HiddenHeader from "./components/Header/HiddenHeader";
import Carousel from "./components/Carousel";
import Ranking from "./components/Ranking";

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
      {/* <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header> */}
      {/* <HiddenHeader /> */}
      <FixedOnScrollUpHeader />
      <Carousel />
      <Ranking />
      <Body></Body>
      <Footer>footer</Footer>
    </>
  );
}

export default Main;

// import axios from "axios";
// import ButtonForm from "./components/Button"

// import { useRecoilState } from "recoil";
// import {
//   LoginState,
//   AuthToken,
//   RefreshToken,
//   LoggedUser,
// } from "./recoil/state";

// const [isLogin, setIslogin] = useRecoilState(LoginState);
// const [auth, setAuth] = useRecoilState(AuthToken);
// const [rafresh, setRefresh] = useRecoilState(RefreshToken);
// const [loggedUser, setLoggedUser] = useRecoilState(LoggedUser);

// const onClickBtn= () => {
//   const data = {
//     postTitle : "haha",
//     postContent : "haha"
//   }

//   axios
//   .post("/posts/register/1", {
//     "postTitle" : "haha",
//     "postContent" : "haha"
//   },{
//     headers:{
//       "Content-Type": "application/json",
//     }
//   })
//   .then((res) => {
//       console.log(res)
//       console.log("로긴성공")

//       // navigate("/");
//   })
//   .catch((err)=>console.error(err))

// }

{
  /* <button onClick={onClickBtn}>버튼버튼</button> */
}
