import MobileHeader from "../components/Header/MobileHeader";
import styled, { keyframes } from "styled-components";
import Carousel from "../components/Carousel";
import { useState } from "react";
import {Link} from 'react-router-dom'

// 매끄럽게 메뉴 열리는 모션
export const menuMotion = keyframes`
  from{
    height: 0px;
  }
  to{
    height: 280px;
  }
` 

// 햄버거바를 누르면 나오는 메뉴창 
export const MenuSideBar = styled.div`
  width: 100%;
  height: 20vh;
  background-color: white;
  padding-top: 70px;
  z-index: 1;
  position: absolute;
  top:45px;
	transition-property: height;
	transition-duration: 1s;
  transition-timing-function: ease;
  animation-duration: 0.15s; //진행시간
  animation-timing-function: ease-out; //처음엔 빨리나타다가 서서히 느려진다.
  animation-name: ${menuMotion}; //사용되는 트랜지션 효과이름
  animation-fill-mode: forwards; //트랜지션효과가 나타난 이후 그대로 유지한다.
  border-bottom : 2px solid grey;
`

// 메뉴바 버튼입니다.
export const MenuButton = styled.div`
  width: 100%;
  font-size: 20px;
  margin: 30px auto;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`

// 명소 및 포스트의 창 컴포넌트입니다. 
export const CardBox = styled.div`
  width: 100%;
  height: 57vh;
  `

// 제목 및 더보러가기 버튼 묶음
export const InfoBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 50px 0 15px 10px;
  cursor: pointer;
  >div{
    position: absolute;
    right:20px;
    font-weight: bold;
    padding-top: 6px;
  }
`
export const ImgContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;

`

export const Card = styled.div`
  width: 50%;
  height:210px;
  >span{
    display: block;
    position: relative;
    top:120px;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    color:white;
    z-index: 1;   
    cursor: pointer;

  }
  >img{
    cursor: pointer;
    width: 100%;
    height: 100%;
    filter:brightness(0.5);
    :hover{
      filter:brightness(0.9);
    }
  }
`

const MainMobile = () => {
 const [isNavbarChecked, setIsNavbarChecked] = useState<boolean>(false);

  return(
    <>
    <MobileHeader
      isNavbarChecked={isNavbarChecked}
      setIsNavbarChecked={setIsNavbarChecked}
      ></MobileHeader>
        {isNavbarChecked ? 
          <MenuSideBar>
            <Link to='/attractions'><MenuButton>명소</MenuButton></Link>
            <Link to='/posts'><MenuButton>포스트</MenuButton></Link>
            <Link to='/map'><MenuButton>내 주변 명소찾기</MenuButton></Link>
          </MenuSideBar> : null}
      <Carousel></Carousel>
    </>
  )
}

export default MainMobile;