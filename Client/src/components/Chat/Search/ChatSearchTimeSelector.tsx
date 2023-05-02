import { useRef } from "react";
import { SearchTimeSelectorWrapper } from "./SearchStyled";
import {
  IoIosArrowBack as BackIcon,
  IoIosArrowForward as ForwardIcon,
} from "react-icons/io";

interface ChatSearchTimeSelectorProps {
  getSearchResult: (yearMonth?: string) => void;
}
const ChatSearchTimeSelector = ({
  getSearchResult,
}: ChatSearchTimeSelectorProps) => {
  const searchYMRef = useRef<string[]>(
    new Date().toISOString().slice(0, 7).split("-")
  ); //[년,월]

  const rightArrowFlag =
    Number(searchYMRef.current[0]) === new Date().getFullYear() &&
    Number(searchYMRef.current[1]) === new Date().getMonth() + 1;

  const handleBackClick = () => {
    const [year, month] = searchYMRef.current.map(Number);
    if (month === 1) {
      searchYMRef.current = [year - 1, 12].map(String);
    } else {
      searchYMRef.current = [
        String(year),
        month < 10 ? "0" + (month - 1) : String(month - 1),
      ];
    }
    getSearchResult(searchYMRef.current.join(""));
  };
  const handleForwardClick = () => {
    const [year, month] = searchYMRef.current.map(Number);
    if (month === 12) {
      searchYMRef.current = [year + 1, 1].map(String);
    } else {
      searchYMRef.current = [
        String(year),
        month < 10 ? "0" + (month + 1) : String(month + 1),
      ];
    }
    getSearchResult(searchYMRef.current.join(""));
  };
  return (
    <SearchTimeSelectorWrapper rightDisabled={rightArrowFlag}>
      <BackIcon className="back-icon" onClick={handleBackClick} />
      {searchYMRef.current.map(Number).join(".")}
      <ForwardIcon className="forward-icon" onClick={handleForwardClick} />
    </SearchTimeSelectorWrapper>
  );
};

export default ChatSearchTimeSelector;
