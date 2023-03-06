import MobileHeader from "../components/Header/MobileHeader";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { useState } from "react";

const MainWindow = styled.div`
  width: 100%;
  height: 100vh;
  background-color: red;
`
// 햄버거바를 누르면 나오는 메뉴창 
const MenuSideBar = styled.div`
  width: 100%;
  height: 30vh;
  background-color: white;
  /* background-color: red; */
  padding-top: 60px;
  z-index: 1;
  position: absolute;
  top:45px;
`

// 메뉴바 버튼입니다.
const MenuButton = styled.div`
  width: 100%;
  font-size: 20px;
  margin: 30px auto;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
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
              {/* 이쪽에 검색창 붙여주세용 */}
              <MenuButton>명소</MenuButton>
              <MenuButton>포스트</MenuButton>
              <MenuButton>내 주변 명소찾기</MenuButton>
            </MenuSideBar> : null}
    <MainWindow>
      <Carousel></Carousel>
      

    </MainWindow>
    </>
  )
}

export default MainMobile;