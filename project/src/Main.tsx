import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import FixedOnScrollUpHeader from "./components/Header/FixedOnScrollUpHeader";
import { ArrayPlaceType } from "./pages/Place";
import { ArrayPostType } from "./pages/Post";
import PostCardComponent from "./components/PostCardComponent.tsx";
import PlaceCardComponent from "./components/PlaceCardComponent";
import Carousel from "./components/Carousel";
import Ranking from "./components/Ranking";
import { Link } from "react-router-dom";
import { Header } from "./components/Header";
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
  height: 90vh;
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
    "http://pikcha36.o-r.kr:8080/attractions/filter?page=1&size=4&sort=newest";
  const url2 = `http://pikcha36.o-r.kr:8080/posts/home?page=1&size=8&sort=views`;

  useEffect(() => {
    axios.all([axios.post(url, { provinces: [] }), axios.get(url2)]).then(
      axios.spread((res1, res2) => {
        setAttractionData(res1.data.data);
        setPostData(res2.data.data);
      })
    );
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
