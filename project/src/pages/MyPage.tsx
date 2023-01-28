import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import Button from "../components/Button";
import { BsEye } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import axios from "../utils/axiosinstance";
import { useRecoilState } from "recoil";
import { MemberId } from "../recoil/state";
import { BsFillBookmarkFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
const MyPageWrapper = styled.div`
  height: 96.5vh;
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

  > div:first-child {
    svg {
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    height: 70%;
    margin-top: 4em;
    margin-left: 2em;

    div:nth-child(2) {
      svg {
        cursor: pointer;
      }
    }
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
  border-bottom-left-radius: var(--br-l);
  border-bottom-right-radius: var(--br-l);
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

interface UserType {
  memberId: number;
  username: string;
  memberTitle: null;
  phoneNumber: string;
  address: string;
  picture: string;
  email: string;
  totalMyPosts: number;
  totalMySaves: number;
  posts: [
    {
      postId: number;
      postTitle: string;
      pictureUrl: string;
      views: number;
      likes: number;
      createdAt: string;
      modifiedAt: string;
    }
  ];
  saves: [
    {
      attractionId: number;
      attractionName: string;
      fixedImage: string;
      likes: number;
      saves: number;
    }
  ];
  createdAt: string;
  modifiedAt: string;
}

interface PostsType {
  postId: number;
  postTitle: string;
  pictureUrl: string;
  views: number;
  likes: number;
  createdAt: string;
  modifiedAt: string;
}

interface SaveType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  saves: number;
}

const MyPage = () => {
  const [tab, setTab] = useState(0);
  const [userData, setUserData] = useState<UserType>();
  const [memberId] = useRecoilState(MemberId);
  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });

  const { username, address, phoneNumber } = inputs;

  const getUserProfile = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + `/users/profile/${memberId}`)
      .then((res) => {
        setUserData(res.data.data);
        const { data } = res.data;
        setInputs({
          username: data.username,
          address: data.address,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleTabMenuBar = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setTab(idx);
  };

  const editInfoSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .patch(process.env.REACT_APP_DB_HOST + `/users/edit/${memberId}`, {
        username: username,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((res) => {
        console.log(res);
        setIsEdit(false);
      })
      .catch((err) => console.error(err));
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
          <span>나의 포스트</span>
        </>
      ),
      content: (
        <>
          <h2>Posts</h2>
          <span>{userData && userData.totalMyPosts}개의 포스트</span>
          {userData &&
            userData.posts.map((post) => <MyPageMyPostCard post={post} />)}
        </>
      ),
    },
    {
      title: (
        <>
          <BsFillBookmarkFill />
          <span>나의 즐겨찾기</span>
        </>
      ),
      content: (
        <>
          <h2>My Favorite</h2>
          <span>{userData && userData.totalMySaves}개의 즐겨찾기</span>
          {userData &&
            userData.saves.map((saves) => (
              <MyPageMyFavoriteCard saves={saves} />
            ))}
        </>
      ),
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <HiddenHeader />
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
        {userData && (
          <MyPageContainer>
            <MyPageUserInfo>
              <form>
                <img
                  src="http://drive.google.com/uc?export=view&amp;id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g"
                  alt=""
                />
                <div>
                  {isEdit ? (
                    <input
                      name="username"
                      type="text"
                      defaultValue={userData.username}
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>
                      {userData.username}{" "}
                      <TfiPencil onClick={() => setIsEdit(true)} />
                    </>
                  )}
                </div>
                <div>{userData.memberTitle}</div>
                <div>
                  {isEdit ? (
                    <input
                      name="address"
                      type="text"
                      value={address}
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>
                      <FaMapMarkerAlt /> {userData.address}
                    </>
                  )}
                </div>
                <div>{userData.email}</div>
                <div>
                  {isEdit ? (
                    <input
                      name="phoneNumber"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>{userData.phoneNumber}</>
                  )}
                  {isEdit ? (
                    <button onClick={(e) => editInfoSubmit(e)}>완료</button>
                  ) : null}
                </div>
                <Button
                  type="violet"
                  width="100px"
                  height="40px"
                  text="회원 탈퇴"
                />
              </form>
            </MyPageUserInfo>
            <MyPageMainContainer>
              <div>{tabMenuBarList[tab].content}</div>
            </MyPageMainContainer>
          </MyPageContainer>
        )}
      </MyPageWrapper>
    </>
  );
};

const MyPageCardContainer = styled.div`
  display: flex;
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
    width: 80px;
    height: 100%;
    font-size: var(--font-sm);

    span:first-child {
      margin-right: 6px;
    }
  }

  img {
    min-width: 100px;
    height: 100%;
    border-radius: var(--br-m);
  }

  span {
    display: flex;
    align-items: center;
    font-weight: var(--fw-bold);
    width: 40px;
    padding-top: 10px;
  }
`;

const MyPageMyPostCard = ({ post }: { post: PostsType }) => {
  return (
    <>
      <MyPageCardContainer>
        <h3>{post.postTitle}</h3>
        <div>
          <span>
            <BsEye />
            {post.views}
          </span>
          <span>
            <AiFillHeart />
            {post.likes}
          </span>
        </div>
        <img src={post.pictureUrl} alt="post-img" />
      </MyPageCardContainer>
    </>
  );
};

const MyPageMyFavoriteCard = ({ saves }: { saves: SaveType }) => {
  return (
    <>
      <MyPageCardContainer>
        <h3>{saves.attractionName}</h3>
        <div>
          <span>
            <BsFillBookmarkFill />
            {saves.saves}
          </span>
          <span>
            <AiFillHeart />
            {saves.likes}
          </span>
        </div>
        <img src={saves.fixedImage} alt="post-img" />
      </MyPageCardContainer>
    </>
  );
};

export default MyPage;
