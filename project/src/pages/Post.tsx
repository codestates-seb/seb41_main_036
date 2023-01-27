import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import PostCardComponent from "../components/PostCardComponent";
import axios from "axios";
import Pagination from "../components/Pagination";
import { PageInfoType } from "./Place";

const ITEM_LIMIT = 9;
const PostWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  width: 83.5%;
  margin: 0 auto;
`;

const LocationWrapper = styled.nav`
  min-width: 190px;
  max-height: 850px;
  border-radius: var(--br-m);
  overflow: hidden;
  margin-top: 10px;
  background-color: white;
  border: 1px solid var(--black-275);
  overflow-y: auto;
  height: 100%;
`;

const PostContainer = styled.div`
  margin: 20px 0 20px 30px;
  width: 100%;
`;

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  height: 50px;
  padding-bottom: 10px;
  > span {
    font-size: var(--font-sm);
    color: var(--black-800);
    font-weight: var(--fw-medium);
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
    border-bottom: 1px solid var(--purple-300);
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
const PostCardContainer = styled.div`
  width: 100%;
`;

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

export interface ArrayPostType extends Array<PostType> {}
const Post = () => {
  const [postsData, setPostsData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [onFilter, setOnFliter] = useState(0);
  const [sort, setSort] = useState("newest");
  const totalInfoRef = useRef<PageInfoType | null>(null);

  useEffect(() => {
    axios
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
        totalInfoRef.current = res.data.pageInfo;
      })
      .catch((err) => console.error(err));
  }, [curPage, checkedList]);

  const handleSortPlace = (sort: string) => {
    setSort(sort);
    axios
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  const handleSort = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <>
      <div style={{ display: "fixed" }}>
        <Header headerColor="var(--grey-background)">
          <Header.HeaderTop />
          <Header.HeaderBody selectedMenu={1} />
        </Header>
      </div>
      <PostWrapper>
        <LocationWrapper>
          {postsData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </LocationWrapper>
        <PostContainer>
          <PostFilterContainer>
            <span>총 {totalInfoRef.current?.totalElements}개의 방문 리뷰</span>
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
          <PostCardContainer>
            {postsData && (
              <PostCardComponent posts={postsData} margin="0" width="32.2%" />
            )}
          </PostCardContainer>
          {postsData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            ></Pagination>
          )}
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Post;
