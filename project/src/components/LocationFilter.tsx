import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";

const SelectContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--black-300);
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 21px;
  background-color: transparent;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--black-800);
    font-weight: var(--fw-bold);
    font-size: var(--font-sm);
  }

  > div > button {
    font-weight: var(--fw-bold);
    font-size: var(--font-xs);
    color: var(--purple-300);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: transparent;
  font-size: var(--font-sm);
  padding-bottom: 15px;
  > div {
    padding: 20px 20px 10px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > div > span {
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
  > div > button {
    background-color: transparent;
    border: none;
    font-size: var(--font-xl);
    cursor: pointer;
    height: 22px;
    svg {
      color: var(--black-680);
    }
  }
  > form {
    display: flex;
    align-items: center;
    padding: 5px 20px 5px 25px;
  }

  form > input {
    margin-right: 10px;
    accent-color: var(--purple-300);
  }

  label {
    color: var(--black-700);
    font-weight: var(--fw-medium);
  }
`;

const SelectPost = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
    padding-top: 12px;
  }

  > li > button {
    border: none;
    background-color: transparent;
    margin-right: 10px;
    cursor: pointer;
    color: var(--black-600);
    height: 17px;
    svg {
      width: 17px;
      height: 17px;
    }
  }
`;
const Post = [
  { id: "1", Post: "강남구" },
  { id: "2", Post: "강동구" },
  { id: "3", Post: "강북구" },
  { id: "4", Post: "강서구" },
  { id: "5", Post: "관악구" },
  { id: "6", Post: "광진구" },
  { id: "7", Post: "구로구" },
  { id: "8", Post: "금천구" },
  { id: "9", Post: "노원구" },
  { id: "10", Post: "도봉구" },
  { id: "11", Post: "동대문구" },
  { id: "12", Post: "동작구" },
  { id: "13", Post: "마포구" },
  { id: "14", Post: "서대문구" },
  { id: "15", Post: "서초구" },
  { id: "16", Post: "성동구" },
  { id: "17", Post: "성북구" },
  { id: "18", Post: "성송파구" },
  { id: "19", Post: "양천구" },
  { id: "20", Post: "영등포구" },
  { id: "21", Post: "용산구" },
  { id: "22", Post: "은평구" },
  { id: "23", Post: "종로구" },
  { id: "24", Post: "중구" },
  { id: "25", Post: "중량구" },
];

export default function LocationFilter({
  checkedList,
  setCheckedList,
  setCurPage,
}: {
  checkedList: string[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  setCurPage: Dispatch<SetStateAction<number>>;
}) {
  const [openLocation, setOpenLocation] = useState(true);
  const onCheckItem = (checked: boolean, item: string) => {
    setCurPage(1);
    if (checked) return setCheckedList([...checkedList, item]);
    else return setCheckedList(checkedList.filter((el) => el !== item));
  };
  const onRemove = (item: string) => {
    setCurPage(1);
    setCheckedList(checkedList.filter((el) => el !== item));
  };
  const allRemove = () => {
    setCurPage(1);
    setCheckedList([]);
  };

  return (
    <>
      <SelectContainer>
        <div>
          <span>선택한 지역</span>
          <button onClick={allRemove}>초기화</button>
        </div>
        {checkedList &&
          checkedList.map((item, idx) => (
            <SelectPost key={idx}>
              <li>
                <button onClick={() => onRemove(item)}>
                  <RiCloseLine />
                </button>
                {item}
              </li>
            </SelectPost>
          ))}
      </SelectContainer>
      <SelectBox>
        <div>
          <span>지역</span>
          <button onClick={() => setOpenLocation(!openLocation)}>
            {openLocation ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
        </div>
        {openLocation
          ? Post.map((el) => (
              <form key={el.id}>
                <input
                  className="hi"
                  type="checkbox"
                  id={el.id}
                  value={el.Post}
                  checked={checkedList.includes(el.Post) ? true : false}
                  onChange={(e) =>
                    onCheckItem(e.target.checked, e.target.value)
                  }
                ></input>
                <label htmlFor={el.id}>{el.Post}</label>
              </form>
            ))
          : null}
      </SelectBox>
    </>
  );
}
