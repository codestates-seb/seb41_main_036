import React from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { ArrayPlaceType } from "../pages/Place";
import { useNavigate } from "react-router-dom";

const PlaceCardWrapper = styled.div`
  width: 31.2%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;

  img {
    height: 240px;
    border-top-left-radius: var(--br-m);
    border-top-right-radius: var(--br-m);
    cursor: pointer;
  }
`;

const PlaceCardInfoContainer = styled.div`
  background-color: white;
  padding: 0 10px;
  min-height: 60px;
  border-bottom-left-radius: var(--br-m);
  border-bottom-right-radius: var(--br-m);

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-weight: var(--fw-bold);

    div:nth-child(1) {
      cursor: pointer;
    }

    div {
      padding-bottom: 3px;
    }
    span {
      display: flex;
      align-items: center;
      color: var(--black-700);
      font-size: var(--font-sm);
      margin-right: 5px;
    }

    span:last-child {
      color: var(--black-800);
      svg {
        color: var(--pink-heart);
        font-size: 17px;
      }
    }
  }
  div:last-child {
    display: flex;
    align-items: center;
    color: var(--black-600);
    font-size: var(--font-sm);
  }
`;

const PlaceCardComponent = ({
  placesData,
  limit,
  curPage = 1,
}: {
  placesData: ArrayPlaceType;
  limit: number;
  curPage?: number;
}) => {
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPlacesData = placesData.slice(indexOfFirstPost, indexOfLastPost);
  const navigate = useNavigate();
  return (
    <>
      {currentPlacesData &&
        currentPlacesData.map((place, index) => (
          <PlaceCardWrapper key={place.attractionId}>
            <img
              alt={place.attractionName}
              src={place.fixedImage}
              onClick={() =>
                navigate(`/attractions/detail/${place.attractionId}`)
              }
            ></img>
            <PlaceCardInfoContainer>
              <div>
                <div
                  onClick={() =>
                    navigate(`/attractions/detail/${place.attractionId}`)
                  }
                >
                  {place.attractionName}
                </div>
                <div>
                  <span>
                    <BsFillBookmarkFill /> {place.saves}
                  </span>
                  <span>
                    <AiFillHeart /> {place.likes}
                  </span>
                </div>
              </div>
              <div>
                <MdModeComment />
                &nbsp; 포스트 {place.numOfPosts}
              </div>
            </PlaceCardInfoContainer>
          </PlaceCardWrapper>
        ))}
    </>
  );
};

export default PlaceCardComponent;
