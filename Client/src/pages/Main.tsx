import { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import PostCardComponent from "../components/PostCard/PostCardComponent";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import Carousel from "../components/Carousel";
import Ranking from "../components/Ranking";
import { Link } from "react-router-dom";
import { HiOutlineChevronDoubleRight as DoubleArrowIcon } from "react-icons/hi";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { LoginState } from "../recoil/state";
import { ArrayPlaceType, ArrayPostType } from "../utils/d";
import { FaAndroid } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import MainMobile from "./MainResponsive";

const GoRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(3px);
  }
`;


const Body = styled.div`
  height: 100%;
  width: 100vw;
  padding: 20px 0 70px 0;
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
    color: var(--black-800);
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

const BodyContent = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  width: 83.5%;
`;

function Main() {

  const Tablet = useMediaQuery({
    query: "(min-width:768px, max-width:991px)"
  })
  const Mobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  
  const [attractionData, setAttractionData] = useState<ArrayPlaceType>();
  const [postData, setPostData] = useState<ArrayPostType>();
  const [isLogin] = useRecoilState(LoginState);
  const memberId = localStorage.getItem("memberId");

  const url1 =
    "https://pikcha36.o-r.kr:8080/attractions/filter?page=1&size=4&sort=posts";
  const url1_LoggedIn = `https://pikcha36.o-r.kr:8080/attractions/filter/${memberId}?page=1&size=4&sort=posts`;
  const url2 = `https://pikcha36.o-r.kr:8080/posts/home?page=1&size=8&sort=views`;
  const url2_LoggedIn = `https://pikcha36.o-r.kr:8080/posts/home/${memberId}?page=1&size=8&sort=views`;

  useEffect(() => {
    const attraction_url = isLogin ? url1_LoggedIn : url1;
    const post_url = isLogin ? url2_LoggedIn : url2;
    axios
      .all([axios.post(attraction_url, { provinces: [] }), axios.get(post_url)])
      .then(
        axios.spread((res1, res2) => {
          setAttractionData(res1.data.data);
          setPostData(res2.data.data);
        })
      );
  }, []);

  return (
    <>
    {Mobile ? <MainMobile></MainMobile> :
        <>
      <FixedOnScrollUpHeader />
      <Carousel />
      <Ranking />
      <Body>
        <BodyContent>
          <MainSubTitle>많이 다녀간 명소</MainSubTitle>
          <ViewsPlaceContainer>
            <PlaceCardWrapper>
              {attractionData &&
                attractionData.map((placeInfo) => (
                  <PlaceCard
                    placeInfo={placeInfo}
                    width="24%"
                    key={placeInfo.attractionId}
                  />
                ))}
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
        </BodyContent>
      </Body>
      <Footer />
      </>}
    </>
  );
}

export default Main;
