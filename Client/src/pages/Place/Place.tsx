import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LocationFilter from "../../components/LocationFilter";
import { Header } from "../../components/Header";
import axios from "../../utils/axiosinstance";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import { useRecoilState } from "recoil";
import { LoginState } from "../../recoil/state";
import EmptyResult from "../../components/EmptyResult";
import * as pl from "./PlaceStyled";

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
  const [onFilter, setOnFliter] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const { search } = useLocation();
  const totalInfoRef = useRef<PageInfoType | null>(null);
  const ITEM_LIMIT = 9;
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
      <div style={{ display: "fixed" }}>
        <Header headerColor="var(--black-200)">
          <Header.HeaderTop />
          <Header.HeaderBody
            defaultValue={searchValue ? searchValue : undefined}
            selectedMenu={0}
          />
        </Header>
      </div>
      <pl.PlaceWrapper>
        <pl.LocationWrapper>
          {placesData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </pl.LocationWrapper>
        <pl.PlaceContainer>
          <pl.PlaceFilterContainer>
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
                <pl.FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSortClick(idx, sort.eng);
                  }}
                >
                  {sort.kor}
                </pl.FilterButton>
              ))}
            </div>
          </pl.PlaceFilterContainer>
          <pl.PlaceBox>
            {!totalInfoRef.current?.totalElements && searchValue && (
              <EmptyResult
                message="다른 검색어를 입력해보세요"
                subtitle={false}
              />
            )}
            {placesData?.length ? (
              placesData.map((placeInfo) => (
                <PlaceCard
                  key={placeInfo.attractionId}
                  placeInfo={placeInfo}
                  width="32%"
                />
              ))
            ) : (
              <>
                {!searchValue && (
                  <EmptyResult
                    message="등록된 명소가 없습니다"
                    subtitle={false}
                  />
                )}
              </>
            )}
          </pl.PlaceBox>
          {placesData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            />
          )}
        </pl.PlaceContainer>
      </pl.PlaceWrapper>
      <Footer />
    </>
  );
};

export default Place;
