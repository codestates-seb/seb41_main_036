import { MySavesType } from "../pages/MyPage";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDeleteMode, UserData } from "../recoil/MyPageState";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import axios from "../utils/axiosinstance";
import { useState } from "react";

const FavoriteCardContainer = styled.div<{
  DeleteMode: boolean;
  startAnimation: boolean;
}>`
  position: relative;
  height: 185px;
  width: 32%;
  background-color: white;
  border-radius: var(--br-m);
  border: 1px solid var(--black-275);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  transition: all 0.5s ease;
  transform: ${(props) => (props.startAnimation ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startAnimation ? "0" : "1")};
  svg {
    position: absolute;
    transform: translateY(50px);
    display: none;
    color: var(--black-900);
    opacity: 0.9;
    height: 80px;
    width: 40px;
    z-index: var(--zi-three);
    transition: all 0.3s ease;
    :hover {
      color: red;
      cursor: pointer;
    }
  }
  :hover::after {
    display: ${(props) => (props.DeleteMode ? "block" : "none")};
    position: absolute;
    content: "";
    z-index: var(--zi-two);
    bottom: 0;
    left: 0;
    height: 182px;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  :hover {
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
    svg {
      display: ${(props) => (props.DeleteMode ? "block" : "none")};
    }
  }
`;
const AttractionImage = styled.img`
  margin-top: 8px;
  object-fit: cover;
  width: 90%;
  height: 60%;
  aspect-ratio: 4/3;
  border-radius: 2px;
  margin-bottom: 2px;
  :hover {
    cursor: pointer;
  }
`;
const AttractionTextInfo = styled.div`
  width: 90%;
  padding: 5px 0;
  color: var(--black-900);
  display: flex;
  span {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: var(--font-xs);
    margin: 4px 8px 4px 0;
    color: var(--black-700);
    border-radius: 10px;
    border: 1px solid var(--black-250);
    background-color: var(--black-200);
    strong {
      color: var(--black-700);
      font-weight: var(--fw-medium);
      margin-left: 3px;
    }
  }
  h3 {
    display: inline;
    font-size: var(--font-sm);
    font-weight: 700;
    letter-spacing: 0.05rem;
    color: var(--black-800);
    margin-left: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
interface MyPageFavoriteCardItemProps {
  attractionInfo: MySavesType;
  order: number;
}
const MyPageFavoriteCardItem = ({
  attractionInfo,
  order,
}: MyPageFavoriteCardItemProps) => {
  const navigate = useNavigate();
  const [BookmarkDelete, setBookmarkDelete] = useRecoilState(isDeleteMode);
  const [userData, setUserData] = useRecoilState(UserData);
  const [startDeleteAnimation, setStartDeleteAnimation] = useState(false);
  const {
    attractionId,
    attractionName,
    saves: savesInfo,
    likes: likesInfo,
  } = attractionInfo;

  const URL_FOR_SAVES = `/attractions/saves/${attractionId}`;

  const handleDeleteClick = () => {
    console.log(userData, "들어옴");
    setStartDeleteAnimation(true);
    setTimeout(
      () =>
        axios
          .post(URL_FOR_SAVES)
          .then((res) => {
            if (userData) {
              setUserData({
                ...userData,
                saves: [
                  ...userData.saves.slice(0, order),
                  ...userData.saves.slice(order + 1),
                ] as typeof userData.saves,
                totalMySaves: userData.totalMySaves - 1,
              });
            }
          })
          .catch(console.log),
      500
    );
  };
  return (
    <>
      <FavoriteCardContainer
        DeleteMode={BookmarkDelete}
        startAnimation={startDeleteAnimation}
      >
        <AttractionImage
          src={attractionInfo.fixedImage}
          alt="post-img"
          onClick={() => navigate(`/attractions/detail/${attractionId}`)}
        />
        <AttractionTextInfo>
          <div>
            <h3 onClick={() => navigate(`/attractions/detail/${attractionId}`)}>
              {attractionName}
            </h3>
            <br></br>
            <span className="mypage-bookmark">
              즐겨찾기
              <strong>{savesInfo}</strong>
            </span>
            <span className="mypage-like">
              좋아요
              <strong>{likesInfo}</strong>
            </span>
          </div>{" "}
        </AttractionTextInfo>
        <DeleteIcon className="mypage-deleteIcon" onClick={handleDeleteClick} />
      </FavoriteCardContainer>
    </>
  );
};
export default MyPageFavoriteCardItem;
