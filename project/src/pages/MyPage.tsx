import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import Button from "../components/Button";
import axios from "../utils/axiosinstance";
import { useRecoilState } from "recoil";
import { AuthToken, LoggedUser, LoginState, MemberId } from "../recoil/state";
import { UserData, isDeleteMode, isEditMode } from "../recoil/MyPageState";
import { BsFillBookmarkFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
import { useNavigate } from "react-router-dom";
import MyPagePagination from "../components/MyPagePagination";
import Notification from "../components/Notification";
import MyPageFavoriteCardItem from "../components/MyPageFavoriteCardItem";
import MyPagePostCardItem from "../components/MyPagePostCardItem";
import DaumPostcode from "react-daum-postcode";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";

const MyPageWrapper = styled.div`
  height: calc(100vh - 33px);
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
  display: flex;
`;
const MyPageUserInfo = styled.aside`
  width: 20%;
  height: 100%;
  letter-spacing: 0.03rem;
  > div:first-child {
    svg {
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    height: 85%;

    div:nth-child(3) {
      svg {
        cursor: pointer;
        margin-left: 25%;
        color: var(--black-800);
        :hover {
          color: var(--purple-300);
        }
      }
    }
    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-bottom: 20px;
    }

    div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: var(--font-sm);
      color: var(--black-900);
      svg {
        color: var(--black-500);
        margin-right: 3px;
      }
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
  }
  input {
    color: var(--black-900);
    top: 10em;
    height: 30px;
    padding: 8px 7px 6px;
    margin-top: 5px;
    border: none;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid var(--black-500);
    background-color: var(--black-200);
    transition: all 0.3s ease;
    :focus {
      outline: none;
      border-bottom: 1px solid var(--purple-300);
      background-color: hsl(235, 100%, 97%);
    }
    &::selection {
      background-color: var(--purple-300);
      color: white;
    }
  }
`;
const MyPageMainContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-bottom-left-radius: var(--br-l);
  border-bottom-right-radius: var(--br-l);
  background-color: hsl(223, 64%, 98%);
  box-shadow: 0px 20px 20px -20px rgba(184, 184, 184, 0.5);
  color: var(--black-800);

  > div {
    height: 100%;
    padding: 30px;
    > span {
      text-align: right;
      font-weight: var(--fw-base);
      font-size: var(--font-sm);
      margin: 0 5px 10px 0;
    }
  }
  h2 {
    font-size: var(--font-base);
    font-weight: var(--fw-md);
    letter-spacing: 0.03rem;
    display: inline;
  }
`;

const MyPageTabBarContainer = styled.nav`
  display: flex;
  width: 50%;
  height: 50px;
`;

const MyPageTabBarMenu = styled.button`
  font-family: "Pretendard variable";
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
  width: 100%;
  height: 100%;
  border-top-left-radius: var(--br-l);
  border-top-right-radius: var(--br-l);
  background-color: #fdfdfd;
  font-weight: var(--fw-bold);
  color: var(--black-700);
  border: none;
  font-size: var(--font-sm);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  svg {
    transition: all 0.2s ease-in-out;
    margin: 0 10px 0px 0;
    color: var(--black-500);
  }

  &.onToggle {
    color: var(--purple-400);
    background-color: #f6f8fd;

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
  cursor: pointer;
`;

const LogoContainer = styled.div`
  svg {
    margin-right: 5px;
  }
  span {
    display: flex;
    align-items: center;
    font-weight: var(--fw-medium);
    margin-bottom: 10px;
  }
  :hover {
    cursor: pointer;
    color: var(--purple-300);
  }
`;
const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  color: var(--black-700);
  width: 30px;
  position: relative;
  top: 2.5em;
  left: 1.6em;
  border: none;
  background-color: transparent;
  margin-left: 45%;
  margin-top: 3%;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

export interface UserType {
  memberId: number;
  username: string;
  memberTitle: null;
  phoneNumber: string;
  address: string;
  picture: string;
  email: string;
  totalMyPosts: number;
  totalMySaves: number;
  posts:
    | [
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
  saves:
    | {
        attractionId: number;
        attractionName: string;
        fixedImage: string;
        likes: number;
        saves: number;
      }[];
  createdAt: string;
  modifiedAt: string;
}
const DeleteButton = styled.button<{
  BookMarkDelete?: boolean;
  EditPosts?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: var(--black-275);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 7px 8px 5px;

  color: ${(props) => (props.BookMarkDelete ? "var(--black-800)" : "red")};
  opacity: 0.7;

  :hover {
    background-color: ${(props) =>
      props.BookMarkDelete ? "var(--black-600)" : "red"};
    opacity: 0.8;
    border-radius: 10px;
    color: white;
  }
`;

const EditButton = styled.button<{ EditPosts: boolean }>`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: var(--black-275);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 7px 8px 5px;

  color: ${(props) => (props.EditPosts ? "var(--black-800)" : "#33b864")};

  :hover {
    background-color: ${(props) =>
      props.EditPosts ? "var(--black-600)" : "#33b864"};
    opacity: 0.8;
    border-radius: 10px;
    color: white;
  }
`;
const MyPageMainTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: var(--font-sm);
  }
`;
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
  // const [userData, setUserData] = useState<UserType>();
  const [userData, setUserData] = useRecoilState(UserData);
  const [memberId] = useRecoilState(MemberId);
  const [isEdit, setIsEdit] = useState(false);
  const [bookmarkDelete, setBookmarkDelete] = useRecoilState(isDeleteMode);
  const [editPosts, setEditPosts] = useRecoilState(isEditMode);
  console.log(userData);
  const [inputs, setInputs] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const { username, address, phoneNumber } = inputs;
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState(AuthToken);
  const [LoggerUser, setLoggedUser] = useRecoilState(LoggedUser);
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);

  if (userData?.saves.length === 0) {
    setBookmarkDelete(false);
  }
  const getUserProfile = async () => {
    await axios
      .get(`/users/profile/${memberId}`)
      .then((res) => {
        setUserData(res.data.data);
        console.log(res.data);
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
    return () => setBookmarkDelete(false);
  }, []);

  const handleTabMenuBar = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setTab(idx);
    setBookmarkDelete(false);
    setEditPosts(false);
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
        window.location.replace("/mypage");
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
            navigate(`/`);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleBookMarkDeleteClick = () => {
    setBookmarkDelete((p) => !p);
  };
  const handleEditPostList = () => {
    setEditPosts((p) => !p);
  };
  const tabMenuBarList = [
    {
      title: (
        <>
          <MdModeComment />
          <span>나의 포스트</span>
        </>
      ),
      content: (
        <>
          {userData && userData.totalMyPosts ? (
            <>
              <MyPageMainTopBar>
                <span>
                  <strong>{userData && userData.totalMyPosts}</strong> 개의
                  포스트
                </span>
                <EditButton
                  EditPosts={editPosts}
                  className="edit-posts"
                  onClick={handleEditPostList}
                >
                  {editPosts ? `편집 완료` : `편집`}
                </EditButton>{" "}
              </MyPageMainTopBar>
              <MyPageMyPostCard posts={userData.posts} limit={5} />
            </>
          ) : (
            <Notification type="notFound" message=" 등록한 포스트가 없습니다" />
          )}
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
          {userData && userData.totalMySaves ? (
            <>
              <MyPageMainTopBar>
                <span>
                  <strong>{userData && userData.totalMySaves}</strong> 개의
                  즐겨찾기
                </span>
                <DeleteButton
                  BookMarkDelete={bookmarkDelete}
                  className="delete-bookmark"
                  onClick={handleBookMarkDeleteClick}
                >
                  {bookmarkDelete ? "삭제 완료" : "삭제"}
                </DeleteButton>{" "}
              </MyPageMainTopBar>
              <MyPageMyFavoriteCard saves={userData.saves} limit={6} />
            </>
          ) : (
            <Notification
              type="notFound"
              message="즐겨찾기한 명소가 없습니다"
            />
          )}
        </>
      ),
    },
    {
      title: (
        <>
          <AiTwotoneHome />
          <span>나의 방문 기록</span>
        </>
      ),
      content: (
        <div style={{ height: "100%" }}>
          {/* <div>님의 방문기록 입니다.</div> */}
          <Notification type="noAddress" message="준비중입니다" />
          {/* <Charts userData={userData}></Charts> */}
        </div>
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

  const handleAddress = {
    clickInput: () => {
      setOpenPostcode(!openPostcode);
    },
    selectAddress: (data: any) => {
      setInputs({
        username: username,
        address: data.address,
        phoneNumber: phoneNumber,
      });
      setOpenPostcode(false);
    },
  };

  return (
    <>
      <HiddenHeader selectedMenu={-1} />
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
                <LogoContainer>
                  <span onClick={() => navigate("/")}>
                    <BackIcon />
                    홈으로 돌아가기
                  </span>
                </LogoContainer>
                <img src={userData.picture} alt="" />
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
                      placeholder="주소" //체크체크
                      onClick={handleAddress.clickInput}
                      onChange={(e) => onChange(e)}
                      readOnly
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
                type="enabledGray"
                width="75px"
                height="35px"
                text="회원 탈퇴"
                onClick={deleteUser}
                margin="0"
                fontsize="var(--font-xs)"
              />
            </MyPageUserInfo>
            <MyPageMainContainer>
              {openPostcode && (
                <>
                  <CloseButton onClick={handleAddress.clickInput}>
                    <AiOutlineCloseCircle />
                  </CloseButton>
                  <DaumPostcode
                    style={{
                      // display: "block",
                      position: "absolute",
                      width: "30%",
                      height: "50%",
                      zIndex: 100,
                    }}
                    onComplete={handleAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                  />
                </>
              )}
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
  margin-bottom: 11px;
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
    display: flex;
    align-items: center;
    width: 85px;
    height: 100%;
    font-size: var(--font-sm);
    span:first-child {
      margin-right: 6px;
    }
  }
  img {
    width: 100px;
    height: 35px;
    object-fit: cover;
    border-radius: var(--br-s);
  }
  span {
    display: flex;
    align-items: center;
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

  return (
    <>
      <MyPagePostCardWrapper>
        {posts &&
          currentPosts.map((post) => (
            <MyPagePostCardItem key={post.postId} postInfo={post} />
          ))}
      </MyPagePostCardWrapper>
      <MyPagePagination
        limit={5}
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

  return (
    <>
      <FavoriteCardWrapper>
        {saves &&
          currentSaves.map((save) => (
            <MyPageFavoriteCardItem
              key={save.attractionId}
              attractionInfo={save}
            />
          ))}
      </FavoriteCardWrapper>
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

const FavoriteCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 2%;
  height: 400px;
`;
const MyPagePostCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 390px;
  margin-top: 10px;
  gap: 1px 2%;
`;
