import { MyPostsType } from "../../pages/MyPage/MyPage";
import { getTime } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isEditMode, UserData } from "../../recoil/MyPageState";
import axios from "../../utils/axiosinstance";
import { useState } from "react";
import * as mpc from './MyPageComtentsStyled'
interface MyPagePostCardItemProps {
  postInfo: MyPostsType;
}

const MyPagePostCardItem = ({ postInfo }: MyPagePostCardItemProps) => {
  const navigate = useNavigate();
  const [editPosts, setEditPosts] = useRecoilState(isEditMode);
  const [startDeleteAnimation, setStartDeleteAnimation] = useState(false);
  const [userData, setUserData] = useRecoilState(UserData);

  const { postId, postTitle, pictureUrl, views, likes, createdAt, modifiedAt } =
    postInfo;
  const URL_FOR_POSTS = `/posts/detail/${postId}`;
  console.log(createdAt, modifiedAt, createdAt === modifiedAt);

  const handleDeleteClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/posts/delete/${postId}`)
        .then((res) => {
          if (res.status === 204 && userData) {
            setStartDeleteAnimation(true);
            setTimeout(
              () =>
                setUserData({
                  ...userData,
                  posts: userData.posts.filter(
                    (el) => el.postId !== postId
                  ) as typeof userData.posts,
                  totalMyPosts: userData.totalMyPosts - 1,
                }),
              500
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <mpc.MyPagePostCardWrapper
      EditMode={editPosts}
      startTransition={startDeleteAnimation}
    >
      <mpc.PostImg src={pictureUrl} onClick={() => navigate(URL_FOR_POSTS)} />
      <mpc.MyPagePostTextInfoLeftContainer>
        <h2 onClick={() => navigate(URL_FOR_POSTS)}>{postTitle}</h2>
        <mpc.PostTextInfoBottom>
          <span>{`조회수 ${views}`}</span>
          <span>{`좋아요 ${likes}`}</span>
        </mpc.PostTextInfoBottom>
      </mpc.MyPagePostTextInfoLeftContainer>
      {editPosts ? (
        <mpc.IconWrapper>
          <EditIcon
            className="edit-icon"
            onClick={() => navigate(`/edit/${postId}`)}
          />
          <DeleteIcon className="delete-icon" onClick={handleDeleteClick} />
        </mpc.IconWrapper>
      ) : (
        <mpc.MyPagePostTextInfoRightContainer>
          <span>{` ${getTime(createdAt)} 작성`}</span>
          {createdAt.slice(0, 16) !== modifiedAt.slice(0, 16) && (
            <span className="modifiedAt">{` ${getTime(modifiedAt)} 수정`}</span>
          )}
        </mpc.MyPagePostTextInfoRightContainer>
      )}
    </mpc.MyPagePostCardWrapper>
  );
};
export default MyPagePostCardItem;
