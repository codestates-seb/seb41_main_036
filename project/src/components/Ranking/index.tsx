import { useEffect, useState, useRef } from "react";
import axios from "../../utils/axiosinstance";
import { getRandomInt } from "../../utils/utils";
import {
  RankingWrapper,
  MainRankingWrapper,
  RankingItem,
  RankingTitle,
  RankingItemWrapper,
  RankingItemContent,
  CurrentTimeSpan,
} from "./style";
// import rankingData from "../../data/RankingData";
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
const RANKING_URL = `attractions/main/rank`;
interface RankingDataType {
  attractionName: string;
  attractionAddress: string;
  currentRank: number;
  rankOrder: number;
}
const Ranking = () => {
  const [RankingData, setRankingData] = useState(Array<RankingDataType>);
  const [currentAttraction, setCurrentAttraction] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  // const newRankingData = [...rankingData, ...rankingData.slice(0, 1)];
  const currentTime = new Intl.DateTimeFormat("ko", options).format(new Date());
  useEffect(() => {
    axios.get(RANKING_URL).then((res) => {
      let newRankingData = res.data.data;
      newRankingData = newRankingData.map(
        (info: RankingDataType, i: number) => ({
          ...info,
          rankOrder: getRandomInt(i * -1, 20),
          currentRank: i,
        })
      );
      setRankingData([...newRankingData, ...newRankingData.slice(0, 1)]);
      console.log(res.data.data);
    });
  }, []);

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
          {RankingData &&
            RankingData.slice(
              currentAttraction,
              (currentAttraction + 2) % 12
            ).map((el) => (
              <RankingItem key={el.attractionName}>
                <RankingItemContent currentRank>
                  {el.currentRank + 1}
                </RankingItemContent>
                <RankingItemContent attractionName>
                  {el.attractionName}
                </RankingItemContent>
                <RankingItemContent address>
                  {el.attractionAddress}
                </RankingItemContent>
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
