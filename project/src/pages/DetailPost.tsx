import React from "react";
import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";

const DetailPostWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DetailPostTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;

  .post-title {
    width: 60%;
    text-align: center;
    margin-right: 6.5em;
  }

  > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30px;
    font-size: var(--font-sm);
    margin-left: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
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
const DetailPost = () => {
  return (
    <DetailPostWrapper>
      <DetailPostTitle>
        <h2 className="post-title">
          이곳에 제목을 적어주세요 상자 크기를 화면보다 많이 작게 설정하고
          이렇게 다음줄로 내려가면 됩니다.
        </h2>
        <button>
          <MdModeEdit /> 수정
        </button>
        <button>
          <MdDelete /> 삭제
        </button>
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
    </DetailPostWrapper>
  );
};

export default DetailPost;
