import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BsShareFill, BsBookmarkFill } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AiFillHeart} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import PaginationComponent from "../components/PaginationComponent";
import FixedOnScrollUpHeader from '../components/Header/FixedOnScrollUpHeader';
import KakaoMap from "../components/KakaoMap";
import PostBox from "../components/PostBox";
import "../index.css"
import axios from "axios";



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
  > h2{

    font-size:32px;
    margin: 77px auto 30px;
    display: block;
    text-align: center;
    
  }
  > p{
    width: 60%;
    text-align: left;
    padding: 10px;
    display:block;
    text-align: center;
    height: 80px;
    margin: 0 auto;
    font-size: 18px;
  }
  > h3 {
    margin: 50px 0 0 0;
    text-align: center;
    font-size: 22px;
  }
  > div{
    display: block;
    height: 40px;
    margin: 10px auto;
    text-align: center;
    & div{
    text-align: center;
    width:15px;
    height: 20px;
    
    }
  }
  .active {
    color: var(--purple-400);
    font-weight: bold;
    border-bottom: 1px solid var(--purple-400);
  }
`;
const NavBar = styled.div`
  display: flex;
  margin: 0 30%;
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
      margin-right: 130px;
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
    /* margin-right: 5%; */
    margin: 25px 0 20px 7%;
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
  position: ${(props)=> (props.inverted ? 'fixed':'absolute')};
  left: ${(props)=> (props.inverted ? '87%':'87%')};
  top : ${(props)=> (props.inverted ? '60%':'1010px')};
  >div{
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



const PlaceDetail = ():JSX.Element => {
  let [view,setView] = useState<string>('info'); 
  const scrollRefContent = useRef<HTMLDivElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [fixBar, setFixBar] = useState(0);
  const [attractionData, setAttractionData] = useState<PlaceData>();// 명소 정보 저장 
  const [postData, setPostData] = useState<PostData[]|undefined>();
  const url = "http://pikcha36.o-r.kr:8080/attractions/1"; 
  const url2 = "http://pikcha36.o-r.kr:8080/posts/home"; 
  const url3 = "http://pikcha36.o-r.kr:8080/posts/attractions?page=1&size=100"
  const navigate = useNavigate();


  type PlaceData =  {
    attractionId:number|undefined, 
    attractionAddress: string|undefined, 
    attractionDescription: string|undefined, 
    attractionName : string|undefined, 
    fixedImage: string|undefined, 
    isSaved : boolean|undefined
    isVoted:boolean|undefined,
    likes: number|undefined, 
    saves:number|undefined
  }

  type PostData = {
    createdAt:string|undefined, 
    likes:number|undefined,
    memberId:number|undefined,
    modifiedAt:string|undefined,
    picture:string|undefined,
    postId:number|undefined,
    postTitle:string|undefined,
    username:string|undefined,
    views:number|undefined
  }


  function onScroll() {
    if (window.scrollY <= 700) {
      setTimeout(function () {
        setView("info");
      }, 2000);
    }
  }

  const updateScroll = () => {
    setFixBar(window.scrollY || document.documentElement.scrollTop);
  }
 
  const handleView = (setting:string) => {
    setView(setting)
    if(view === 'info'){
      scrollRefContent?.current?.scrollIntoView({  behavior: 'smooth', block: 'start' });
    }
  }


  useEffect(() => {

    axios
    .all([axios.get(url), axios.get(url2)])
      .then(
      axios.spread((res1,res2)=>{
        setAttractionData(res1.data.data);
        setPostData(res2.data.data)
      })
      //.catch((err)=>console.log(err))
    )
    console.log(attractionData)
    console.log('이거',postData)
    postData?.forEach((el)=>{
      console.log(el.picture)
    })

    window.addEventListener("scroll", updateScroll);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [attractionData === undefined, postData===undefined]);  


  const name = 'hyesu'



  return (
    <>
      <FixedOnScrollUpHeader />
        <GlobalStyle/>
          { attractionData !== undefined ?
            <>
          <ImageBox>
            <img src={attractionData!.fixedImage}  alt="배경이미지"></img>
          </ImageBox>
          <FixBoxVertical inverted = { fixBar < 470 ? true : false }>
            <div className="icon" onClick={()=>{setShareOpen(!shareOpen)}}><BsShareFill size="15"/></div>
            <div onClick = { ()=>{navigate('/write')}}> <SlNote size="16"/></div>
            <div><BsBookmarkFill size="16" /></div>
            <MarkerCount color = { attractionData!.saves === 0 ? 'red' : 'grey'}>{attractionData!.saves}</MarkerCount>
            <div><AiFillHeart size="16" /></div>
            <MarkerCount>{attractionData!.likes}</MarkerCount>
          </FixBoxVertical>
          <NavBar>
              <button className={ view === 'info'? 'active':''} onClick={()=>{handleView('info')}}>상세페이지</button>
              <button className={ view === 'post'? 'active':''} onClick={()=>{handleView('post')}}>포스트</button>
            </NavBar>
          <Container>
            <h2>{attractionData!.attractionName}</h2>
            <p>{attractionData!.attractionDescription}</p>
            <h3>위치 안내</h3>
            <div>
              <p><FaMapMarkerAlt color="grey" size="14"></FaMapMarkerAlt>{attractionData!.attractionAddress}</p>
            </div>
            <KakaoMap width="60%" height="320px" dataList={attractionData!.attractionAddress} position="absolute" left="20%"></KakaoMap>
          </Container>
        <Post ref={scrollRefContent}>
          <PostHeader>
            <h2>포스트</h2>
            <button onClick = { ()=>{navigate('/write')}}>포스트 작성</button>
          </PostHeader>
          <PostBox postData = {postData}></PostBox>
        </Post>
      </>
      :
      <div>Loading ... </div>}
      </>
  );
};
export default PlaceDetail;
