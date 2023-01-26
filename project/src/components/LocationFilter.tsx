import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SelectContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--black-500);
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: var(--black-800);
    font-weight: var(--fw-bold);
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
  overflow-y: scroll;
  background-color: white;

  > div {
    padding: 20px 30px;
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
  }
  > form {
    padding: 5px 30px;
  }

  form > input {
    margin-right: 10px;
    accent-color: var(--purple-300);
  }
`;

const SelectPost = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  > li {
    display: flex;
  }

  > li > button {
    border: none;
    background-color: transparent;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: var(--black-600);
  }
`;
export default function LocationFilter({
  setData,
  checkedList,
  setCheckedList,
}: {
  checkedList: string[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  setData: any;
}) {
  const [openLocation, setOpenLocation] = useState(true);
  const pageLocation = useLocation();
  useEffect(() => {
    axios
      .post(
        `${pageLocation.pathname}/filter?page=1&size=100&sort=newest`,
        {
          provinces: checkedList,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoyLCJzdWIiOiJ0ZXN0NDAwN0BnbWFpbC5jb20iLCJpYXQiOjE2NzQ2NTQxOTUsImV4cCI6MTY3NDY1NTk5NX0.IqcPKaUlNhWIiVme_WWSRJcSnY09BrxfYRlPSkT--Jr3tPDcczt5qMkCajdwLLkOu4D-czpwvdle_vzcKqwCfw",
          },
        }
      )
      .then((res) => {
        if (pageLocation.pathname === "/attractions") setData(res.data.data);
        if (pageLocation.pathname === "/posts") setData(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [checkedList]);
  const onCheckItem = (checked: boolean, item: string) => {
    if (checked) return setCheckedList([...checkedList, item]);
    else return setCheckedList(checkedList.filter((el) => el !== item));
  };
  const onRemove = (item: string) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };
  const allRemove = () => {
    setCheckedList([]);
  };
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
