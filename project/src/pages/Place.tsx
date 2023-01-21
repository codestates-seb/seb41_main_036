import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import axios from "axios";
import { useRecoilState } from "recoil";
import { locationFilterValue } from "../recoil/state";
import PlaceCardComponent from "../components/PlaceCardComponent";

const PlaceWrapper = styled.div`
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

const PlaceContainer = styled.div`
  margin: 0 20px;
  width: 80%;
`;

const PlaceFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: var(--font-base);
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
  > div {
    margin-right: 3%;
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

const PlaceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export type PlaceType = {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
}[];

const Place = () => {
  const [placeData, setPlaceData] = useState<PlaceType>([]);
  const [checkedList] = useRecoilState(locationFilterValue);
  useEffect(() => {
    axios
      .get(`/attractions`)
      .then((res) => {
        setPlaceData(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  //선택한 지역이 []일 때 최신순, 리뷰순, 인기순 클릭 시 화면 렌더 안됨.
  //백단에서 선택한 지역이 null일 시 page번호와 size번호로 조회해서 sort로 반환
  const handleSortPlace = (sort: string) => {
    axios
      .post(`/attractions/filter?sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => setPlaceData(res.data.data))
      .catch((err) => console.error(err));
  };
  console.log(placeData);
  return (
    <>
      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      <PlaceWrapper>
        <LocationWrapper>
          <LocationFilter setPlaceData={setPlaceData} />
        </LocationWrapper>
        <PlaceContainer>
          <PlaceFilterContainer>
            <span>총 {}개의 명소</span>
            <div>
              <FilterButton onClick={() => handleSortPlace("newest")}>
                최신순
              </FilterButton>
              <FilterButton onClick={() => handleSortPlace("posts")}>
                리뷰순
              </FilterButton>
              <FilterButton onClick={() => handleSortPlace("likes")}>
                인기순
              </FilterButton>
            </div>
          </PlaceFilterContainer>
          <PlaceBox>
            {placeData &&
              placeData.map((data, idx) => (
                <PlaceCardComponent key={idx} data={data} />
              ))}
          </PlaceBox>
        </PlaceContainer>
      </PlaceWrapper>
    </>
  );
};

export default Place;
