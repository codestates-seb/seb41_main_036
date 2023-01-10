import styled from "styled-components";

const DetailPlaceWrraper = styled.div`
  display: flex;
`;

const LocationWrraper = styled.div`
  width: 20%;
  height: 90vh;
  border: 1px solid black;
`;

const PlaceWrraper = styled.div`
  margin: 0 20px;
  width: 80%;
  height: 90vh;
  border: 1px solid red;
`;

const PlaceFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
const DetailPlace = () => {
  return (
    <DetailPlaceWrraper>
      <LocationWrraper></LocationWrraper>
      <PlaceWrraper>
        <PlaceFilterContainer>
          <span>총 100곳의 명소</span>
          <div>
            <FilterButton className="active">최신순</FilterButton>
            <FilterButton>추천순</FilterButton>
            <FilterButton>리뷰순</FilterButton>
          </div>
        </PlaceFilterContainer>
      </PlaceWrraper>
    </DetailPlaceWrraper>
  );
};

export default DetailPlace;
