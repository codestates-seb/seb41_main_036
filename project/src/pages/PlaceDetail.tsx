import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsShareFill, BsBookmarkFill } from "react-icons/bs";
import { MdEditNote as NoteIcon } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt as MarkIcon } from "react-icons/fa";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import KakaoMap from "../components/KakaoMap";
import axios from "../utils/axiosinstance";
import PostCardComponent from "../components/PostCardComponent";
import { ArrayPostType } from "./Post";
import Footer from "../components/Footer";

import { LoginState } from "../recoil/state";
import { useRecoilState } from "recoil";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { ReactComponent as NoSearchResultIcon } from "../data/NoSearchResult.svg";
import { PageInfoType } from "./Place";
import { getCurrentCount } from "../utils/utils";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: content-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 300px;
  > img {
    max-height: 300px;
    width: 100%;
    object-fit: cover;
  }
  &:after {
    height: 300px;
    position: absolute;
    left: 0;
    top: 100px;
    right: 0;
    bottom: 0;
    content: "";
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    mix-blend-mode: normal;
    opacity: 0.2;
  }
`;
const Container = styled.div`
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
  margin: 0 auto;
  color: var(--black-900);
  > hr {
    width: 300px;
    background: var(--purple-400);
    height: 100px;
    transition: left 0.3s ease;
  }
  > h2 {
    font-size: 26px;
    margin: 77px auto 30px;
    display: block;
    text-align: center;
    letter-spacing: 0.05rem;
  }
  > p {
    width: 60%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 15px;
    letter-spacing: 0.05rem;
    line-height: 1.4rem;
    word-spacing: 0.05rem;
  }
  > h3 {
    margin: 50px 0 0 0;
    text-align: center;
    font-size: 22px;
  }
  .mark-icon {
    margin: 1px 5px 0 0;
    fill: var(--purple-300);
    opacity: 0.8;
    width: 15px;
    height: 15px;
  }
`;
const NavBar = styled.div`
  display: flex;
  padding: 0 25%;
  height: 120px;
  background-color: white;
  .active {
    color: var(--purple-400);
    font-weight: bold;
    border-bottom: 1px solid var(--purple-400);
  }
  > button {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex: 1 1 auto;
    background-color: white;
    width: 300px;
    padding-bottom: 23px;
    border: none;
    font-size: var(--font-base);
    font-weight: var(--fw-bold);
    letter-spacing: 0.05rem;
    color: var(--black-680);
    border-bottom: 1px solid var(--black-275);
    transition: all 0.2s ease;
    cursor: pointer;
    :hover {
      color: var(--purple-300);
    }
  }
`;

const Post = styled.div`
  background: #f8f9fa;
  width: 85%;
  margin: 0 auto;
  padding: 100px 0 60px 0;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin: 0 auto;
  width: 85%;
  > h2 {
    width: 300px;
    font-size: var(--font-xl);
    white-space: nowrap;
    color: var(--black-800);
    /* margin-right: 5%; */
  }
  > button {
    margin-left: 60%;
    border-radius: var(--br-m);
    font-size: var(--font-sm);
    border: none;
    font-weight: var(--fw-bold);
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
    color: var(--black-800);
    opacity: 0.7;
    transition: all 0.3s ease;
    :hover {
      background-color: #9f9f9f;
      color: white;
    }
  }
