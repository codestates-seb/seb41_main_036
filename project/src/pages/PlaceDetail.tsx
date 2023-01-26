import styled, { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsShareFill, BsBookmarkFill } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
//import PaginationComponent from "../components/PaginationComponent";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import KakaoMap from "../components/KakaoMap";
import "../index.css";
import axios from "axios";
import PostCardComponent from "../components/PostCardComponent.tsx";
import { ArrayPostType } from "./Post";
import {CopyToClipboard} from 'react-copy-to-clipboard';



=======
import KakaoMap from "../components/KakaoMap";
import React, { useState, useRef, useEffect } from "react";
import { BsShareFill, BsBookmarkFill } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import {
  AiFillHeart,
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
// import PaginationComponent from "../components/PaginationComponent";
import { Header } from "../components/Header";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import "../index.css";
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: content-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
`;

const ImageBox = styled.div`
<<<<<<< HEAD
=======
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css");
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  width: 100%;
  height: 300px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: white;
  margin: 0 auto;

  > hr {
    width: 300px;
    background: var(--purple-400);
    height: 100px;
    transition: left 0.3s ease;
  }
  > h2 {
    font-size: 32px;
    margin: 77px auto 30px;
    display: block;
    text-align: center;
  }
  > p {
<<<<<<< HEAD
    width: 60%;
    text-align: left;
    padding: 10px;
    display: block;
    text-align: center;
=======
    text-align: left;
    padding: 10px;
    display: block;
    width: 60%;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    height: 80px;
    margin: 0 auto;
    font-size: 18px;
  }
  > h3 {
    margin: 50px 0 0 0;
    text-align: center;
    font-size: 22px;
  }
  > div {
<<<<<<< HEAD
    display: block;
=======
    width: 180px;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    height: 40px;
    margin: 10px auto;
    text-align: center;
    & div {
<<<<<<< HEAD
      text-align: center;
      width: 15px;
      height: 20px;
=======
      width: 15px;
      height: 20px;
      margin: 0px 10px 0 10px;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    }
  }
  .active {
    color: var(--purple-400);
    font-weight: bold;
    border-bottom: 1px solid var(--purple-400);
  }
`;
<<<<<<< HEAD
=======
// 버튼 내비게이션바
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
const NavBar = styled.div`
  display: flex;
  margin: 0 25%;
  width: 50%;
  height: 100px;
  background-color: white;

  .active {
    color: var(--purple-400);
    font-weight: bold;
    border-bottom: 1px solid var(--purple-400);
  }

  > button {
    background-color: white;
    width: 300px;
    padding-bottom: 23px;
    border: none;
    margin: 40px 20px 0 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    :nth-child(1) {
<<<<<<< HEAD
      margin-right: 40%;
=======
      margin-right: 130px;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    }
  }
`;

const Post = styled.div`
  background: #f8f9fa;
  width: 100%;
  height: 900px;
`;

const PostHeader = styled.div`
  display: flex;
  padding: 40px 0 20px 0;
  margin: 0 auto;
  width: 85%;
  height: 70px;
  > h2 {
    width: 300px;
    height: 40px;
    font-size: 30px;
    white-space: nowrap;
<<<<<<< HEAD
    /* margin-right: 5%; */
    margin: 25px 0 20px 7%;
=======
    margin-right: 5%;
    margin-bottom: 20px;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  }
  > button {
    width: 164px;
    margin-left: 60%;
    height: 45px;
    border-radius: 20px;
    font-size: 16px;
    border: none;
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    white-space: nowrap;
    :hover {
      background-color: #9f9f9f;
      color: white;
    }
  }
`;
<<<<<<< HEAD
=======

const PostBox = styled.div`
  width: 85%;
  height: 600px;
  background-color: #6d9faa;
  margin: 0 auto;
`;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

const FixBoxVertical = styled.div<{ inverted: boolean }>`
  box-sizing: content-box;
  padding: 10px;
  background-color: white;
  color: grey;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 200px;
  border-radius: 85px;
  box-shadow: 0px 0px 21px rgba(180, 180, 180, 0.25);
  position: ${(props) => (props.inverted ? "fixed" : "absolute")};
  left: ${(props) => (props.inverted ? "87%" : "87%")};
<<<<<<< HEAD
  top: ${(props) => (props.inverted ? "60%" : "1010px")};
=======
  top: ${(props) => (props.inverted ? "60%" : "1050px")};
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  > div {
    cursor: pointer;
    margin-left: 11px;
    :nth-child(1) {
      margin-top: 20px;
    }
    :nth-child(2),
    :nth-child(3) {
      margin-top: 19px;
    }
    :nth-child(5) {
      margin-top: 10px;
    }

    :hover {
      color: var(--purple-400);
    }
  }
`;

const MarkerCount = styled.p`
  color: grey;
  font-size: 13px;
  margin: 2px auto;
`;

<<<<<<< HEAD
type PlaceData = {
  attractionId: number | undefined;
  attractionAddress: string | undefined;
  attractionDescription: string | undefined;
  attractionName: string | undefined;
  fixedImage: string | undefined;
  isSaved: boolean | undefined;
  isVoted: boolean | undefined;
  likes: number | undefined;
  saves: number | undefined;
};

=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
const PlaceDetail = (): JSX.Element => {
  let [view, setView] = useState<string>("info");
  const scrollRefContent = useRef<HTMLDivElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [fixBar, setFixBar] = useState(0);
  const [attractionData, setAttractionData] = useState<PlaceData>(); // 명소 정보 저장
  const [postData, setPostData] = useState<ArrayPostType>();

  const [bookmarkSaves, setBookmarkSaves] = useState(false);
  const [likes,setLikes] = useState(false);

  const { id } = useParams();
  const url = `http://pikcha36.o-r.kr:8080/attractions/${id}`;
  const url2 = `http://pikcha36.o-r.kr:8080/posts/details/${id}?page=1&size=8`;
  //const url3 = "http://pikcha36.o-r.kr:8080/posts/attractions?page=1&size=100";

  const url4 = `http://localhost:3000/attractions/saves/1/1`;
  const url5 = `http://localhost:3000/attractions/likes/1/1`;
  
  const navigate = useNavigate();

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
<<<<<<< HEAD

  const handleView = (setting: string) => {
    setView(setting);
    if (view === "info") {
      scrollRefContent?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCopyClipBoard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('url이 성공적으로 복사되었습니다.')
    }catch(err){
      console.log('복사 실패')
    }
  }
  //console.log('여기',attractionData)

  const handleClickBookmark = async () => { 

    axios.post(url4).then((res)=>{
      console.log(res.data.data)
      if(res.data.data.isSaves){
        setBookmarkSaves(true);
        console.log(bookmarkSaves)
      }
    })
  }

  // 여기
  const handleClickLikes = () => {
    console.log('누름')
    axios.post(url5).then((res)=>{
      console.log(res.data.data.isVoted)
      if(res.data.data.isVoted){
        setLikes(res.data.data.isVoted);
        console.log(likes)
      }
    })
  }

  useEffect(() => {
    //잠깐 멈춤 
    axios.all([axios.get(url), axios.get(url2)]).then(
      axios.spread((res1, res2) => {
        setAttractionData(res1.data.data);
        setPostData(res2.data.data);
        console.log('요청중')
      })
    );

=======

  useEffect(() => {
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateScroll);
    };
<<<<<<< HEAD
  }, []);



=======
  }, [fixBar]);

  const handleView = (setting: string) => {
    setView(setting);
    if (view === "info") {
      scrollRefContent?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  return (
    <>
      <FixedOnScrollUpHeader />
      <GlobalStyle />
<<<<<<< HEAD
      {attractionData !== undefined ? (
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
              <BsShareFill size="15" />
            </div>
            
            <div
              onClick={() => {
                navigate("/write");
              }}
            >
              {" "}
              <SlNote size="16" />
            </div>
            {/* <button onClick = {() => {setBookmarkSaves (true)} }></button> */}
            <div onClick={()=>handleClickBookmark()}>
              <BsBookmarkFill size="16"  fill={bookmarkSaves ? "red" : "grey"}/>
            </div>
            <MarkerCount>
              {attractionData!.saves}
            </MarkerCount>
            <div onClick = {()=>handleClickLikes()}>
              
              <AiFillHeart size="16" color = {likes === true ? "red" : "grey"} /> 

            </div>
            <MarkerCount>{attractionData!.likes}</MarkerCount>
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
            <h3>위치 안내</h3>
            <div>
              <p>
                <FaMapMarkerAlt color="grey" size="14"></FaMapMarkerAlt>
                {attractionData!.attractionAddress}
              </p>
            </div>
            <KakaoMap
              width="60%"
              height="320px"
              dataList={attractionData!.attractionAddress}
              position="absolute"
              left="20%"
              regionFilter="null"
              component="place"
            ></KakaoMap>
          </Container>
          <Post ref={scrollRefContent}>
            <PostHeader>
              <h2>포스트</h2>
              <button
                onClick={() => {
                  navigate("/write");
                }}
              >
                포스트 작성
              </button>
            </PostHeader>
            {postData && (
              <PostCardComponent
                posts={postData}
                limit={8}
                margin="8%"
                width="22%"
              ></PostCardComponent>
            )}
          </Post>
        </>
      ) : (
        <div>Loading ... </div>
      )}
=======
      <ImageBox>
        <img
          src="https://images-ext-1.discordapp.net/external/UtUblHy4eFpjTRa-PmoWfhKJ6bmsNVznQ3A_uHnhlxg/%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1528%26q%3D80/https/images.unsplash.com/photo-1546417404-73e80b4a749b"
          alt="배경이미지"
        ></img>
      </ImageBox>
      <FixBoxVertical inverted={fixBar < 520 ? true : false}>
        <div
          className="icon"
          onClick={() => {
            setShareOpen(!shareOpen);
          }}
        >
          <BsShareFill size="15" />
        </div>
        <div>
          {" "}
          <SlNote size="16" />
        </div>
        <div>
          <BsBookmarkFill size="16" />
        </div>
        <MarkerCount>12</MarkerCount>
        <div>
          <AiFillHeart size="16" />
        </div>
        <MarkerCount>91</MarkerCount>
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
        <h2>경복궁</h2>
        <p>
          경복궁은 조선 왕조 제일의 법궁입니다.. 북으로 북악산을 기대어 자리
          잡았고 정문인 광화문 앞으로는 넓은 육조거리(지금의 세종로)가 펼쳐져,
          왕도인 한양(서울) 도시 계획의 중심이기도 합니다. 1395년 태조 이성계가
          창건하였고, 1592년 임진 왜란으로 불타 없어졌다가, 고종 때인 1867년
          중건 되었습니다. 흥선대원군이 주도한 중건된 경복궁은 500여 동의
          건물들이 미로같이 빼곡히 들어선 웅장한 모습 이었습니다.
        </p>
        <h3>위치 안내</h3>
        <div>
          <div>
            <FaMapMarkerAlt color="grey" size="19"></FaMapMarkerAlt>
          </div>
          <p>종로구 사직로 161</p>
        </div>
        <KakaoMap
          width="730px"
          height="300px"
          dataList={["1,2"]}
          position="absolute"
          left="20%"
        ></KakaoMap>
      </Container>
      <Post ref={scrollRefContent}>
        <PostHeader>
          <h2>포스트</h2>
          <button>포스트 작성</button>
        </PostHeader>
        <PostBox>{/* 이곳에 post 컴포넌트 */}</PostBox>
      </Post>
      {/* <PaginationComponent></PaginationComponent> */}
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    </>
  );
};
export default PlaceDetail;
