import { useEffect, useMemo, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
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
import { ArrayPlaceType, PageInfoType } from "../../utils/d";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../../components/Header/MobileHeader";
import { MenuSideBar, MenuButton } from "../MainResponsive";

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

const Place = () => {
  const [placesData, setPlacesData] = useState<ArrayPlaceType>();
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [sort, setSort] = useState(0);
  const { search } = useLocation();
  const totalInfoRef = useRef<PageInfoType | null>(null);
  const ITEM_LIMIT = 9;
  const [isLogin] = useRecoilState(LoginState);
  const memberId = localStorage.getItem("memberId");

  const Mobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const searchValue = useMemo(
    () => new URLSearchParams(search).get("keyword"),
    [search]
  );
  const sortValue = sortList[sort].eng;
  const url1 = `/attractions/search?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url1_loggedIn = `/attractions/search/${memberId}?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url2 = `/attractions/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url2_loggedIn = `/attractions/filter/${memberId}?page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;

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

  const handleSortClick = (sort: number) => {
    setSort(sort);
  };
  const [isNavbarChecked, setIsNavbarChecked] = useState<boolean>(false);

  return (
    <>
      {Mobile ? (
        <MobileHeader
          isNavbarChecked={isNavbarChecked}
          setIsNavbarChecked={setIsNavbarChecked}
        ></MobileHeader>
      ) : (
        <div style={{ display: "fixed" }}>
          <Header headerColor="var(--black-200)">
            <Header.HeaderTop />
            <Header.HeaderBody
              defaultValue={searchValue ? searchValue : undefined}
              selectedMenu={0}
            />
          </Header>
        </div>
      )}
      {isNavbarChecked ? (
        <MenuSideBar>
          <Link to="/attractions">
            <MenuButton>명소</MenuButton>
          </Link>
          <Link to="/posts">
            <MenuButton>포스트</MenuButton>
          </Link>
          <Link to="/map">
            <MenuButton>내 주변 명소찾기</MenuButton>
          </Link>
        </MenuSideBar>
      ) : null}

      <pl.PlaceWrapper>
        {Mobile ? null : (
          <pl.LocationWrapper>
            {placesData && (
              <LocationFilter
                setCurPage={setCurPage}
                checkedList={checkedList}
                setCheckedList={setCheckedlist}
              />
            )}
          </pl.LocationWrapper>
        )}
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
              {sortList.map((sortEl, idx) => (
                <pl.FilterButton
                  className={sort === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSortClick(idx);
                  }}
                >
                  {sortEl.kor}
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