`;

const LocationInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
  letter-spacing: 0.03rem;
  h3 {
    display: flex;
    justify-content: center;
    font-size: var(--font-lg);
    padding-top: 30px;
  }
  p {
    display: flex;
    justify-content: center;
    margin: 20px 0 30px 0;
    color: var(--black-800);
    word-spacing: 0.05rem;
    font-size: 15px;
  }
`;
const FixBoxVertical = styled.div<{ inverted: boolean }>`
  padding: 27px 30px 20px 30px;
  background-color: white;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  height: 220px;
  border-radius: 85px;
  box-shadow: 0px 0px 21px rgba(180, 180, 180, 0.25);
  position: ${(props) => (props.inverted ? "fixed" : "absolute")};
  left: ${(props) => (props.inverted ? "87%" : "87%")};
  top: ${(props) => (props.inverted ? "62%" : "1000px")};
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.5 ease;
    font-weight: var(--fw-bold);
    svg {
      transition: all 0.3s ease;
      :hover {
        cursor: pointer;
        color: var(--black-800);
      }
    }
    .share-icon {
      width: 15px;
      height: 15px;
    }
    .post-icon {
      margin-top: 8px;
      margin-left: 7px;
      width: 26px;
      height: 26px;
    }
    .bookmark-icon {
      width: 17px;
      height: 17px;
      margin-top: 9px;
      :hover {
        fill: var(--black-800);
        transform: scale(1.05);
      }
    }
    .heart-icon {
      height: 19px;
      width: 19px;
      :hover {
        fill: var(--pink-heart);
        transform: scale(1.1);
      }
    }
  }
`;

const MarkerCount = styled.p`
  color: var(--black-700);
  font-size: var(--font-xs);
  margin: 2px auto;
`;

const PostCardListWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02rem;
  svg {
    padding-top: 10px;
    opacity: 0.8;
  }
  h3 {
    color: var(--black-700);
    padding: 0px 0 10px;
    font-size: var(--font-sm);
  }
  p {
    color: var(--black-700);
    font-size: var(--font-xs);
    margin-bottom: 53px;
  }
