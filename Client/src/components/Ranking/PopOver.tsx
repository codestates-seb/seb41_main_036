import { Link } from "react-router-dom";
import { RankingDataType } from ".";
import {
  RankingItem,
  RankingItemContent,
  RankingPopover,
  RankingPopoverPart,
} from "./style";
import { ArrowIconGenerator } from ".";
import { Dispatch, SetStateAction } from "react";
interface RankingDataProps {
  rankingData: RankingDataType[];
  handleShowPopover: Dispatch<SetStateAction<boolean>>;
}
interface AttractionProps {
  attraction: RankingDataType;
}
const PopOver = ({ rankingData, handleShowPopover }: RankingDataProps) => {
  return (
    <RankingPopover onMouseLeave={() => handleShowPopover(false)}>
      <RankingPopoverPart>
        {rankingData.slice(0, 5).map((el) => (
          <RankingItemPopover key={el.attractionName} attraction={el} />
        ))}
      </RankingPopoverPart>
      <RankingPopoverPart>
        {rankingData.slice(5, 10).map((el) => (
          <RankingItemPopover key={el.attractionName} attraction={el} />
        ))}
      </RankingPopoverPart>
    </RankingPopover>
  );
};
const RankingItemPopover = ({ attraction }: AttractionProps) => {
  return (
    <RankingItem key={attraction.attractionName} popOver>
      <Link to={`/attractions/search?keyword=${attraction.attractionName}`}>
        <RankingItemContent currentRankPopover>
          {attraction.currentRank + 1}
        </RankingItemContent>
        <RankingItemContent attractionNamePopover>
          {attraction.attractionName}
        </RankingItemContent>
        <RankingItemContent rankOrder>
          <ArrowIconGenerator
            difference={attraction.rankOrder}
            numberOpt={false}
          />
        </RankingItemContent>
      </Link>
    </RankingItem>
  );
};
export default PopOver;
