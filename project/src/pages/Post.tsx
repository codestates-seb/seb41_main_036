import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import PostCardComponent from "../components/PostCardComponent";
import axios from "axios";
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
                </FilterButton>
              ))}
            </div>
          </PostFilterContainer>
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
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Post;