`;

type PlaceData = {
  attractionId: number | undefined;
  attractionAddress: string | undefined;
  attractionDescription: string | undefined;
  attractionName: string | undefined;
  fixedImage: string | undefined;
  isSaved: boolean;
  isVoted: boolean;
  likes: number | undefined;
  saves: number | undefined;
};

const PlaceDetail = (): JSX.Element => {
  let [view, setView] = useState<string>("info");
  const scrollRefContent = useRef<HTMLDivElement>(null);
  //const [shareOpen, setShareOpen] = useState(false);
  const [fixBar, setFixBar] = useState(0);
  const [attractionData, setAttractionData] = useState<PlaceData>(); // 명소 정보 저장
  const [postData, setPostData] = useState<ArrayPostType>();

  const [bookmarkSaves, setBookmarkSaves] = useState(false); //로컬 북마트 상태 저장
  const [likes, setLikes] = useState(false);
  const [isLogin] = useRecoilState(LoginState);
  const [curPage, setCurPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const totalInfoRef = useRef<PageInfoType | null>(null);
  const memberId = localStorage.getItem("memberId");
  const { id } = useParams();
  const url = `/attractions/${id}`;
  const url2 = `/attractions/${id}/${memberId}`;
  const url3 = `/posts/${id}?page=${curPage}&size=8`;
  const url4 = `/posts/${id}/${memberId}?page=${curPage}&size=8`;
  const URL_FOR_SAVES = `/attractions/saves/${id}`;
  const URL_FOR_LIKES = `/attractions/likes/${id}`;
  const ATTRACTIONS_URL = isLogin ? url2 : url;
  const POSTS_URL = isLogin ? url4 : url3;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ATTRACTIONS_URL).then((res) => {
      setAttractionData(res.data.data);
      setLikes(res.data.data.isVoted);
      setBookmarkSaves(res.data.data.isSaved);
    });
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [ATTRACTIONS_URL]);

  useEffect(() => {
    axios.get(POSTS_URL).then((res) => {
      setPostData(res.data.data);
      totalInfoRef.current = res.data.pageInfo;
    });
  }, [POSTS_URL]);

  function onScroll() {
    if (window.scrollY <= 700) {
      setTimeout(function () {
        setView("info");
      }, 2000);
    }
  }

  const updateScroll = () => {
    setFixBar(window.scrollY || document.documentElement.scrollTop);
  };

  const handleView = (setting: string) => {
    setView(setting);
    if (view === "info" && setting === "post") {
      scrollRefContent?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("url이 성공적으로 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickBookmark = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    axios.post(URL_FOR_SAVES).then((res) => {
      setBookmarkSaves(res.data.data.isSaved);
    });
  };

  const handleClickLikes = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    axios.post(URL_FOR_LIKES).then((res) => {
      setLikes(res.data.data.isVoted);
    });
  };

  const handlePostButtonClick = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    navigate(`/write/${id}`);
  };

  return (
    <>
      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}
      <FixedOnScrollUpHeader />
      <GlobalStyle />
      {attractionData && (
        <>
          <ImageBox>
            <img src={attractionData!.fixedImage} alt="배경이미지"></img>
          </ImageBox>
          <FixBoxVertical inverted={fixBar < 470 ? true : false}>
            <div
              className="icon"
              onClick={() => {
                handleCopyClipBoard(document.location.href);
              }}
            >
              <BsShareFill className="share-icon" />
            </div>
            <div onClick={handlePostButtonClick}>
              {" "}
              <NoteIcon className="post-icon" />
            </div>
            <div onClick={() => handleClickBookmark()}>
              <BsBookmarkFill
                className="bookmark-icon"
                fill={bookmarkSaves ? "var(--black-800)" : "var(--black-400)"}
              />
              <MarkerCount>
                {getCurrentCount(
                  attractionData.saves,
                  attractionData.isSaved,
                  bookmarkSaves
                )}
              </MarkerCount>
            </div>
            <div onClick={() => handleClickLikes()}>
              <AiFillHeart
                className="heart-icon"
                color={
                  likes === true ? "var(--pink-heart)" : "var(--black-400)"
                }
              />
              <MarkerCount>
                {getCurrentCount(
                  attractionData.likes,
                  attractionData.isVoted,
                  likes
                )}
              </MarkerCount>
            </div>
          </FixBoxVertical>
          <NavBar>
            <button
              className={view === "info" ? "active" : ""}
              onClick={() => {
                handleView("info");
              }}
            >
              상세페이지
            </button>
            <button
              className={view === "post" ? "active" : ""}
              onClick={() => {
                handleView("post");
              }}
            >
              포스트
            </button>
          </NavBar>
          <Container>
            <h2>{attractionData?.attractionName}</h2>
            <p>{attractionData?.attractionDescription}</p>
            <LocationInfoContainer>
              <h3>위치 안내</h3>
              <p>
                <MarkIcon className="mark-icon"></MarkIcon>
                {attractionData!.attractionAddress}
              </p>
              <KakaoMap
                width="60%"
                height="320px"
                dataList={attractionData!.attractionAddress}
                position="relative"
                left="20%"
                regionFilter="null"
                component="place"
                dataset=""
                modalData="ex"
                setFilterOrPosition="11"
                filterOrPosition="11"
              ></KakaoMap>
            </LocationInfoContainer>
          </Container>
          <Post ref={scrollRefContent}>
            <PostHeader>
              <h2>포스트</h2>
              <button onClick={handlePostButtonClick}>포스트 작성</button>
            </PostHeader>
            <PostCardListWrapper>
              {postData?.length ? (
                <PostCardComponent
                  posts={postData}
                  margin="0%"
                  width="24%"
                ></PostCardComponent>
              ) : (
                <Notification>
                  <NoSearchResultIcon />
                  <h3>해당 명소에 등록된 포스트가 없습니다</h3>
                  <p>첫번째 포스트를 남겨주세요</p>
                </Notification>
              )}
            </PostCardListWrapper>
            {!!postData?.length && (
              <Pagination
                props={totalInfoRef.current as PageInfoType}
                setCurPage={setCurPage}
              />
            )}
          </Post>
        </>
      )}
      <Footer />
    </>
  );
};

export default PlaceDetail;
//현재 개수, 이전에 누른 상태였는지, 지금 상태는 뭔지
//포스트 작성 연결하기, 페이지네이션 컴포넌트 데려와서 완성하기,
//포스트 하트 데려와서 눌렀는지 연결시키기=> 포스트 컴포넌트에서 처리한다
