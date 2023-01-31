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
import { AuthToken, LoggedUser, LoginState, MemberId } from "../recoil/state";
import { BsFillBookmarkFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
import { useNavigate } from "react-router-dom";
import MyPagePagination from "../components/MyPagePagination";
const MyPageWrapper = styled.div`
  height: 96.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f6f6f6b2;
`;

const MyPageContainer = styled.div`
  width: 83.5%;
  height: 70vh;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: var(--br-l);
  display: flex;
`;
const MyPageUserInfo = styled.aside`
  width: 25%;
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
        width: 20px;
      }
    }
    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-bottom: 15px;
    }
    div {
      margin: 3px 0 3px 0;
      color: var(--black-750);
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
        color: #868686;
        margin-left: 10px;
        :hover {
          color: var(--purple-400);
        }
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
  }
  input {
    height: 30px;
    border-radius: var(--br-m);
    padding: 6px 7px;
    margin-top: 5px;
    border-color: var(--purple-400);
    :focus {
      outline-color: var(--purple-300);
      box-shadow: 0 0 5px blue;
    }
  }
  button {
  }
`;
const MyPageMainContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom-left-radius: var(--br-l);
  border-bottom-right-radius: var(--br-l);
  border-top-right-radius: var(--br-l);
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
  margin-left: 6.2%;
`;

const MyPageTabBarMenu = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27%;
  height: 100%;
  border-top-left-radius: var(--br-l);
  border-top-right-radius: var(--br-l);
  background-color: #fdfdfd;
  font-weight: var(--fw-bold);
  color: var(--black-700);
  border: none;
  font-size: var(--font-sm);
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

const EditSubmitButton = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  background-color: var(--purple-300);
  border-radius: var(--br-m);
  margin-top: 10px;
  color: white;
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

export interface MyPostsType {
  postId: number;
  postTitle: string;
  pictureUrl: string;
  views: number;
  likes: number;
  createdAt: string;
  modifiedAt: string;
}

export interface MySavesType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  saves: number;
}

export interface ArrayMyPostsType extends Array<MyPostsType> {}
export interface ArrayMySavesType extends Array<MySavesType> {}
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
  const naviate = useNavigate();
  const { username, address, phoneNumber } = inputs;
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState(AuthToken);
  const [LoggerUser, setLoggedUser] = useRecoilState(LoggedUser);

  const getUserProfile = async () => {
    await axios
      .get(`/users/profile/${memberId}`)
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
      .patch(`/users/edit/${memberId}`, {
        username: username,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((res) => {
        if (res.status === 200) setIsEdit(false);
      })
      .catch((err) => console.error(err));
  };
  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      axios
        .delete(`/users/delete/${memberId}`)
        .then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
            setAuth("");
            setLoggedUser("");
            axios.defaults.headers.common["Authorization"] = null;
            localStorage.removeItem("Authorization");
            localStorage.setItem("loginStatus", "false");
            localStorage.removeItem("memberId");
            alert("탈퇴가 완료되었습니다.");
            naviate(`/`);
          }
        })
        .catch((err) => console.error(err));
    }
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
          {userData && <MyPageMyPostCard posts={userData.posts} limit={6} />}
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
          {userData && (
            <MyPageMyFavoriteCard saves={userData.saves} limit={6} />
          )}
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
                      placeholder="이름"
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
                      placeholder="주소"
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
                      placeholder="전화번호"
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>{userData.phoneNumber}</>
                  )}
                </div>
                {isEdit ? (
                  <EditSubmitButton onClick={(e) => editInfoSubmit(e)}>
                    완료
                  </EditSubmitButton>
                ) : null}
              </form>
              <Button
                type="violet"
                width="100px"
                height="40px"
                text="회원 탈퇴"
                onClick={deleteUser}
                margin="10px 2em"
              />
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
  background-color: #ffffff;
  border-radius: var(--br-m);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 10%;
  cursor: pointer;
  h3 {
    font-size: 15px;
    width: 75%;
  }
  div {
    width: 85px;
    height: 100%;
    font-size: var(--font-sm);
    span:first-child {
      margin-right: 6px;
    }
  }
  img {
    min-width: 100px;
    height: 100%;
    border-radius: var(--br-s);
  }
  span {
    background-color: #fcfcd0;
    flex-direction: row;
    width: 130px;
    line-height: 50px;
    margin-right: 10px;
  }
`;

const MyPageMyPostCard = ({
  posts,
  limit,
}: {
  posts: ArrayMyPostsType;
  limit: number;
}) => {
  const [curPage, setCurPage] = useState(1);
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const naviate = useNavigate();
  return (
    <>
      {posts &&
        currentPosts.map((post) => (
          <MyPageCardContainer
            key={post.postId}
            onClick={() => naviate(`/posts/detail/${post.postId}`)}
          >
            <h3>{post.postTitle}</h3>
            <div>
              <span>
                <BsEye />
                &nbsp;
                {post.views}
              </span>
              <span>
                <AiFillHeart />
                &nbsp;
                {post.likes}
              </span>
            </div>
            <img src={post.pictureUrl} alt="post-img" />
          </MyPageCardContainer>
        ))}
      <MyPagePagination
        limit={6}
        props={posts}
        setCurPage={setCurPage}
        curPage={curPage}
      />
    </>
  );
};

const MyPageMyFavoriteCard = ({
  saves,
  limit,
}: {
  saves: ArrayMySavesType;
  limit: number;
}) => {
  const [curPage, setCurPage] = useState(1);
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentSaves = saves.slice(indexOfFirstPost, indexOfLastPost);
  const naviate = useNavigate();
  return (
    <>
      {saves &&
        currentSaves.map((save) => (
          <MyPageCardContainer
            key={save.attractionId}
            onClick={() => naviate(`/attractions/detail/${save.attractionId}`)}
          >
            <h3>{save.attractionName}</h3>
            <div>
              <span>
                <BsFillBookmarkFill />
                &nbsp;{save.saves}
              </span>
              <span>
                <AiFillHeart />
                &nbsp;
                {save.likes}
              </span>
            </div>
            <img src={save.fixedImage} alt="post-img" />
          </MyPageCardContainer>
        ))}
      <MyPagePagination
        limit={6}
        props={saves}
        setCurPage={setCurPage}
        curPage={curPage}
      />
    </>
  );
};

export default MyPage;
