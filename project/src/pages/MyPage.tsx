import React, { useState } from "react";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import Button from "../components/Button";
import { BsEye } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
const MyPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MyPageContainer = styled.div`
  width: 83.5%;
  height: 80vh;
  margin: 0 auto;
  background-color: white;
  border-radius: var(--br-l);
  display: flex;
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
const MyPageMainContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-radius: var(--br-l);
  background-color: var(--purple-100);
  color: var(--black-800);

  > div {
    height: 100%;
    padding: 30px;

    > span {
      display: block;
      text-align: right;
      font-weight: var(--fw-bold);
      margin-bottom: 20px;
      margin-right: 5px;
    }
  }
`;

const MyPageCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: var(--br-m);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
  height: 13%;

  h3 {
    width: 70%;
  }

  div {
    display: flex;
    width: 25%;
    height: 100%;
    align-items: flex-end;
    font-size: var(--font-sm);

    svg {
      margin-right: 5px;
    }

    span {
      display: flex;
      align-items: center;
      font-weight: var(--fw-bold);
    }

    span:first-child {
      margin-right: 6px;
    }
  }

  img {
    width: 18%;
    height: 100%;
    border-radius: var(--br-m);
  }
`;

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

const MyPage = () => {
  const [tab, setTab] = useState(0);
  const MyPageMyPostCard = () => {
    return (
      <>
        <MyPageCardContainer>
          <h3>제목이 위치합니다.</h3>
          <div>
            <span>
              <BsEye />
              1.2K
            </span>
            <span>
              <AiFillHeart />
              191K
            </span>
          </div>
          <img
            src="https://www.socialfocus.co.kr/news/photo/201910/5296_7852_5746.jpg"
            alt="post-img"
          />
        </MyPageCardContainer>
      </>
    );
  };

  const MyPageMyFavoriteCard = () => {
    return (
      <>
        <MyPageCardContainer>
          <h3>제목이 위치합니다.</h3>
          <div>
            <span>
              <BsEye />
              1.2K
            </span>
            <span>
              <AiFillHeart />
              191K
            </span>
          </div>
          <img
            src="https://www.socialfocus.co.kr/news/photo/201910/5296_7852_5746.jpg"
            alt="post-img"
          />
        </MyPageCardContainer>
      </>
    );
  };
  const handleTabMenuBar = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setTab(idx);
  };

  const tabMenuBarList = [
    {
      title: (
        <>
          <AiTwotoneHome />
          <span>나의 방문 기록</span>
        </>
      ),
      content: "",
    },
    {
      title: (
        <>
          <MdModeComment />
          <span>방문 리뷰</span>
        </>
      ),
      content: (
        <>
          <h2>Posts</h2>
          <span>Total 32 posts</span>
          <MyPageMyPostCard />
        </>
      ),
    },
    {
      title: (
        <>
          <FaHeart />
          <span>나의 즐겨찾기</span>
        </>
      ),
      content: (
        <>
          <h2>My Favorite</h2>
          <span>Total 32 places</span>
          <MyPageMyFavoriteCard />
        </>
      ),
    },
  ];

  return (
    <MyPageWrapper>
      <MyPageTabBarContainer>
        {tabMenuBarList.map((menu, idx) => (
          <MyPageTabBarMenu
            key={idx}
            onClick={(e) => handleTabMenuBar(e, idx)}
            className={tab === idx ? "onToggle" : ""}
          >
            {menu.title}
          </MyPageTabBarMenu>
        ))}
      </MyPageTabBarContainer>
      <MyPageContainer>
        <MyPageUserInfo>
          <form>
            <img
              src="http://drive.google.com/uc?export=view&amp;id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g"
              alt=""
            />
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
        <MyPageMainContainer>
          <div>{tabMenuBarList[tab].content}</div>
        </MyPageMainContainer>
      </MyPageContainer>
    </MyPageWrapper>
  );
};

export default MyPage;
