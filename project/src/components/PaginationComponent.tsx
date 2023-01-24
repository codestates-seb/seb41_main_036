import {  useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ArrayPlaceType } from "../pages/Place";
import { ArrayPostType } from "../pages/Post";
import { curPageValue } from "../recoil/state";

export const Page = styled.nav`
  width: 300px;
  margin: 0 auto;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

export const Button: any = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  background: white;
  color: #474a4c;
  font-size: 1rem;
  width: 35px;
  height: 30px;
  line-height: 10px;

  &:hover {
    line-height: 10px;
    width: 35px;
    height: 30px;
    background: hsl(210deg 8% 75%);
    cursor: pointer;
  }

  &[aria-current] {
    border: none;
    line-height: 13px;
    width: 35px;
    height: 30px;
    background: #383838;
    font-weight: bold;
    cursor: revert;
    color: white;
  }
`;

// 사용할 때
// PaginationComponent 임포트해서 사용하시면 됩니다.
const PaginationComponent = ({
  props,
  limit,
}: {
  props: ArrayPostType | ArrayPlaceType;
  limit: number;
}) => {
  const [curPage, setCurPage] = useRecoilState(curPageValue);
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
              setCurPage(start - 5);
              setStart(start - 5);
            }}
            disabled={curPage <= 5 || start < 1}
          >
            {"<"}
          </Button>
          {list.map((_, index) => {
            return (
              <Button
                key={start + index}
                onClick={() => setCurPage(start + index)}
                aria-current={curPage === start + index ? "page" : null}
              >
                {start + index}
              </Button>
            );
          })}
          <Button
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage(start + 5);
              setStart(start + 5);
            }}
            disabled={curPage >= numPages - 5}
          >
            {">"}
          </Button>
        </Nav>
      </Page>
    </>
  );
};
export default PaginationComponent;
