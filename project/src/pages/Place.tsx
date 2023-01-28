import React, { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { Header } from "../components/Header";
import axios from "../utils/axiosinstance";
import PlaceCardComponent from "../components/PlaceCardComponent";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const PlaceWrapper = styled.div`
  display: flex;
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
  const [isLoading, setIsLoading] = useState(false);
  const [onFilter, setOnFliter] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const { search } = useLocation();
  const totalInfoRef = useRef<PageInfoType | null>(null);

  const searchValue = useMemo(
    () => new URLSearchParams(search).get("keyword"),
    [search]
  );
  useEffect(() => {
    setCurPage(1);
  }, [checkedList]);
  useEffect(() => {
    setIsLoading(true);

    if (searchValue && !isLoading) {
      axios
        .post(
          `/attractions/search?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`,
          { provinces: checkedList }
        )
        .then((res) => {
          setIsLoading(false);
          setPlacesData(res.data.data);
          totalInfoRef.current = res.data.pageInfo;
        })
        .catch((err) => console.error(err));
    } else if (!isLoading) {
      axios
        .post(
          `/attractions/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`,
          {
            provinces: checkedList,
          }
        )
        .then((res) => {
          setIsLoading(false);
          setPlacesData(res.data.data);
          totalInfoRef.current = res.data.pageInfo;
        })
        .catch((err) => console.error(err));
      return;
    }
  }, [searchValue, curPage, checkedList]);

  const handleSort = (idx: number) => {
    setOnFliter(idx);
  };

  const handleSortPlace = (sort: string) => {
    setSort(sort);
    const URL = searchValue
      ? `/attractions/search?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`
      : `/attractions/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`;

    axios
      .post(URL, {
        provinces: checkedList,
      })
      .then((res) => {
        setPlacesData(res.data.data);
        setSortClick(!sortClick);
      })
      .catch((err) => console.error(err));
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
                    handleSort(idx);
                    handleSortPlace(sort.eng);
                  }}
                >
                  {sort.kor}
                </FilterButton>
              ))}
            </div>
          </PlaceFilterContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <PlaceBox>
                {placesData && (
                  <PlaceCardComponent placesData={placesData} width="32%" />
                )}
              </PlaceBox>
            </>
          )}
          {placesData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            />
          )}
        </PlaceContainer>
      </PlaceWrapper>
    </>
  );
};

export default Place;
