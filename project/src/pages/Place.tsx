import React, { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import axios from "../utils/axiosinstance";
import PlaceCard from "../components/PlaceCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { LoginState } from "../recoil/state";

const PlaceWrapper = styled.div`
  display: flex;
  max-width: 1280px;
  width: 83.5%;
  margin: 0 auto;
  padding-top: 40px;
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

const PlaceContainer = styled.div`
  margin: 20px 0 20px 30px;
  width: 100%;
`;

const PlaceFilterContainer = styled.div`
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

export const FilterButton = styled.button`
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

const PlaceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px 2%;
`;
const ITEM_LIMIT = 9;

export interface PlaceType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
  isSaved: boolean;
  isVoted: boolean;
}

export interface PageInfoType {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

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

export interface ArrayPlaceType extends Array<PlaceType> {}

const Place = () => {
  const [placesData, setPlacesData] = useState<ArrayPlaceType>();
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [sortClick, setSortClick] = useState(false);
  const [onFilter, setOnFliter] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const { search } = useLocation();
  const totalInfoRef = useRef<PageInfoType | null>(null);

  const [isLogin] = useRecoilState(LoginState);
  const memberId = localStorage.getItem("memberId");

  const searchValue = useMemo(
    () => new URLSearchParams(search).get("keyword"),
    [search]
  );

  const url1 = `/attractions/search?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`;
  const url1_loggedIn = `/attractions/search/${memberId}?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`;
  const url2 = `/attractions/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`;
  const url2_loggedIn = `/attractions/filter/${memberId}?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`;

  useEffect(() => {
    setCurPage(1);
  }, [checkedList]);

  useEffect(() => {
    const search_url = isLogin ? url1_loggedIn : url1;
    const url = isLogin ? url2_loggedIn : url2;
    if (searchValue) {
      axios
        .post(search_url, { provinces: checkedList })
        .then((res) => {
          setPlacesData(res.data.data);
          totalInfoRef.current = res.data.pageInfo;
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(url, {
          provinces: checkedList,
        })
        .then((res) => {
          setPlacesData(res.data.data);
          totalInfoRef.current = res.data.pageInfo;
        })
        .catch((err) => console.error(err));
      return;
    }
  }, [searchValue, curPage, checkedList, sort]);

  const handleSortClick = (idx: number, sort: string) => {
    setOnFliter(idx);
    setSort(sort);
  };

  return (
    <>
      <Header headerColor="var(--black-200)">
        <Header.HeaderTop />
        <Header.HeaderBody
          defaultValue={searchValue ? searchValue : undefined}
          selectedMenu={0}
        />
      </Header>
      <PlaceWrapper>
        <LocationWrapper>
          {placesData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </LocationWrapper>
        <PlaceContainer>
          <PlaceFilterContainer>
            {searchValue ? (
              <span>
                <strong
                  style={{ marginRight: "5px" }}
                >{`'${searchValue}' 검색결과`}</strong>{" "}
                {`총 ${totalInfoRef.current?.totalElements}개의 명소`}{" "}
              </span>
            ) : (
              <span>총 {totalInfoRef.current?.totalElements}개의 명소</span>
            )}
            <div>
              {sortList.map((sort, idx) => (
                <FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSortClick(idx, sort.eng);
                  }}
                >
                  {sort.kor}
                </FilterButton>
              ))}
            </div>
          </PlaceFilterContainer>
          <PlaceBox>
            {placesData &&
              placesData.map((placeInfo) => (
                <PlaceCard
                  key={placeInfo.attractionId}
                  placeInfo={placeInfo}
                  width="32%"
                />
              ))}
          </PlaceBox>
          {placesData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            />
          )}
        </PlaceContainer>
      </PlaceWrapper>
      <Footer />
    </>
  );
};

export default Place;