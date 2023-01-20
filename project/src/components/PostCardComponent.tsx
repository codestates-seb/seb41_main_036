import React from "react";
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import styled from "styled-components";

const PostInfo = styled.div`
  font-size: var(--font-base);
  font-weight: var(--fw-bold);
  display: flex;
  flex-direction: column;

  .user-img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
  }
  > div {
    padding: 3px 10px;
  }
  .info-header {
    display: flex;
    justify-content: space-between;
  }

  .info-view-recommend {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: var(--font-xs);
    font-weight: var(--fw-midium);
  }

  .view {
    color: var(--black-800);
    font-size: var(--font-base);
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

  .info-user {
    display: flex;
    align-items: center;
  }

  .info-username-createdAt {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    font-size: var(--font-base);
  }

  .createdAt {
    font-size: var(--font-xxs);
    color: var(--black-600);
  }

  .info-title {
    font-size: var(--font-xs);
    color: var(--black-700);
  }
`;

const PostCardComponent = () => {
  return (
    <>
      <div>
        {/* <img alt={} src={}/> */}
        <PostInfo>
          <div className="info-header">
            <div className="info-user">
              {/* <img alt={} src={} className="user-img" /> */}
              <div className="info-username-createdAt">
                <span className="username">{}</span>
                <span className="createdAt">{}</span>
              </div>
            </div>
            <div className="info-view-recommend">
              <AiFillEye className="view" />
              &nbsp;
              {}
              <AiFillHeart className="recommend" />
              &nbsp;
              {}
            </div>
          </div>
          <div className="info-title">{}</div>
        </PostInfo>
      </div>
    </>
  );
};

export default PostCardComponent;
