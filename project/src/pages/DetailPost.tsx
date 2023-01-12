import React from "react";
import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";

const DetailPostWrraper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    justify-content: flex-end;
    padding-top: 30px;
  }
  .post-title {
    width: 60%;
    text-align: center;
    margin-right: 6.5em;
  }

  > div > span {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--font-sm);
    margin-left: 10px;
  }
`;
const DetailPost = () => {
  return (
    <DetailPostWrraper>
      <div>
        <h2 className="post-title">
          이곳에 제목을 적어주세요 상자 크기를 화면보다 많이 작게 설정하고
          이렇게 다음줄로 내려가면 됩니다.
        </h2>
        <span>
          <MdModeEdit /> 수정
        </span>
        <span>
          <MdDelete /> 삭제
        </span>
      </div>
      <div>
        <MdPlace /> &nbsp;종로구 사직로 161
      </div>
    </DetailPostWrraper>
  );
};

export default DetailPost;
