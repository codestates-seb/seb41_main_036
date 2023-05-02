import { useRef, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { ShowSearchBox } from "../../../recoil/ChatState";
import ChatSearchTimeSelector from "./ChatSearchTimeSelector";
import SearchedMessage from "./SearchedMessage";
import {
  SearchBoxWrapper,
  ChatSearchBoxHeaderDiv,
  ChatSearchBarWrapper,
  ChatSearchBar,
  SearchedMessageContainer,
  EmptyChatResultDiv,
} from "./SearchStyled";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { BsArrowCounterclockwise as ResetIcon } from "react-icons/bs";
import { IoClose as CloseIcon } from "react-icons/io5";
import { searchedMessageType } from "../Chat";

interface SearchBoxProps {
  lastChatIdRef: React.MutableRefObject<number | undefined>;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const SearchBox = ({ lastChatIdRef, chatDataMapRef }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const setShowSearchBox = useSetRecoilState(ShowSearchBox);

  const [searchedMessages, setSearchedMessages] = useState<
    searchedMessageType[] | null
  >(null);
  const [showYMSelctor, setShowYMSelector] = useState(false);
  const [showGuideAnimation, setShowGuideAnimation] = useState(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  function getSearchResult(
    yearMonth = new Date().toISOString().slice(0, 7).split("-").join("")
  ) {
    setShowYMSelector(true);
    if (searchValue.length < 2) return;
    const payload = { content: searchValue, yearAndMonth: yearMonth };
    axios
      .get(`https://pikcha36.o-r.kr:8080/app/search`, { params: payload })
      .then((res) => {
        setSearchedMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleResetClick = () => {
    if (showYMSelctor) setShowYMSelector(false);
    setSearchValue("");
    setSearchedMessages(null);
    searchBarRef.current?.focus();
    //검색 결과 초기화;
  };
  const handleCloseClick = () => {
    setShowSearchBox(false);
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim().length < 2) {
      setShowGuideAnimation(true);
      setTimeout(() => {
        setShowGuideAnimation(false);
      }, 500);
    }
    if (e.key === "Enter" && searchValue.length > 1) {
      getSearchResult();
    }
  };
  const handleSearchClick = () => {
    getSearchResult();
  };

  return (
    <SearchBoxWrapper>
      <ChatSearchBoxHeaderDiv>
        <CloseIcon className="close-icon" onClick={handleCloseClick} />
      </ChatSearchBoxHeaderDiv>
      <ChatSearchBarWrapper
        search_disabled={searchValue.length <= 1}
        showGuide={!!searchValue && searchValue.trim().length < 2}
        showGuideAnimation={showGuideAnimation}
      >
        <ChatSearchBar
          ref={searchBarRef}
          placeholder="채팅 검색하기"
          value={searchValue}
          onChange={handleSearchValue}
          onKeyDown={handleInputKeyDown}
        />
        <SearchIcon className="search-icon" onClick={handleSearchClick} />
        {!!searchValue.length && (
          <ResetIcon className="reset-icon" onClick={handleResetClick} />
        )}
        {searchValue && searchValue.trim().length < 2 && (
          <span>2글자 이상 입력해주세요</span>
        )}
      </ChatSearchBarWrapper>

      {showYMSelctor && (
        <ChatSearchTimeSelector getSearchResult={getSearchResult} />
      )}
      <SearchedMessageContainer>
        {searchedMessages &&
          searchedMessages.length > 0 &&
          searchedMessages.map((el) => (
            <SearchedMessage
              key={el.createdAt}
              messageData={el}
              lastChatIdRef={lastChatIdRef}
              chatDataMapRef={chatDataMapRef}
            />
          ))}
        {searchedMessages && searchedMessages.length === 0 && (
          <EmptyChatResultDiv>검색 결과가 없습니다</EmptyChatResultDiv>
        )}
      </SearchedMessageContainer>
    </SearchBoxWrapper>
  );
};
export default SearchBox;
