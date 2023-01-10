import React, { useState } from "react";
import styled from "styled-components";

const DetailPlaceWrraper = styled.div`
  display: flex;
`;

const LocationWrraper = styled.nav`
  width: 20%;
  height: 78vh;
  border: 1px solid black;
  margin-top: 70px;
  border-radius: var(--br-m);
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
    border: 1px solid blue;
    border-radius: var(--br-s);
  }

  > div > img {
    width: 100%;
    height: 80%;
    border-radius: var(--br-s);
  }
`;
const PlaceInfo = styled.div`
  font-size: var(--font-xs);
  font-weight: var(--fw-bold);
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  > div {
    display: flex;
    justify-content: space-between;
  }
`;
const DetailPlace = () => {
  return (
    <DetailPlaceWrraper>
      <LocationWrraper>
        <LocationFilter />
      </LocationWrraper>
      <PlaceWrraper>
        <PlaceFilterContainer>
          <span>총 100곳의 명소</span>
          <div>
            <FilterButton className="active">최신순</FilterButton>
            <FilterButton>추천순</FilterButton>
            <FilterButton>리뷰순</FilterButton>
          </div>
        </PlaceFilterContainer>
        <PlaceContainer>
          <div>
            <img
              alt="서울타워"
              src="https://ak-d.tripcdn.com/images/1i65b2215c11x5k3415B1_W_670_10000.jpg?proc=source/trip"
            ></img>
            <PlaceInfo>
              <div>
                <span>서울타워</span>
                <div>
                  <span>즐겨찾기</span>
                  <span>추천</span>
                </div>
              </div>
              <span>리뷰</span>
            </PlaceInfo>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </PlaceContainer>
      </PlaceWrraper>
    </DetailPlaceWrraper>
  );
};

const SelectContainer = styled.div`
  width: 100%;
  height: 30%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: var(--br-m);

  .select-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
  }

  .select-bottom {
    display: flex;
    justify-content: space-between;
    height: 30%;
  }
`;

const SelectBox = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;

  > form {
    padding: 5px 30px;
  }
  > form > input {
    margin-right: 10px;
    accent-color: var(--purple-300);
  }
`;

const SelectInput = styled.input`
  &:checked {
    background-color: black;
  }
`;
function LocationFilter() {
  const [checkedList, setCheckedList] = React.useState([] as string[]);
  console.log(checkedList);
  const onCheckItem = (checked: boolean, item: string) => {
    if (checked) return setCheckedList([...checkedList, item]);
    else return setCheckedList(checkedList.filter((el) => el !== item));
  };
  const onRemove = (item: string) => {
    setCheckedList(checkedList.filter((el) => el !== item));
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
        <div className="select-top">
          <div>
            <span>선택한 지역</span>
            <span>초기화</span>
          </div>
          <div>{checkedList}</div>
        </div>
        <div className="select-bottom">
          <span>지역</span>
          <span>V</span>
        </div>
      </SelectContainer>
      <SelectBox>
        {place.map((el) => (
          <form key={el.id}>
            <SelectInput
              className="hi"
              type="checkbox"
              id={el.id}
              value={el.place}
              checked={checkedList.includes(el.place) ? true : false}
              onChange={(e) => onCheckItem(e.target.checked, e.target.value)}
            ></SelectInput>
            <label htmlFor={el.id}>{el.place}</label>
          </form>
        ))}
      </SelectBox>
    </>
  );
}

export default DetailPlace;
