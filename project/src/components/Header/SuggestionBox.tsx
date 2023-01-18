import {
  useState,
  useEffect,
  SetStateAction,
  Fragment,
  Dispatch,
  MouseEvent,
} from "react";
import {
  AttractionItem,
  AttractionItemContent,
  SuggestionItemWrapper,
} from "./style";
import { TbArrowUpRight as ShortcutIcon } from "react-icons/tb";
import { BiLocationPlus as SearchMoreIcon } from "react-icons/bi";

const MAX_SUGGEST = 5;

interface SuggestionBoxProps {
  trimmedSearchValue: string;
  filteredAttractions: Array<AttractionsProps>;
  numOfFilteredAttractions: number;
  selected: number;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSelectionChange: Dispatch<SetStateAction<number>>;
}

const SuggestionBox = ({
  //searchvalue를 받아서 데이터를 필터링하고 해당하는 순서의 suggestion으로 input값을 설정한다
  //지금 selected가 양방향으로 일어난다
  trimmedSearchValue,
  filteredAttractions,
  numOfFilteredAttractions,
  selected,
  onInputChange,
  onSelectionChange,
}: SuggestionBoxProps) => {
  const [mouseTriggered, setMouseTriggered] = useState(false);

  useEffect(() => {
    if (selected !== -1 && filteredAttractions.length && !mouseTriggered) {
      if (selected !== MAX_SUGGEST + 1)
        onInputChange(filteredAttractions[selected]["info"]["name"]);
      else {
        onInputChange(trimmedSearchValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (mouseTriggered) setMouseTriggered(false);
  }, [mouseTriggered]);
  const handleMouseOver = () => {
    setMouseTriggered(true);
    onSelectionChange(MAX_SUGGEST + 1);
  };
  return (
    <SuggestionItemWrapper>
      {filteredAttractions.length ? (
        filteredAttractions.map((el, i) => (
          <SuggestionItem
            attraction={el}
            key={el.info.id}
            trimmedSearchValue={trimmedSearchValue}
            selectedEl={selected === i}
            onSelectionChange={onSelectionChange}
            onMouseEvent={setMouseTriggered}
            order={i}
          />
        ))
      ) : (
        <AttractionItemContent as="li" type="notice">
          {trimmedSearchValue === ""
            ? "검색어를 입력해주세요"
            : "추천 검색어가 없습니다"}
        </AttractionItemContent>
      )}
      {numOfFilteredAttractions > MAX_SUGGEST && (
        <AttractionItem
          selectedEl={selected === MAX_SUGGEST + 1}
          onMouseOver={handleMouseOver}
        >
          <AttractionItemContent as="li" type="more-result">
            <SearchMoreIcon className="more-search" />
            {`"${trimmedSearchValue}"에 대한 모든 검색결과 보기 `}
          </AttractionItemContent>
        </AttractionItem>
      )}
    </SuggestionItemWrapper>
  );
};
//inputValue를 받아 값을 필터링하고 suggestItem 리스트를 렌더링

interface AttractionsProps {
  info: { name: string; id: number; address: string };
  matchedletter: number[][];
  exactmatchedletter: number[][];
}

interface SearchBarItemProps {
  trimmedSearchValue: string;
  attraction: AttractionsProps;
  selectedEl: Boolean;
  onSelectionChange: Dispatch<SetStateAction<number>>;
  onMouseEvent: Dispatch<SetStateAction<boolean>>;
  order: number;
}

const SuggestionItem = ({
  trimmedSearchValue,
  attraction: { info, exactmatchedletter },
  selectedEl,
  onSelectionChange,
  onMouseEvent,
  order,
}: SearchBarItemProps) => {
  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    onMouseEvent(true);
    onSelectionChange(order);
  }; //이렇게 설정될 경우 inputvalue update가 일어나면 안된다
  // const temp=attraction.exactmatchedletter.forEach

  let letterIndex = exactmatchedletter.flat();

  return (
    <AttractionItem selectedEl={selectedEl} onMouseOver={handleMouseOver}>
      <a href="https://www.naver.com">
        <AttractionItemContent type="name">
          {letterIndex.map((el, i, arr) => {
            let formerIndex = i === 0 ? 0 : arr[i - 1] + 1;
            return i % 2 === 0 ? (
              <Fragment key={i}>{info.name.slice(formerIndex, el)}</Fragment>
            ) : (
              <strong key={i}>{trimmedSearchValue}</strong>
            );
          })}
          {info.name.slice(letterIndex[letterIndex.length - 1] + 1)}
        </AttractionItemContent>
        <AttractionItemContent type="address">
          {info.address}
        </AttractionItemContent>
      </a>
      <ShortcutIcon />
    </AttractionItem>
  );
};
//값을 받아서 렌더링 하기만 하는 컴포넌트
export { SuggestionBox };
