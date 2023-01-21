import React from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";

export type PlaceDataType = {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
};

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

const PlaceCardComponent = ({ data }: { data: PlaceDataType }) => {
  return (
    <>
      <PlaceCardWrapper>
        <img alt={data.attractionName} src={data.fixedImage}></img>
        <PlaceCardInfoContainer>
          <div>
            {data.attractionName}
            <div>
              <span>
                <BsFillBookmarkFill /> {data.saves}
              </span>
              <span>
                <AiFillHeart /> {data.likes}
              </span>
            </div>
          </div>
          <div>
            <MdModeComment />
            &nbsp; 포스트 {data.numOfPosts}
          </div>
        </PlaceCardInfoContainer>
      </PlaceCardWrapper>
    </>
  );
};

export default PlaceCardComponent;
