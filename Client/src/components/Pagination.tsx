import { Dispatch, SetStateAction, FormEvent } from "react";
import styled, { css } from "styled-components";
import { PageInfoType } from "../pages/Place/Place";
import { BsThreeDots as DotsIcon } from "react-icons/bs";

const Pagination = ({
  props,
  setCurPage,
}: {
  props: PageInfoType;
  setCurPage: Dispatch<SetStateAction<number>>;
}) => {
  const pageButtonRange = getPageButtonRange(props);
  const handleButtonClick = (e: FormEvent<HTMLButtonElement>) => {
    setCurPage(Number((e.target as HTMLButtonElement).value));
  };
  return (
    <>
      <Page>
        <Nav>
          <Button
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p - 1);
            }}
            disabled={props.page === 1 || props.totalPages === 0}
          >
            {"<"}
          </Button>
          {pageButtonRange.map((el, i) =>
            el === -1 ? (
              <DotsIcon key={i * el} />
            ) : (
              <Button
                key={el}
                value={el}
                onClick={handleButtonClick}
                selected={el === props.page}
              >
                {el}
              </Button>
            )
          )}
          <Button
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p + 1);
            }}
            disabled={
              props.page === props?.totalPages || props.totalPages === 0
            }
          >
            {">"}
          </Button>
        </Nav>
      </Page>
    </>
  );
};
export default Pagination;

const getPageButtonRange = (pageInfo: PageInfoType) => {
  let range: number[] = [];

  if (pageInfo?.totalPages <= 7) {
    for (let i = 1; i <= pageInfo.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  if (pageInfo.page <= 4) {
    for (let i = 1; i <= 5; i++) {
      range.push(i);
    }
    range.push(-1, pageInfo.totalPages);
    return range;
  }

  if (pageInfo.page >= pageInfo.totalPages - 3) {
    range.push(1, -1);
    for (let i = pageInfo.totalPages - 4; i <= pageInfo.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  range.push(
    1,
    -1,
    pageInfo.page - 1,
    pageInfo.page,
    pageInfo.page + 1,
    -1,
    pageInfo.totalPages
  );
  return range;
};

export const Page = styled.nav`
  padding: 40px 0;
  margin: 0 auto;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 16px;
`;

export const Button: any = styled.button<{ selected: boolean }>`
  border: none;
  border-radius: 4px;
  font-size: var(--font-sm);
  color: var(--black-900);
  width: 25px;
  height: 25px;
  line-height: 10px;
  background-color: transparent;
  &:hover {
    line-height: 10px;
    cursor: pointer;
  }
  ${(props) =>
    props.selected &&
    css`
      border: none;
      line-height: 13px;
      background: var(--black-800);
      font-weight: bold;
      cursor: revert;
      color: white;
    `}
  :disabled {
    pointer-events: none;
    color: var(--black-500);
  }
`;
