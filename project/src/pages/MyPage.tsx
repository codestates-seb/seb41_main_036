import React, { useState } from "react";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GrMap } from "react-icons/gr";
const MyPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MyPageContainer = styled.div`
  width: 83.5%;
  height: 75vh;
  margin: 0 auto;
  background-color: white;
  border-radius: var(--br-l);
`;
const MyPageUserInfo = styled.aside`
  width: 20%;
  height: 100%;
  border: 1px solid black;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
`;
const MyPage = () => {
  return (
    <MyPageWrapper>
      <MyPageTabBar />
      <MyPageContainer>
        <MyPageUserInfo>
          <form>
            <img src="http://drive.google.com/uc?export=view&amp;id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g" />
            <ol>
              <li>개구리 뒷다리</li>
              <li>초보 여행자</li>
              <li>
                <GrMap /> 서울시 동작구
              </li>
              <li>abcdefg@gmail.com</li>
              <li>010-1234-5678</li>
            </ol>
          </form>
        </MyPageUserInfo>
      </MyPageContainer>
    </MyPageWrapper>
  );
};

const MyPageTabBarContainer = styled.nav`
  display: flex;
  width: 50%;
  height: 50px;
`;

const MyPageTabBarMenu = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-top-left-radius: var(--br-l);
  border-top-right-radius: var(--br-l);
  background-color: #fdfdfd;
  font-weight: var(--fw-bold);
  color: var(--black-700);
  border: none;
  font-size: var(--font-base);
  cursor: pointer;
  svg {
    margin-right: 10px;
    color: var(--black-500);
  }

  &.onToggle {
    color: var(--purple-400);
    background-color: var(--purple-200);

    svg {
      color: var(--purple-400);
    }
  }
`;

const MyPageTabBar = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <MyPageTabBarContainer>
      <MyPageTabBarMenu className={isToggle ? "onToggle" : ""}>
        <AiTwotoneHome />
        <span>나의 방문 기록</span>
      </MyPageTabBarMenu>
      <MyPageTabBarMenu className={isToggle ? "onToggle" : ""}>
        <MdModeComment />
        <span>방문 리뷰</span>
      </MyPageTabBarMenu>
      <MyPageTabBarMenu className={isToggle ? "onToggle" : ""}>
        <FaHeart />
        <span>나의 즐겨찾기</span>
      </MyPageTabBarMenu>
    </MyPageTabBarContainer>
  );
};

export default MyPage;
