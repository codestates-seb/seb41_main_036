import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import dummy from "../dummyData.json";
import { AiFillHeart, AiFillEye } from "react-icons/ai";

const DetailPostWrraper = styled.div`
  display: flex;
`;

const LocationWrraper = styled.nav`
  width: 17%;
  height: 90vh;
  border-radius: var(--br-m);
  overflow: hidden;
  overflow-y: scroll;
`;

const PostWrraper = styled.div`
  margin: 0 20px;
  width: 80%;
  height: 90vh;
`;

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  width: 95%;
  height: 10%;

  > span {
    font-size: var(--font-base);
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
`;

const FilterButton = styled.button`
  margin: 0 10px;
  padding-bottom: 3px;
  border: none;
  background-color: transparent;
  color: var(--black-900);
  font-weight: var(--fw-bold);
  cursor: pointer;

  &.active {
    color: var(--purple-400);
    border-bottom: 1px solid black;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  > div {
    min-width: 30%;
    height: 32%;
    border-radius: var(--br-s);
    background-color: white;
  }

  > div > img {
    width: 100%;
    height: 65%;
    border-radius: var(--br-s);
  }
`;
const PostInfo = styled.div`
  font-size: var(--font-base);
  font-weight: var(--fw-bold);
  display: flex;
  flex-direction: column;

  .user-img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
  }
  > div {
    padding: 3px 10px;
  }
  .info-header {
    display: flex;
    justify-content: space-between;
  }

  .info-view-recommend {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: var(--font-xs);
    font-weight: var(--fw-midium);
  }

  .view {
    color: var(--black-800);
    font-size: var(--font-base);
  }

  .recommend {
    margin-left: 5px;
    color: var(--pink-heart);
  }

  .info-reviewCount {
    display: flex;
    align-items: center;
    font-size: var(--font-xs);
    font-weight: var(--fw-reg);
  }

  .reviewCount {
    color: var(--black-600);
  }

  .info-user {
    display: flex;
    align-items: center;
  }

  .info-username-createdAt {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    font-size: var(--font-base);
  }

  .createdAt {
    font-size: var(--font-xxs);
    color: var(--black-600);
  }

  .info-title {
    font-size: var(--font-xs);
    color: var(--black-700);
  }
`;
const DetailPost = () => {
  let filter: string[] = ["최신순", "추천순", "리뷰순"];
  const [onFilter, setOnFliter] = useState(0);
  const filtering = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <DetailPostWrraper>
      <LocationWrraper>
        <LocationFilter />
      </LocationWrraper>
      <PostWrraper>
        <PostFilterContainer>
          <span>총 {dummy.post.length}개의 방문 리뷰</span>
          <div>
            {filter.map((filter, idx) => (
              <FilterButton
                className={onFilter === idx ? "active" : ""}
                key={idx}
                onClick={() => filtering(idx)}
              >
                {filter}
              </FilterButton>
            ))}
          </div>
        </PostFilterContainer>
        <PostContainer>
          {dummy.post.map((el) => (
            <div key={el.locationId}>
              <img alt={el.title} src={el.img} />
              <PostInfo>
                <div className="info-header">
                  <div className="info-user">
                    <img alt={el.title} src={el.userImg} className="user-img" />
                    <div className="info-username-createdAt">
                      <span className="username">{el.username}</span>
                      <span className="createdAt">{el.createdAt}</span>
                    </div>
                  </div>
                  <div className="info-view-recommend">
                    <AiFillEye className="view" />
                    &nbsp;
                    {el.viewCount}
                    <AiFillHeart className="recommend" />
                    &nbsp;
                    {el.recommend}
                  </div>
                </div>
                <div className="info-title">{el.title}</div>
              </PostInfo>
            </div>
          ))}
        </PostContainer>
      </PostWrraper>
    </DetailPostWrraper>
  );
};

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
function LocationFilter() {
  const [checkedList, setCheckedList] = React.useState([] as string[]);
  const [openPost, setOpenPost] = useState(true);
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
  let Post = [
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
          <button onClick={() => setOpenPost(!openPost)}>
            {openPost ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
        </div>
        {openPost
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
export default DetailPost;
