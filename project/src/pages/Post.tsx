import React, { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import dummy from "../dummyData.json";

import { Header } from "../components/Header";
import { PlaceType } from "./Place";
import PostCardComponent from "../components/PostCardComponent";
import axios from "axios";
import { useRecoilState } from "recoil";
import { locationFilterValue } from "../recoil/state";

const PostWrapper = styled.div`
  display: flex;
`;

const LocationWrapper = styled.nav`
  width: 17%;
  height: 90vh;
  border-radius: var(--br-m);
  overflow: hidden;
  overflow-y: scroll;
`;

const PostContainer = styled.div`
  margin: 0 20px;
  width: 80%;
  height: 90vh;
`;

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
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

const PostBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  > div {
    min-width: 30%;
    height: 32%;
    border-radius: var(--br-s);
    background-color: white;
  }

  > div > img {
    width: 100%;
    height: 65%;
    border-radius: var(--br-s);
  }
`;

const Post = () => {
  const [postData, setPostData] = useState();
  const [PlaceData, setPlaceData] = useState<PlaceType>([]);
  const [checkedList] = useRecoilState(locationFilterValue);

  const handleSortPlace = (sort: string) => {
    axios
      .post(`/attractions/filter?sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => setPostData(res.data.data))
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      <PostWrapper>
        <LocationWrapper>
          <LocationFilter setPlaceData={setPlaceData} />
        </LocationWrapper>
        <PostContainer>
          <PostFilterContainer>
            <span>총 {dummy.post.length}개의 방문 리뷰</span>
            <div>
              <FilterButton>
                <FilterButton onClick={() => handleSortPlace("newest")}>
                  최신순
                </FilterButton>
                <FilterButton onClick={() => handleSortPlace("posts")}>
                  리뷰순
                </FilterButton>
                <FilterButton onClick={() => handleSortPlace("likes")}>
                  인기순
                </FilterButton>
              </FilterButton>
            </div>
          </PostFilterContainer>
          <PostBox>
            <PostCardComponent />
          </PostBox>
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Post;
