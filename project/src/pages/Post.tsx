<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
<<<<<<< HEAD
import PostCardComponent from "../components/PostCardComponent.tsx";
import axios from "axios";
import PaginationComponent from "../components/PaginationComponent";
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
import React, { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import dummy from "../dummyData.json";
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { Header } from "../components/Header";
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

const PostWrapper = styled.div`
  display: flex;
  width: 83.5%;
  margin: 0 auto;
`;

const LocationWrapper = styled.nav`
  min-width: 210px;
  border-radius: var(--br-m);
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 10px;
`;

const PostContainer = styled.div`
  width: 80%;
`;

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  width: 95%;
  height: 50px;

  > span {
    font-size: var(--font-base);
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
`;

const FilterButton = styled.button`
  margin: 0 10px;
  padding-bottom: 3px;
  border: none;
  background-color: transparent;
  color: var(--black-900);
  font-weight: var(--fw-bold);
  cursor: pointer;

  &.active {
    color: var(--purple-400);
    border-bottom: 1px solid black;
  }
`;

export interface PostType {
  postId: number;
  postTitle: string;
  memberId: number;
  username: string;
  picture: string | string[];
  createdAt: string;
  likes: number;
  modifiedAt: number;
  views: number;
}

export interface ArrayPostType extends Array<PostType> {}
const Post = () => {
  const [postsData, setPostsData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [onFilter, setOnFliter] = useState(0);

  useEffect(() => {
    axios
      .get(`/posts/home`)
      .then((res) => {
        setPostsData(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleSortPlace = (sort: string) => {
    axios
      .post(`/posts/filter?size=100&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => setPostsData(res.data.data))
      .catch((err) => console.error(err));
  };
  const handleSort = (idx: number) => {
    setOnFliter(idx);
  };
  const sortList: { kor: string; eng: string }[] = [
    {
      kor: "최신순",
      eng: "newest",
    },
    {
      kor: "인기순",
      eng: "likes",
    },
    {
      kor: "조회순",
      eng: "views",
    },
  ];
  return (
    <>
      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      <PostWrapper>
        <LocationWrapper>
<<<<<<< HEAD
<<<<<<< HEAD
          {postsData && (
            <LocationFilter
              setData={setPostsData}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </LocationWrapper>
        <PostContainer>
          <PostFilterContainer>
            <span>총 {postsData?.length}개의 방문 리뷰</span>
            <div>
              {sortList.map((sort, idx) => (
                <FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSort(idx);
                    handleSortPlace(sort.eng);
                  }}
                >
                  {sort.kor}
=======
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
          <LocationFilter />
        </LocationWrapper>
        <PostContainer>
          <PostFilterContainer>
            <span>총 {dummy.post.length}개의 방문 리뷰</span>
            <div>
              {filter.map((filter, idx) => (
                <FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => filtering(idx)}
                >
                  {filter}
<<<<<<< HEAD
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
                </FilterButton>
              ))}
            </div>
          </PostFilterContainer>
<<<<<<< HEAD
<<<<<<< HEAD
          {postsData && (
            <PostCardComponent
              posts={postsData}
              limit={9}
              margin="0"
              width="31%"
              curPage={curPage}
            />
          )}

          {postsData && (
            <PaginationComponent
              props={postsData}
              limit={9}
              curPage={curPage}
              setCurPage={setCurPage}
            />
          )}
=======
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
          <PostBox>
            {dummy.post.map((el) => (
              <div key={el.locationId}>
                <img alt={el.title} src={el.img} />
                <PostInfo>
                  <div className="info-header">
                    <div className="info-user">
                      <img
                        alt={el.title}
                        src={el.userImg}
                        className="user-img"
                      />
                      <div className="info-username-createdAt">
                        <span className="username">{el.username}</span>
                        <span className="createdAt">{el.createdAt}</span>
                      </div>
                    </div>
                    <div className="info-view-recommend">
                      <AiFillEye className="view" />
                      &nbsp;
                      {el.viewCount}
                      <AiFillHeart className="recommend" />
                      &nbsp;
                      {el.recommend}
                    </div>
                  </div>
                  <div className="info-title">{el.title}</div>
                </PostInfo>
              </div>
            ))}
          </PostBox>
<<<<<<< HEAD
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Post;
