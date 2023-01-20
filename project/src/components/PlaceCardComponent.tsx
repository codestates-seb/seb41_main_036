import React from "react";
import styled from "styled-components";
import { PlaceType } from "../pages/Place";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";

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

export type PlaceDataType = {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
};

const PlaceCardComponent = ({ data }: { data: PlaceDataType }) => {
  return (
    <>
      <div key={data.attractionId}>
        <img alt={data.attractionName} src={data.fixedImage}></img>
        <PlaceInfo>
          <div className="info-title">
            {data.attractionName}
            <div className="info-bookmark-recommend">
              <BsFillBookmarkFill className="bookmark" /> {data.saves}
              <AiFillHeart className="recommend" /> {data.likes}
            </div>
          </div>
          <div className="info-reviewCount">
            <MdModeComment className="reviewCount" /> 포스트 {data.numOfPosts}
          </div>
        </PlaceInfo>
      </div>
    </>
  );
};

export default PlaceCardComponent;
