import styled, { css } from "styled-components";
const RankingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  /* border: 1px solid black; */
  background-color: white;
`;
const MainRankingWrapper = styled.ul`
  max-width: 700px;
  width: 80%;
  height: 55px;
  border-radius: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;
const RankingTitle = styled.span`
  display: flex;
  align-items: center;
  margin-right: 25px;
  font-size: var(--font-sm);
  font-weight: var(--fw-bold);
  color: var(--black-800);
  .doubleup-icon {
    color: var(--purple-300);
    padding-left: 5px;
    width: 17px;
    height: 17px;
  }
`;
const RankingItemWrapper = styled.div<{ startAnimation: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  transition: ${(props) => (props.startAnimation ? "all 0.7s ease" : "none")};
  transform: ${(props) =>
    props.startAnimation ? "translateY(-62px)" : "none"};
`;
const RankingItem = styled.li`
  transform: translateY(52px);
  display: flex;
  margin-bottom: 40px;
`;
const RankingItemContent = styled.span<{
  currentRank?: boolean;
  attractionName?: boolean;
  address?: boolean;
  rankOrder?: boolean;
}>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.currentRank &&
    css`
      font-weight: var(--fw-bold);
      padding-right: 10px;
      font-size: var(--font-sm);
    `}
  ${(props) =>
    props.attractionName &&
    css`
      font-weight: var(--fw-bold);
      font-size: var(--font-md);
      color: var(--black-900);
      padding-top: 1px;
      margin-right: 15px;
    `}
    ${(props) =>
    props.address &&
    css`
      font-size: var(--font-xs);
      color: var(--black-700);
    `}
    ${(props) =>
    props.rankOrder &&
    css`
      font-size: var(--font-sm);
      margin-left: auto;
    `}
  svg.up-icon {
    color: var(--pink-heart);
    padding-right: 3px;
    width: 17px;
  }
  svg.down-icon {
    color: var(--black-400);
    padding-right: 3px;
    width: 17px;
  }
`;
const CurrentTimeSpan = styled.span`
  font-size: var(--font-xs);
  color: var(--black-700);
  margin-left: 20px;
`;
export {
  RankingWrapper,
  RankingItemWrapper,
  MainRankingWrapper,
  RankingTitle,
  RankingItem,
  RankingItemContent,
  CurrentTimeSpan,
};
