import React from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { ArrayPlaceType } from "../pages/Place";
import { useNavigate } from "react-router-dom";

const PlaceCardWrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  img {
    height: 170px;
    border-top-left-radius: var(--br-s);
    border-top-right-radius: var(--br-s);
    cursor: pointer;
  }
  :hover {
    box-shadow: 0px 0px 15px 1px rgba(173, 173, 173, 0.2);
    border-radius: var(--br-m);
    transform: translateY(-2px);
  }
`;

const PlaceCardInfoContainer = styled.div`
  background-color: white;
  padding: 0 15px;
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
      font-size: var(--font-sm);
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

      svg {
        width: 17px;
        height: 17px;
        padding: 0 3px;
      }
    }

    span:last-child {
      color: var(--black-800);
      svg {
        color: var(--pink-heart);
        width: 21px;
        height: 21px;
        padding: 0 3px;
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
  limit,
  curPage = 1,
  width,
}: {
  placesData: ArrayPlaceType;
  limit: number;
  curPage?: number;
  width: string;
}) => {
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPlacesData = placesData.slice(indexOfFirstPost, indexOfLastPost);
  const navigate = useNavigate();
  return (
    <>
      {currentPlacesData &&
        currentPlacesData.map((place, index) => (
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
