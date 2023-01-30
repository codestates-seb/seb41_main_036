import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ArrayMyPostsType, ArrayMySavesType } from "../pages/MyPage";
import { Button } from "./Pagination";

const Page = styled.nav`
  width: 300px;
  margin: 0 auto;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

// 사용할 때
// MyPagePagination 임포트해서 사용하시면 됩니다.
const MyPagePagination = ({
  props,
  limit,
  curPage,
  setCurPage,
}: {
  props: ArrayMyPostsType | ArrayMySavesType;
  limit: number;
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}) => {
  const numPages = Math.ceil(props.length / limit);
  const [start, setStart] = useState(1);
  const list: number[] = [];
  for (let i = 1; i <= numPages; i++) {
    list.push(i);
  }
  return (
    <>
      <Page>
        <Nav>
          <Button
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p - 1);
            }}
            disabled={curPage === 1 || curPage === 0}
          >
            {"<"}
          </Button>
          {list.map((li, index) => {
            return (
              <Button
                key={start + index}
                onClick={() => setCurPage(start + index)}
                selected={li === curPage}
              >
                {start + index}
              </Button>
            );
          })}
          <Button
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p + 1);
            }}
            disabled={curPage === list[list.length - 1] || props.length === 0}
          >
            {">"}
          </Button>
        </Nav>
      </Page>
    </>
  );
};
export default MyPagePagination;
