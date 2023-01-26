<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import PostComment from "../components/PostComment";
import axios from "axios";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const DetailPostWrapper = styled.div`
  width: 83.5%;
  margin: 0 auto;
=======
import React from "react";
import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import dummy from "../dummyData.json";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import PostComment from "../components/PostComment";

const DetailPostWrapper = styled.div`
  width: 100%;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

  > div:first-child {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    padding-right: 20px;
  }
`;

const PostManageButton = styled.button`
  min-width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  font-size: var(--font-sm);
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const DetailPostTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;

  > h2 {
    width: 50%;
    text-align: center;
  }
`;

const DetailPostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;

  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: var(--font-sm);
  }

  > div:last-child > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const PostContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  > img {
    width: 100%;
    height: 300px;
  }

  > div {
    margin-top: 30px;
  }
`;

const TagsButton = styled.button`
  padding: 7px 10px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-s);

  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
`;

const PostContentBottom = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 0;
  border-bottom: 1px solid var(--black-600);

  > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }

  > div:first-child {
    display: flex;
    align-items: center;
    font-weight: var(--fw-bold);
  }

  > div:last-child {
    width: 100px;
    display: flex;
    justify-content: space-around;
  }

  > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--black-700);
    cursor: pointer;
  }

  > div > div > span {
    font-size: var(--font-xs);
    color: var(--black-900);
  }
`;

const AddComment = styled.form`
  margin-top: 20px;
  width: 100%;

  > div {
    margin-top: 20px;
    display: flex;
  }

  > div > img {
    width: 40px;
    height: 40px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div > textarea {
    width: 95%;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    resize: none;
  }
<<<<<<< HEAD

  button {
    position: relative;
    top: 8em;
    right: 6.2em;
  }
`;

interface PostDetailType {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
  comments: [
    {
      commentId: number;
      memberId: number;
      username: string;
      memberPicture: string;
      commentContent: string;
      createdAt: string;
      modifiedAt: string;
    }
  ];
  createdAt: string;
  isVoted: boolean;
  likes: number;
  modifiedAt: string;
  picture: string;
  postContents: string[];
  postHashTags: string[];
  postId: number;
  postImageUrls: string[];
  postTitle: string;
  username: string;
  views: number;
}

const DetailPost = () => {
  const [post, setPost] = useState<PostDetailType>();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        `/comments/upload/1/1`,
        {
          commentContent: comment,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoyLCJzdWIiOiJ0ZXN0NDAwN0BnbWFpbC5jb20iLCJpYXQiOjE2NzQ1OTAzMTEsImV4cCI6MTY3NDYxNTUxMX0.4RtI8-nDeiPOkSizHb84n6I8uv-4k2Mty9fSQbA_vweYAO4PInCQkDapISGzVTERnwEi2oWwCSTSoY-QpOdc_w",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
=======
`;
const DetailPost = () => {
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  return (
    <DetailPostWrapper>
      <div>
        <PostManageButton>
          <MdModeEdit /> 수정
        </PostManageButton>
        <PostManageButton>
          <MdDelete /> 삭제
        </PostManageButton>
      </div>
      <DetailPostTitle>
<<<<<<< HEAD
        <h2>{post?.postTitle}</h2>
      </DetailPostTitle>
      <DetailPostInfo>
        <div>
          <MdPlace /> &nbsp;{post?.attractionAddress}
=======
        <h2>{dummy.post[0].title}</h2>
      </DetailPostTitle>
      <DetailPostInfo>
        <div>
          <MdPlace /> &nbsp;종로구 사직로 161
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        </div>
        <div>
          <button>
            <RxDoubleArrowLeft />
            &nbsp; 이 명소 방문 리뷰 더보기
          </button>
<<<<<<< HEAD
          <span>{post?.createdAt}</span>
        </div>
      </DetailPostInfo>
      <PostContentContainer>
        <img alt={post?.postTitle} src={post?.postImageUrls[0]} />
=======
          <span>2021.01.01</span>
        </div>
      </DetailPostInfo>
      <PostContentContainer>
        <img alt={dummy.post[0].title} src={dummy.post[0].img} />
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        <div>여기는 본문이 위치하게 될 것입니다.</div>
        <div>
          <TagsButton>#tags</TagsButton>
        </div>
        <PostContentBottom>
          <div>
<<<<<<< HEAD
            <img alt="userImg" src={post?.picture} />
            {post?.username}님의 포스트
=======
            <img alt="userImg" src={dummy.post[0].userImg} />
            {dummy.post[0].username}님의 포스트
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
          </div>
          <div>
            <div>
              <AiOutlineShareAlt />
              <span>공유</span>
            </div>
            <div>
              <AiFillEye />
<<<<<<< HEAD
              <span>{post?.views}</span>
            </div>
            <div>
              <AiFillHeart />
              <span>{post?.likes}</span>
=======
              <span>{dummy.post[0].viewCount}</span>
            </div>
            <div>
              <AiFillHeart />
              <span>{dummy.post[0].recommend}</span>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
            </div>
          </div>
        </PostContentBottom>
      </PostContentContainer>
<<<<<<< HEAD
      {post &&
        post.comments.map((comment) => (
          <PostComment key={comment.commentId} comment={comment}></PostComment>
        ))}
      <AddComment>
        <h3>댓글 남기기</h3>
        <div>
          <img src={post?.picture} alt="userImg" />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            width="80px"
            height="35px"
            text="등록"
            onClick={(e) => handleCommentSubmit(e)}
          />
=======
      <PostComment />
      <PostComment />
      <PostComment />
      <AddComment>
        <h3>댓글 남기기</h3>
        <div>
          <img src={dummy.post[0].userImg} alt="userImg" />
          <textarea></textarea>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        </div>
      </AddComment>
    </DetailPostWrapper>
  );
};

export default DetailPost;
