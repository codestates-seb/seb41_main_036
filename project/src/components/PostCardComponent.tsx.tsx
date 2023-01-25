import styled from "styled-components";
import { BsEye } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrayPostType } from "../pages/Post";

const PostContainer = styled.div<{ margin: string }>`
  margin-left: ${(props) => (props.margin === "0" ? "0" : props.margin)};
  display: flex;
  flex-wrap: wrap;
`;

const PostCard = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 230px;
  background-color: #ffffff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: var(--br-m);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }

  > div:nth-child(1) {
    display: flex;
    justify-content: center;
    height: 150px;

    > img {
      border-top-left-radius: var(--br-m);
      border-top-right-radius: var(--br-m);
      width: 100%;
      height: 150px;
      padding: 5px;
      background-image: cover;
    }
  }
  > div:nth-child(2) {
    height: 50px;
    font-size: 14px;
    clear: both;
    background-color: #ffffff;
    display: flex;

    > div:nth-child(1) {
      width: 80%;
      height: 60px;
      display: flex;
      > img {
        width: 40px;
        height: 40px;
        background-image: cover;
        border-radius: 50%;
        margin: 10px;
      }
      > div {
        margin-top: 10px;
        > div {
          color: #323232;
          font-weight: bold;
        }
        > span {
          font-size: 11px;
          color: grey;
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 13px;
      color: grey;
      padding-bottom: 21px;
      > p {
        margin: 0 5px 0 2px;
      }
    }
  }
  > div:nth-child(3) {
    height: 20px;
    background-color: white;
    margin-left: 15px;
    margin-top: 5px;
    color: grey;
    font-weight: bold;
    font-size: 14px;
  }
`;

const PostCardComponent = ({
  posts,
  limit,
  margin,
  width,
  curPage = 1,
}: {
  posts: ArrayPostType;
  limit: number;
  margin: string;
  width: string;
  curPage?: number;
}) => {
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(posts);
  return (
    <>
      <PostContainer margin={margin}>
        {currentPosts.map((el: any) => {
          return (
            <PostCard key={el.postId} width={width}>
              <div>
                <img src={el.picture}></img>
              </div>
              <div>
                <div>
                  <img src={el.picture}></img>
                  <div>
                    <div>{el.username}</div>
                    <span>{el.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <div>
                  <BsEye></BsEye>
                  <p>{el.views}</p>
                  <AiFillHeart></AiFillHeart>
                  <p>{el.likes}</p>
                </div>
              </div>
              <div>{el.postTitle}</div>
            </PostCard>
          );
        })}
      </PostContainer>
    </>
  );
};

export default PostCardComponent;
