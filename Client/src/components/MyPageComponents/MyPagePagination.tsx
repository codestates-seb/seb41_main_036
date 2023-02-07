import { Dispatch, SetStateAction, useState } from "react";
import { ArrayMyPostsType, ArrayMySavesType } from "../../pages/MyPage/MyPage";
import { Button } from "../Pagination";
import * as mpc from "./MyPageComtentsStyled";

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
      <mpc.Page>
        <mpc.Nav>
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
        </mpc.Nav>
      </mpc.Page>
    </>
  );
};
export default MyPagePagination;
