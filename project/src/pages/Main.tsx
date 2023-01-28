import { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import { ArrayPlaceType } from "./Place";
import { ArrayPostType } from "./Post";
import PostCardComponent from "../components/PostCardComponent";
import PlaceCardComponent from "../components/PlaceCardComponent";
import Carousel from "../components/Carousel";
import Ranking from "../components/Ranking";
import { Link } from "react-router-dom";
import { HiOutlineChevronDoubleRight as DoubleArrowIcon } from "react-icons/hi";
// import axios from "../utils/axiosinstance"

const GoRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(3px);
  }
`;

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100%;
  padding: 20px 30px;
  background-color: hsl(222, 24%, 98%);
`;

const MainSubTitle = styled.h3`
  font-size: var(--font-xl);
  color: var(--black-900);
  width: 100%;
  margin: 50px 20px 20px 0px;
`;

const ViewsPlaceContainer = styled.div`
  > div {
    display: flex;
  }
`;

const ViewsPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  padding: 20px 0;
  margin-top: 10px;
  a {
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
  }
  svg {
    width: 18px;
    height: 18px;
    padding-left: 5px;
    color: var(--purple-300);
  }
  &:hover {
    svg {
      animation: ${GoRight} 0.2s ease 4 alternate;
    }
  }
`;
const PlaceCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function Main() {
  const [attractionData, setAttractionData] = useState<ArrayPlaceType>();
  const [postData, setPostData] = useState<ArrayPostType>();

  const url = "/attractions/filter?page=1&size=4&sort=newest";
  const url2 = `/posts/home?page=1&size=8&sort=views`;

  useEffect(() => {
    axios.all([axios.post(url, { provinces: [] }), axios.get(url2)]).then(
      axios.spread((res1, res2) => {
        setAttractionData(res1.data.data);
        setPostData(res2.data.data);
      })
    );
  }, []);

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
                width="24%"
              ></PlaceCardComponent>
            )}
          </PlaceCardWrapper>
          <MoreLink>
            <Link to={"/attractions"}>
              더 많은 명소 둘러보기
              <DoubleArrowIcon />
            </Link>
          </MoreLink>
        </ViewsPlaceContainer>
        <MainSubTitle>가장 많이 본 포스트</MainSubTitle>
        <ViewsPostContainer>
          {postData && (
            <PostCardComponent posts={postData} margin="0" width="24%" />
          )}
        </ViewsPostContainer>
        <MoreLink>
          <Link to={"/posts"}>
            더 많은 포스트 확인하기 <DoubleArrowIcon />
          </Link>
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
