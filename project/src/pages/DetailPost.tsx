import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import dummy from "../dummyData.json";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import PostComment from "../components/PostComment";

const DetailPostWrapper = styled.div`
  width: 100%;

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
`;
const DetailPost = () => {
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
        <h2>{dummy.post[0].title}</h2>
      </DetailPostTitle>
      <DetailPostInfo>
        <div>
          <MdPlace /> &nbsp;종로구 사직로 161
        </div>
        <div>
          <button>
            <RxDoubleArrowLeft />
            &nbsp; 이 명소 방문 리뷰 더보기
          </button>
          <span>2021.01.01</span>
        </div>
      </DetailPostInfo>
      <PostContentContainer>
        <img alt={dummy.post[0].title} src={dummy.post[0].img} />
        <div>여기는 본문이 위치하게 될 것입니다.</div>
        <div>
          <TagsButton>#tags</TagsButton>
        </div>
        <PostContentBottom>
          <div>
            <img alt="userImg" src={dummy.post[0].userImg} />
            {dummy.post[0].username}님의 포스트
          </div>
          <div>
            <div>
              <AiOutlineShareAlt />
              <span>공유</span>
            </div>
            <div>
              <AiFillEye />
              <span>{dummy.post[0].viewCount}</span>
            </div>
            <div>
              <AiFillHeart />
              <span>{dummy.post[0].recommend}</span>
            </div>
          </div>
        </PostContentBottom>
      </PostContentContainer>
      <PostComment />
      <PostComment />
      <PostComment />
      <AddComment>
        <h3>댓글 남기기</h3>
        <div>
          <img src={dummy.post[0].userImg} alt="userImg" />
          <textarea></textarea>
        </div>
      </AddComment>
    </DetailPostWrapper>
  );
};

export default DetailPost;
