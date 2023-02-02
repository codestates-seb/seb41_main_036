import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillHeart as LikeIcon } from "react-icons/ai";
import { BsFillBookmarkFill as BookmarkIcon } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { PlaceType } from "../pages/Place";
import { useRecoilState } from "recoil";
import { LoginState } from "../recoil/state";
import Axios from "../utils/axiosinstance";
import Modal from "./Modal";
import { getCurrentCount } from "../utils/utils";
const PlaceCard = ({
  placeInfo,
  width,
}: {
  placeInfo: PlaceType;
  width: string;
}) => {
  const [currentBookmark, setCurrentBookmark] = useState(placeInfo.isSaved); //로컬 북마트 상태 저장
  const [currentLike, setCurrentLike] = useState(placeInfo.isVoted);
  const [isLogin] = useRecoilState(LoginState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const {
    attractionId,
    likes: likesData,
    saves: savesData,
    isSaved,
    isVoted,
  } = placeInfo;
  const URL_FOR_SAVES = `/attractions/saves/${attractionId}`;
  const URL_FOR_LIKES = `/attractions/likes/${attractionId}`;
  const handleBookmarkClick = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    Axios.post(URL_FOR_SAVES).then((res) => {
      setCurrentBookmark(res.data.data.isSaved);
    });
  };
  const handleLikeClick = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    Axios.post(URL_FOR_LIKES).then((res) => {
      setCurrentLike(res.data.data.isVoted);
    });
  };
  return (
    <>
      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}
      <PlaceCardWrapper key={attractionId} width={width}>
        <img
          alt={placeInfo.attractionName}
          src={placeInfo.fixedImage}
          onClick={() => navigate(`/attractions/detail/${attractionId}`)}
        ></img>
        <PlaceCardInfoContainer>
          <div>
            <div
              onClick={() => navigate(`/attractions/detail/${attractionId}`)}
            >
              {placeInfo.attractionName}
            </div>
            <div>
              <PlaceCardTopIcon changeColor={currentBookmark}>
                <BookmarkIcon
                  className="place-bookmark-icon"
                  onClick={handleBookmarkClick}
                />
                {getCurrentCount(savesData, isSaved, currentBookmark)}
              </PlaceCardTopIcon>
              <PlaceCardTopIcon changeColor={currentLike}>
                <LikeIcon
                  className="place-like-icon"
                  onClick={handleLikeClick}
                  style={{ color: currentLike ? "red" : "grey" }}
                />
                {getCurrentCount(likesData, isVoted, currentLike)}
              </PlaceCardTopIcon>
            </div>
          </div>
          <div>
            <MdModeComment />
            &nbsp; 포스트 {placeInfo.numOfPosts}
          </div>
        </PlaceCardInfoContainer>
      </PlaceCardWrapper>
    </>
  );
};
export default PlaceCard;

const PlaceCardTopIcon = styled.span<{ changeColor: boolean }>`
  .place-bookmark-icon {
    width: 12px;
    height: 12px;
    margin: 0 6px 0 6px;
    color: ${(props) =>
      props.changeColor ? "var(--black-800)" : "var(--black-400)"};
    transition: all 0.2s ease;
    :hover {
      transform: scale(1.05);
      color: var(--black-800) !important;
      cursor: pointer;
    }
  }
  .place-like-icon {
    color: ${(props) =>
      props.changeColor
        ? "var(--pink-heart) !important"
        : "var(--black-400) !important"};
    width: 15px;
    height: 15px;
    margin: 0 6px 0 6px;
    transition: transform 0.2s ease;
    :hover {
      transform: scale(1.05);
      color: var(--pink-heart) !important;
      cursor: pointer;
    }
  }
`;
export const PlaceCardWrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0, 0, 0.6, 1);
  border-radius: var(--br-m);
  box-shadow: 0px 0px 8px rgb(0 0 0 / 8%);

  img {
    aspect-ratio: 16/9;
    min-height: 80%;
    border-top-left-radius: var(--br-s);
    border-top-right-radius: var(--br-s);
    cursor: pointer;
  }
  :hover {
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.05);
    border-radius: var(--br-m);
    /* transform: translateY(-2px); */

    transform: scale(1.02);
  }
`;

const PlaceCardInfoContainer = styled.div`
  background-color: white;
  padding: 0 15px;
  min-height: 60px;
  height: 20%;
  border-bottom-left-radius: var(--br-m);
  border-bottom-right-radius: var(--br-m);

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    font-weight: var(--fw-bold);
    color: var(--black-900);
    div:nth-child(1) {
      font-size: var(--font-sm);
      cursor: pointer;
    }

    div {
      padding: 6px 0 3px 0;
    }
    span {
      display: flex;
      align-items: center;
      color: var(--black-700);
      font-size: var(--font-sm);
    }

    span:last-child {
      color: var(--black-800);
    }
  }
  div:last-child {
    display: flex;
    align-items: center;
    color: var(--black-650);
    font-size: var(--font-xs);
  }
`;
