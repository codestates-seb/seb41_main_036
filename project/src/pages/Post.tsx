import { useState } from "react";
import styled from "styled-components";
import LocationFilter from "../components/LocationFilter";
import dummy from "../dummyData.json";
import { AiFillHeart, AiFillEye } from "react-icons/ai";

const DetailPostWrapper = styled.div`
  display: flex;
`;

const LocationWrapper = styled.nav`
  width: 17%;
  height: 90vh;
  border-radius: var(--br-m);
  overflow: hidden;
  overflow-y: scroll;
`;

const PostWrapper = styled.div`
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
const Post = () => {
  let filter: string[] = ["최신순", "추천순", "리뷰순"];
  const [onFilter, setOnFliter] = useState(0);
  const filtering = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <DetailPostWrapper>
      <LocationWrapper>
        <LocationFilter />
      </LocationWrapper>
      <PostWrapper>
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
      </PostWrapper>
    </DetailPostWrapper>
  );
};

export default Post;
