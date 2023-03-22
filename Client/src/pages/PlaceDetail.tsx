import styled, { createGlobalStyle } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt as MarkIcon } from "react-icons/fa";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import KakaoMap from "../components/KakaoMap";
import axios from "../utils/axiosinstance";
import PostCardComponent from "../components/PostCard/PostCardComponent";
import Footer from "../components/Footer";
import { LoginState } from "../recoil/state";
import {
  BookmarkSavesState,
  LikesState,
  AttractionDataState,
} from "../recoil/PlaceDetailState";
import { useRecoilState, useSetRecoilState } from "recoil";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import EmptyResult from "../components/EmptyResult";
import { ArrayPostType, PageInfoType } from "../utils/d";
import FloatingMenu from "../components/FloatingMenu";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../components/Header/MobileHeader";
import { MenuSideBar, MenuButton } from "../pages/MainResponsive";

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
  * {
    box-sizing: content-box !important;
  }
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

const PostCardListWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const PostWrapper = styled.div`
  width: 100%;
  background-color: #f8f9fa;
`;
export type PlaceData = {
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
  const [fixBar, setFixBar] = useState(0);
  const [postData, setPostData] = useState<ArrayPostType>();
  const [attractionData, setAttractionData] =
    useRecoilState(AttractionDataState); // 명소 정보 저장
  const [isLogin] = useRecoilState(LoginState);
  const setBookmarkSaves = useSetRecoilState(BookmarkSavesState);
  const setLikes = useSetRecoilState(LikesState);
  const [curPage, setCurPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const totalInfoRef = useRef<PageInfoType | null>(null);
  const memberId = localStorage.getItem("memberId");
  const { id } = useParams();
  const url = `/attractions/${id}`;
  const url2 = `/attractions/${id}/${memberId}`;
  const url3 = `/posts/${id}?page=${curPage}&size=8`;
  const url4 = `/posts/${id}/${memberId}?page=${curPage}&size=8`;
  console.log(fixBar);
  const ATTRACTIONS_URL = isLogin ? url2 : url;
  const POSTS_URL = isLogin ? url4 : url3;
  const navigate = useNavigate();


  const Mobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    axios.get(ATTRACTIONS_URL).then((res) => {
      setAttractionData(res.data.data);
      setLikes(res.data.data.isVoted);
      setBookmarkSaves(res.data.data.isSaved);
    });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ATTRACTIONS_URL]);

  useEffect(() => {
    axios.get(POSTS_URL).then((res) => {
      setPostData(res.data.data);
      totalInfoRef.current = res.data.pageInfo;
    });
  }, [POSTS_URL]);

  const onScroll = () => {
    if (window.scrollY <= 700) {
      setTimeout(function () {
        setView("info");
      }, 2000);
    }
  };

  const updateScroll = () => {
    setFixBar(window.scrollY || document.documentElement.scrollTop);
  };

  const handleScroll = () => {
    onScroll();
    updateScroll();
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

  const handlePostButtonClick = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    navigate(`/write/${id}`);
  };

  const [isNavbarChecked, setIsNavbarChecked] = useState<boolean>(false);

  return (
    <>
      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}

      {Mobile ? <MobileHeader
        isNavbarChecked={isNavbarChecked}
        setIsNavbarChecked={setIsNavbarChecked}
        ></MobileHeader> : <FixedOnScrollUpHeader />}

      {isNavbarChecked ? 
        <MenuSideBar>
          <Link to='/attractions'><MenuButton>명소</MenuButton></Link>
          <Link to='/posts'><MenuButton>포스트</MenuButton></Link>
          <Link to='/map'><MenuButton>내 주변 명소찾기</MenuButton></Link>
        </MenuSideBar> : null}


      <GlobalStyle />
      {attractionData && (
        <>
          <ImageBox>
            <img src={attractionData!.fixedImage} alt="배경이미지"></img>
          </ImageBox>
          <FloatingMenu
            inverted={fixBar < 470}
            handlePostButtonClick={handlePostButtonClick}
            onModalVisible={setIsModalVisible}
          />
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
          <PostWrapper>
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
                  <EmptyResult message="해당 명소에 등록된 포스트가 없습니다" />
                )}
              </PostCardListWrapper>
              {!!postData?.length && (
                <Pagination
                  props={totalInfoRef.current as PageInfoType}
                  setCurPage={setCurPage}
                />
              )}
            </Post>
          </PostWrapper>
        </>
      )}
      <Footer />
    </>
  );
};

export default PlaceDetail;
