import { useEffect, useState, useRef } from "react";

import {
  RankingWrapper,
  MainRankingWrapper,
  RankingItem,
  RankingTitle,
  RankingItemWrapper,
  RankingItemContent,
  CurrentTimeSpan,
} from "./style";
import rankingData from "../../data/RankingData";
import { RxDoubleArrowUp as DoubleUpIcon } from "react-icons/rx";
import {
  TiArrowSortedUp as UpIcon,
  TiArrowSortedDown as DownIcon,
} from "react-icons/ti";
import { BsDash as DashIcon } from "react-icons/bs";
interface optionsType {
  dateStyle: "medium";
  timeStyle: "short";
}
const options: optionsType = {
  dateStyle: "medium",
  timeStyle: "short",
};
const Ranking = () => {
  const [currentAttraction, setCurrentAttraction] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const newRankingData = [...rankingData, ...rankingData.slice(0, 1)];
  const currentTime = new Intl.DateTimeFormat("ko", options).format(new Date());
  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setStartAnimation(true);
      setTimeout(() => {
        setStartAnimation(false);
        setCurrentAttraction((p) => (p + 1) % 10);
      }, 700);
    }, 5000);
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, []);
  return (
    <RankingWrapper>
      <MainRankingWrapper>
        <RankingTitle>
          지금 뜨는 곳<DoubleUpIcon className="doubleup-icon" />
        </RankingTitle>
        <RankingItemWrapper startAnimation={startAnimation}>
          {newRankingData
            .slice(currentAttraction, (currentAttraction + 2) % 12)
            .map((el) => (
              <RankingItem key={el.id}>
                <RankingItemContent currentRank>
                  {el.currentRank}
                </RankingItemContent>
                <RankingItemContent attractionName>
                  {el.name}
                </RankingItemContent>
                <RankingItemContent address>{el.address}</RankingItemContent>
                <RankingItemContent rankOrder>
                  <ArrowIconGenerator difference={el.rankOrder} />
                </RankingItemContent>
              </RankingItem>
            ))}
        </RankingItemWrapper>
      </MainRankingWrapper>
      <CurrentTimeSpan>{`${currentTime} 기준`}</CurrentTimeSpan>
    </RankingWrapper>
  );
};

interface ArrowIconGeneratorProps {
  difference: number;
}
const ArrowIconGenerator = ({ difference }: ArrowIconGeneratorProps) => {
  if (difference === 0)
    return (
      <>
        <DashIcon />
      </>
    );
  if (difference > 0)
    return (
      <>
        <UpIcon className="up-icon" />
        {difference}
      </>
    );
  if (difference < 0)
    return (
      <>
        <DownIcon className="down-icon" />
        {Math.abs(difference)}
      </>
    );
  return <></>;
};
export default Ranking;
