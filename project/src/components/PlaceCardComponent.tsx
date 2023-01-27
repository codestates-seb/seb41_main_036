import React from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { ArrayPlaceType } from "../pages/Place";
import { useNavigate } from "react-router-dom";

const PlaceCardWrapper = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0, 0, 0.6, 1);
  border-radius: var(--br-m);
  box-shadow: 0px 0px 8px rgb(0 0 0 / 8%);
  img {
    aspect-ratio: 16/9;
    min-height: 80%;
    border-top-left-radius: var(--br-s);
    border-top-right-radius: var(--br-s);
    cursor: pointer;
  }
  :hover {
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.05);
    border-radius: var(--br-m);
    transform: translateY(-2px);
  }
`;

const PlaceCardInfoContainer = styled.div`
  background-color: white;
  padding: 0 15px;
  min-height: 60px;
  height: 20%;
  border-bottom-left-radius: var(--br-m);
  border-bottom-right-radius: var(--br-m);

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    font-weight: var(--fw-bold);
    color: var(--black-900);
    div:nth-child(1) {
      font-size: var(--font-sm);
      cursor: pointer;
    }

    div {
      padding: 6px 0 3px 0;
    }
    span {
      display: flex;
      align-items: center;
      color: var(--black-700);
      font-size: var(--font-sm);

      svg {
        width: 12px;
        height: 12px;
        margin: 0 6px 0 6px;
        color: var(--black-700);
      }
    }

    span:last-child {
      color: var(--black-800);
      svg {
        color: var(--pink-heart);
        width: 15px;
        height: 15px;
        margin: 0 6px 0 6px;
      }
    }
  }
  div:last-child {
    display: flex;
    align-items: center;
    color: var(--black-650);
    font-size: var(--font-xs);
  }
`;

const PlaceCardComponent = ({
  placesData,
  width,
  height,
}: {
  placesData: ArrayPlaceType;
  width: string;
  height: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      {placesData &&
        placesData.map((place, index) => (
          <PlaceCardWrapper key={place.attractionId} width={width}>
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
