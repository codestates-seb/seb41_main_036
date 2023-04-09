import styled, { css } from "styled-components";
const RankingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  position: relative;
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
  padding: 20px 0 20px 20px;
  overflow: hidden;
  .downArrow-icon {
    margin-left: 20px;
    height: 16px;
    width: 16px;
    color: var(--black-600);
  }
`;
const RankingTitle = styled.span`
  display: flex;
  align-items: center;
  margin: 1px 25px 0 0;
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
const RankingItem = styled.li<{ popOver?: boolean }>`
  transform: ${(props) => (props.popOver ? "none" : "translateY(52px)")};
  display: flex;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${(props) => (props.popOver ? "50px" : "auto")};
    margin-bottom: ${(props) => (props.popOver ? "0" : "40px")};
    color: black;
    padding: ${(props) => (props.popOver ? "10px 20px" : "0")};
    transition: all ease 0.1s;
    border-radius: ${(props) => (props.popOver ? "var(--br-s)" : "0")};
  }
  a:hover {
    background-color: ${(props) =>
      props.popOver ? "var(--black-200)" : "none"};
  }
  a:hover span:nth-child(2) {
    color: ${(props) =>
      props.popOver ? "var(--black-800)" : "var(--purple-300)"};
  }
  a:visited {
    text-decoration: none;
  }
`;
const RankingItemContent = styled.span<{
  currentRank?: boolean;
  attractionName?: boolean;
  address?: boolean;
  rankOrder?: boolean;
  attractionNamePopover?: boolean;
  currentRankPopover?: boolean;
}>`
  display: flex;
  align-items: center;
  transition: all ease 0.3s;
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
    ${(props) =>
    props.attractionNamePopover &&
    css`
      margin-left: 15px;
      font-size: var(--font-sm);
      letter-spacing: 0.03rem;
      color: var(--black-800);
    `}
    ${(props) =>
    props.currentRankPopover &&
    css`
      margin-left: 5px;
      font-size: var(--font-sm);
      font-weight: var(--fw-bold);
    `}
  svg.dash-icon {
    padding-right: 3px;
    width: 17px;
  }
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
  margin: 0 0 0 20px;
`;
const RankingPopover = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 580px;
  width: 80%;
  background-color: white;
  border-radius: var(--br-l);
  overflow: hidden;
  border: 0.5px solid var(--black-250);
`;
const RankingPopoverPart = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 17px 5px;
`;
const PopOverWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: -15px;
  z-index: var(--zi-three);
`;
export {
  RankingWrapper,
  RankingItemWrapper,
  MainRankingWrapper,
  RankingTitle,
  RankingItem,
  RankingItemContent,
  CurrentTimeSpan,
  RankingPopover,
  RankingPopoverPart,
  PopOverWrapper,
};
