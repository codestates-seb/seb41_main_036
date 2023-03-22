import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDeleteMode, UserData } from "../../recoil/MyPageState";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import axios from "../../utils/axiosinstance";
import { useState } from "react";
import * as mpc from "./MyPageComtentsStyled";
import { MySavesType } from "../../utils/d";

interface MyPageFavoriteCardItemProps {
  attractionInfo: MySavesType;
}
const MyPageFavoriteCardItem = ({
  attractionInfo,
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
    setStartDeleteAnimation(true);
    setTimeout(
      () =>
        axios
          .post(URL_FOR_SAVES)
          .then((res) => {
            if (userData) {
              setUserData({
                ...userData,
                saves: userData.saves.filter(
                  (el: MySavesType) => el.attractionId !== attractionId
                ) as typeof userData.saves,
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
      <mpc.FavoriteCardContainer
        DeleteMode={BookmarkDelete}
        startAnimation={startDeleteAnimation}
      >
        <mpc.AttractionImage
          src={attractionInfo.fixedImage}
          alt="post-img"
          onClick={() => navigate(`/attractions/detail/${attractionId}`)}
        />
        <mpc.AttractionTextInfo>
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
        </mpc.AttractionTextInfo>
        <DeleteIcon className="mypage-deleteIcon" onClick={handleDeleteClick} />
      </mpc.FavoriteCardContainer>
    </>
  );
};
export default MyPageFavoriteCardItem;
