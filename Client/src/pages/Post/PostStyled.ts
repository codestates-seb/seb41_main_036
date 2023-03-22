import styled from "styled-components";

export const PostWrapper = styled.div`
  padding-top: 70px;
  display: flex;
  width: 83.5%;
  margin: 0 auto;
  max-width: 1280px;
`;

export const LocationWrapper = styled.nav`
  min-width: 190px;
  max-height: 850px;
  border-radius: var(--br-m);
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: var(--black-200);
  overflow-y: auto;
  height: 100%;
`;

export const PostContainer = styled.div`
  min-height: 788px;
  margin: 20px 0 20px 30px;
  width: 100%;
`;

export const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  height: 50px;
  padding-bottom: 10px;
  > span {
    font-size: var(--font-sm);
    color: var(--black-800);
    font-weight: var(--fw-medium);
  }
`;

export const FilterButton = styled.button`
  margin: 0 10px;
  padding-bottom: 3px;
  border: none;
  background-color: transparent;
  color: var(--black-900);
  font-weight: var(--fw-bold);
  cursor: pointer;
  &.active {
    color: var(--purple-400);
    border-bottom: 1px solid var(--purple-300);
  }
`;

export const PostCardContainer = styled.div`
  width: 100%;
`;
