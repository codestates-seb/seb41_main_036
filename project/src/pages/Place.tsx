import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdModeComment,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import dummy from "../dummyData.json";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";

const DetailPlaceWrraper = styled.div`
  display: flex;
`;

const LocationWrraper = styled.nav`
  width: 20%;
  height: 90vh;
  border-radius: var(--br-m);
  overflow: hidden;
  overflow-y: scroll;
`;

const PlaceWrraper = styled.div`
  margin: 0 20px;
  width: 80%;
  height: 90vh;
`;

const PlaceFilterContainer = styled.div`
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

const PlaceContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  > div {
    min-width: 30%;
    height: 30%;
    border-radius: var(--br-s);
    background-color: white;
  }

  > div > img {
    width: 100%;
    height: 70%;
    border-radius: var(--br-s);
  }
`;
const PlaceInfo = styled.div`
  font-size: var(--font-base);
  font-weight: var(--fw-bold);
  display: flex;
  flex-direction: column;

  > div {
    padding: 3px;
  }
  .info-title {
    display: flex;
    justify-content: space-between;
  }

  .info-bookmark-recommend {
    display: flex;
    align-items: center;
    font-size: var(--font-xs);
    font-weight: var(--fw-midium);
  }

  .bookmark {
    color: var(--black-800);
  }

  .recommend {
    margin-left: 5px;
    color: var(--pink-heart);
  }

  .info-reviewCount {
    display: flex;
    align-items: center;
    font-size: var(--font-xs);
    font-weight: var(--fw-reg);
  }
  .reviewCount {
    color: var(--black-600);
  }
`;
const DetailPlace = () => {
  let filter: string[] = ["최신순", "추천순", "리뷰순"];
  const [onFilter, setOnFliter] = useState(0);
  const filtering = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <DetailPlaceWrraper>
      <LocationWrraper>
        <LocationFilter />
      </LocationWrraper>
      <PlaceWrraper>
        <PlaceFilterContainer>
          <span>총 {dummy.data.length}개의 명소</span>
          <div>
            {filter.map((filter, idx) => (
              <FilterButton
                className={onFilter === idx ? "active" : ""}
                key={idx}
                onClick={() => filtering(idx)}
              >
                {filter}
              </FilterButton>
            ))}
          </div>
        </PlaceFilterContainer>
        <PlaceContainer>
          {dummy.data.map((el) => (
            <div key={el.locationId}>
              <img alt={el.title} src={el.img}></img>
              <PlaceInfo>
                <div className="info-title">
                  {el.title}
                  <div className="info-bookmark-recommend">
                    <BsFillBookmarkFill className="bookmark" /> {el.bookmark}
                    <AiFillHeart className="recommend" /> {el.recommend}
                  </div>
                </div>
                <div className="info-reviewCount">
                  <MdModeComment className="reviewCount" /> 포스트{" "}
                  {el.reviewCount}
                </div>
              </PlaceInfo>
            </div>
          ))}
        </PlaceContainer>
      </PlaceWrraper>
    </DetailPlaceWrraper>
  );
};

const SelectContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--black-500);
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }

  > div > button {
    font-weight: var(--fw-bold);
    font-size: var(--font-xs);
    color: var(--purple-300);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  background-color: white;

  > div {
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
  }

  > div > span {
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
  > div > button {
    background-color: transparent;
    border: none;
    font-size: var(--font-xl);
    cursor: pointer;
  }
  > form {
    padding: 5px 30px;
  }

  form > input {
    margin-right: 10px;
    accent-color: var(--purple-300);
  }
`;

const SelectPlace = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  > li {
    display: flex;
  }

  > li > button {
    border: none;
    background-color: transparent;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: var(--black-600);
  }
`;
function LocationFilter() {
  const [checkedList, setCheckedList] = React.useState([] as string[]);
  const [openPlace, setOpenPlace] = useState(true);
  const onCheckItem = (checked: boolean, item: string) => {
    if (checked) return setCheckedList([...checkedList, item]);
    else return setCheckedList(checkedList.filter((el) => el !== item));
  };
  const onRemove = (item: string) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };
  const allRemove = () => {
    setCheckedList([]);
  };
  let place = [
    { id: "1", place: "강남구" },
    { id: "2", place: "강동구" },
    { id: "3", place: "강북구" },
    { id: "4", place: "강서구" },
    { id: "5", place: "관악구" },
    { id: "6", place: "광진구" },
    { id: "7", place: "구로구" },
    { id: "8", place: "금천구" },
    { id: "9", place: "노원구" },
    { id: "10", place: "도봉구" },
    { id: "11", place: "동대문구" },
    { id: "12", place: "동작구" },
    { id: "13", place: "마포구" },
    { id: "14", place: "서대문구" },
    { id: "15", place: "서초구" },
    { id: "16", place: "성동구" },
    { id: "17", place: "성북구" },
    { id: "18", place: "성송파구" },
    { id: "19", place: "양천구" },
    { id: "20", place: "영등포구" },
    { id: "21", place: "용산구" },
    { id: "22", place: "은평구" },
    { id: "23", place: "종로구" },
    { id: "24", place: "중구" },
    { id: "25", place: "중량구" },
  ];

  return (
    <>
      <SelectContainer>
        <div>
          <span>선택한 지역</span>
          <button onClick={allRemove}>초기화</button>
        </div>
        {checkedList &&
          checkedList.map((item, idx) => (
            <SelectPlace key={idx}>
              <li>
                <button onClick={() => onRemove(item)}>
                  <RiCloseLine />
                </button>
                {item}
              </li>
            </SelectPlace>
          ))}
      </SelectContainer>
      <SelectBox>
        <div>
          <span>지역</span>
          <button onClick={() => setOpenPlace(!openPlace)}>
            {openPlace ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
        </div>
        {openPlace
          ? place.map((el) => (
              <form key={el.id}>
                <input
                  className="hi"
                  type="checkbox"
                  id={el.id}
                  value={el.place}
                  checked={checkedList.includes(el.place) ? true : false}
                  onChange={(e) =>
                    onCheckItem(e.target.checked, e.target.value)
                  }
                ></input>
                <label htmlFor={el.id}>{el.place}</label>
              </form>
            ))
          : null}
      </SelectBox>
    </>
  );
}
export default DetailPlace;
