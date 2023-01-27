import { useState, useEffect } from "react";
import axios from "../utils/axiosinstance";
import styled from "styled-components";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import { ArrayPlaceType } from "./Place";
import { ArrayPostType } from "./Post";
import PostCardComponent from "../components/PostCardComponent";
import PlaceCardComponent from "../components/PlaceCardComponent";
import Carousel from "../components/Carousel";
import Ranking from "../components/Ranking";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

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

const MainSubTitle = styled.h3`
  font-size: var(--font-xxl);
  color: var(--black-900);
  width: 100%;
  margin: 30px 20px 20px 0px;
`;

const ViewsPlaceContainer = styled.div`
  > div {
    display: flex;
  }
`;

const ViewsPostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  //border: 1px solid black;
  > p {
    cursor: pointer;
    font-weight: bold;
    margin: 30px 0 0 83%;
  }
`;
const MoreLink = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const PlaceCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function Main() {
  const [attractionData, setAttractionData] = useState<ArrayPlaceType>();
  const [postData, setPostData] = useState<ArrayPostType>();

  const url =
    "http://pikcha36.o-r.kr:8080/attractions/?page=1&size=4&sort=posts";
  const url2 = `http://pikcha36.o-r.kr:8080/posts/filter?0page=1&size=8&sort=views`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setAttractionData(res.data.data))
      .catch((err) => console.error(err));
    axios
      .post(url2, { provinces: [] })
      .then((res) => setPostData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(attractionData, postData);

  return (
    <>
      <FixedOnScrollUpHeader />
      <Carousel />
      <Ranking />
      <Body>
        <MainSubTitle>많이 다녀간 명소</MainSubTitle>
        <ViewsPlaceContainer>
          <PlaceCardWrapper>
            {attractionData && (
              <PlaceCardComponent
                placesData={attractionData}
                curPage={1}
                limit={4}
                width="23.5%"
                height="180px"
              ></PlaceCardComponent>
            )}
          </PlaceCardWrapper>
          <MoreLink>
            <Link to={"/attractions"}>더 많은 명소 둘러보기</Link>
          </MoreLink>
        </ViewsPlaceContainer>
        <MainSubTitle>가장 많이 본 포스트</MainSubTitle>
        <ViewsPostContainer>
          {postData && (
            <PostCardComponent
              posts={postData}
              limit={8}
              margin="0"
              width="22%"
            />
          )}
        </ViewsPostContainer>
        <MoreLink>
          <Link to={"/posts"}>더 많은 포스트 확인하기</Link>
        </MoreLink>
      </Body>
      {/* <Footer>footer</Footer> */}
    </>
  );
}

export default Main;

// import axios from "./utils/axiosinstance"
// import { useRecoilState } from "recoil";
// import {
//   LoginState,
//   AuthToken,
//   LoggedUser,
// } from "./recoil/state";

// const [isLogin, setIslogin] = useRecoilState(LoginState);
// const [auth, setAuth] = useRecoilState(AuthToken);
// const [loggedUser, setLoggedUser] = useRecoilState(LoggedUser);

// const onClickBtn= () => {

//   const memberId = localStorage.getItem("memberId")
//   axios
//   .post(`/comments/upload/1`,
//   {
//     commentContent: "1분테스트 16",
//   },{
//     headers:{
//       "Content-Type": "application/json",
//     }
//   }

//   // .get(`token/refresh/${memberId}`

//   )
//   .then((res) => {

//       console.log(res)
//       console.log("댓글등록")

//   })
//   .catch((err)=>console.error(err))

// }

// <button onClick={onClickBtn}>버튼버튼</button>
