import { useState } from "react";
import dummy from "../dummyData.json";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import { MdModeComment } from "react-icons/md";

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
          <span>총 {dummy.place.length}개의 명소</span>
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
          {dummy.place.map((el) => (
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
export default DetailPlace;
