import React, { useState } from "react";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import Button from "../components/Button";
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

  form {
    display: flex;
    flex-direction: column;
    height: 70%;
    margin-top: 4em;
    margin-left: 2em;

    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-bottom: 20px;
    }

    div {
      margin-bottom: 10px;
      font-size: var(--font-sm);
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      font-weight: var(--fw-bold);
      font-size: var(--font-xl);
      margin-bottom: 20px;
      svg {
        margin-left: 10px;
      }
    }
    div:nth-child(3) {
      color: var(--black-800);
      font-size: var(--font-base);
      font-weight: var(--fw-bold);
    }
    div:nth-child(4) {
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        color: var(--purple-400);
      }
    }
    button {
      position: relative;
      top: 13em;
    }
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
            <div>
              개구리 뒷다리 <TfiPencil />
            </div>
            <div>초보 여행자</div>
            <div>
              <FaMapMarkerAlt /> 서울시 동작구
            </div>
            <div>abcdefg@gmail.com</div>
            <div>010-1234-5678</div>
            <Button width="100px" height="40px" text="회원 탈퇴" />
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
