import { MyPostsType } from "../pages/MyPage";
import { getTime } from "../utils/utils";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isEditMode, UserData } from "../recoil/MyPageState";
import axios from "../utils/axiosinstance";
import { useState } from "react";
interface MyPagePostCardItemProps {
  postInfo: MyPostsType;
  order: number;
}
const MyPagePostCardWrapper = styled.div<{
  EditMode: boolean;
  startTransition: boolean;
}>`
  position: relative;
  height: 18.3%;
  width: 100%;
  margin: 3px;
  border-radius: var(--br-m);
  transition: all 0.5s ease;
  border: 1px solid white;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  background-color: hsl(230, 60%, 99%);
  transform: ${(props) => (props.startTransition ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startTransition ? "0" : "1")};
  :hover {
    background-color: white;
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
  }
  :hover::after {
    display: ${(props) => (props.EditMode ? "block" : "none")};
    position: absolute;
    content: "";
    transform: translateX(-4px);
    z-index: var(--zi-two);
    height: 100%;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
const PostImg = styled.img`
  height: 80%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 30%;
  margin: 0 12px 0 5px;
  :hover {
    cursor: pointer;
  }
`;
const MyPagePostTextInfoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  h2 {
    font-size: var(--font-sm) !important;
    font-weight: var(--fw-bold) !important;
    color: var(--black-800) !important;
    letter-spacing: 0.05rem;
    margin-bottom: 7px;
    :hover {
      cursor: pointer;
    }
  }
`;
const MyPagePostTextInfoRightContainer = styled.div`
  font-size: var(--font-xs);
  color: var(--black-700);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60%;
  margin-right: 15px;
  span {
  }
  .modifiedAt {
    color: var(--purple-300);
    opacity: 0.8;
  }
`;
const PostTextInfoBottom = styled.div`
  display: flex;
  span {
    font-size: var(--font-xs);
    margin-right: 5px;
    color: var(--black-700);
  }
`;
const IconWrapper = styled.div`
  margin-right: 20px;
  position: relative;
  z-index: var(--zi-three);
  svg {
    color: var(--black-680);
    opacity: 0.9;
    height: 40px;
    width: 23px;

    transition: all 0.3s ease;
    cursor: pointer;
  }
  .edit-icon {
    margin-right: 15px;
    :hover {
      color: black;
    }
  }
  .delete-icon:hover {
    color: red;
    opacity: 0.8;
  }
`;
const MyPagePostCardItem = ({ postInfo, order }: MyPagePostCardItemProps) => {
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
                  posts: [
                    ...userData.posts.slice(0, order),
                    ...userData.posts.slice(order + 1),
                  ] as typeof userData.posts,
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
    <MyPagePostCardWrapper
      EditMode={editPosts}
      startTransition={startDeleteAnimation}
    >
      <PostImg src={pictureUrl} onClick={() => navigate(URL_FOR_POSTS)} />
      <MyPagePostTextInfoLeftContainer>
        <h2 onClick={() => navigate(URL_FOR_POSTS)}>{postTitle}</h2>
        <PostTextInfoBottom>
          <span>{`조회수 ${views}`}</span>
          <span>{`좋아요 ${likes}`}</span>
        </PostTextInfoBottom>
      </MyPagePostTextInfoLeftContainer>
      {editPosts ? (
        <IconWrapper>
          <EditIcon
            className="edit-icon"
            onClick={() => navigate(`/edit/${postId}`)}
          />
          <DeleteIcon className="delete-icon" onClick={handleDeleteClick} />
        </IconWrapper>
      ) : (
        <MyPagePostTextInfoRightContainer>
          <span>{` ${getTime(createdAt)} 작성`}</span>
          {createdAt.slice(0, 16) !== modifiedAt.slice(0, 16) && (
            <span className="modifiedAt">{` ${getTime(modifiedAt)} 수정`}</span>
          )}
        </MyPagePostTextInfoRightContainer>
      )}
    </MyPagePostCardWrapper>
  );
};
export default MyPagePostCardItem;
