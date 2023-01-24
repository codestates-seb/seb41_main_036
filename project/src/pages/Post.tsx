import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import PostCardComponent from "../components/PostCardComponent.tsx";
import axios from "axios";
import { useRecoilState } from "recoil";
import { locationFilterValue, postInfoData } from "../recoil/state";
import PaginationComponent from "../components/PaginationComponent";

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
  height: 10%;

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
  const [postData, setPostData] = useRecoilState(postInfoData);
  const [checkedList] = useRecoilState(locationFilterValue);
  const [onFilter, setOnFliter] = useState(0);

  useEffect(() => {
    axios
      .get(`/posts/home`)
      .then((res) => {
        setPostData(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleSortPlace = (sort: string) => {
    axios
      .post(`/posts/filter?sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => setPostData(res.data.data))
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
      kor: "리뷰순",
      eng: "posts",
    },
    {
      kor: "인기순",
      eng: "likes",
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
          <LocationFilter />
        </LocationWrapper>
        <PostContainer>
          <PostFilterContainer>
            <span>총 {postData.length}개의 방문 리뷰</span>
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
                </FilterButton>
              ))}
            </div>
          </PostFilterContainer>
          <PostCardComponent
            posts={postData}
            limit={5}
            margin="0"
            width="31%"
          />
          {postData && <PaginationComponent props={postData} limit={7} />}
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Post;
