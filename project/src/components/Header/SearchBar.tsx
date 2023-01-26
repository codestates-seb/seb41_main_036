import {
  useState,
  useMemo,
  useEffect,
  useRef,
  startTransition,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  FormEvent,
<<<<<<< HEAD
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import { SearchForm, AttractionItemContent } from "./style";
import useClickDetect from "../../hooks/useClickDetect";
import { getfilteredAttractions } from "../../utils";
import { useRecoilState } from "recoil";
import HeaderVisibilityState from "../../recoil/HeaderState";
import { AttractionsData } from "../../data/searchBarData";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { IoCloseOutline as ResetIcon } from "react-icons/io5";
const SuggestionBox = lazy(() =>
  import("./SuggestionBox").then((module) => ({
    default: module.SuggestionBox,
  }))
);
const MAX_SUGGEST = 5;

=======
} from "react";
import { SuggestionBox } from "./SuggestionBox";
import { SearchForm } from "./style";
import useClickScrollDetect from "../../utils/useClickScrollDetect";
import { getfilteredAttractions } from "../../utils/functions";
import { AttractionsData } from "../../data/searchBarData";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { IoCloseOutline as ResetIcon } from "react-icons/io5";

const MAX_SUGGEST = 5;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
interface SearchBarProps {
  defaultValue: string;
}
const SearchBar = ({ defaultValue = "" }: SearchBarProps) => {
<<<<<<< HEAD
  const [inputValue, setInputValue] = useState(defaultValue);
  const [selected, setSelected] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);
  const { ref, isVisible, setIsVisible } = useClickDetect();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchValueRef = useRef<string>("");
  const [showHeader, setShowHeader] = useRecoilState(HeaderVisibilityState);

  const { trimmedSearchValue, filteredAttractions, numOfFilteredAttractions } =
    useMemo(() => {
      if (searchValueRef.current.trim() === "")
        return {
          trimmedSearchValue: "",
          filteredAttractions: [],
          numOfFilteredAttractions: 0,
        };

      const trimmedSearchValue = searchValueRef.current
=======
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [selected, setSelected] = useState(-1);
  const [searchValue, setSearchValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { ref, isVisible, setIsVisible } = useClickScrollDetect();

  const { trimmedSearchValue, filteredAttractions, numOfFilteredAttractions } =
    useMemo(() => {
      const trimmedSearchValue = searchValue
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        .trim()
        .replace(/[`~!@#$%^&*_|+\-=?;:'"<>\\{\\}\\[\]\\\\/]/gim, " ")
        .replace(/\s\s+/g, " ");
      const result = getfilteredAttractions(
        AttractionsData,
        trimmedSearchValue,
        MAX_SUGGEST
      );
      return {
        trimmedSearchValue,
        ...result,
      };
<<<<<<< HEAD
    }, [searchValueRef.current]);

  useEffect(() => {
    if (!isVisible) setSelected(-1);
    searchValueRef.current = inputValue;
  }, [isVisible]);

  useEffect(() => {
    if (!showHeader) setIsVisible(false);
  }, [showHeader]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
    startTransition(() => {
      searchValueRef.current = (e.target as HTMLInputElement).value;
    });
=======
    }, [searchValue]);
  useEffect(() => {
    if (!isVisible) setSelected(-1);
    setSearchValue(inputValue);
  }, [isVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
    startTransition(() => setSearchValue((e.target as HTMLInputElement).value));
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    setSelected(-1);
    e.target.value.trim() === "" ? setIsVisible(false) : setIsVisible(true);
  };

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
    setIsVisible((p) => !p);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "ArrowDown") {
      if (!isVisible) {
        setIsVisible(true);
        return;
      }
      let numOfitem =
        numOfFilteredAttractions > MAX_SUGGEST
          ? MAX_SUGGEST + 2
          : numOfFilteredAttractions;
      setSelected((p) => (p + 1) % numOfitem);
    } else if (e.key === "ArrowUp" && selected > -1) {
      setSelected((p) => p - 1);
<<<<<<< HEAD
      if (selected === 0) setInputValue(searchValueRef.current);
=======
      if (selected === 0) setInputValue(searchValue);
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
      e.preventDefault();
    } else if (e.key === "Enter" && selected > -1) {
    }
  };
  const handleResetIconClick = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setInputValue("");
<<<<<<< HEAD
    searchValueRef.current = "";
=======
    setSearchValue("");
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    inputRef.current?.focus();
  };
  const handleSearchIconClick = (e: MouseEvent<SVGElement>) => {
    inputRef.current?.focus();
    if (trimmedSearchValue === "" && !isVisible) setIsVisible(true);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SearchForm
      autoComplete="off"
      onSubmit={handleSubmit}
      ref={ref as React.RefObject<HTMLFormElement>}
      isVisible={isVisible}
    >
      <input
        ref={inputRef}
        placeholder="어디로 가지?"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onKeyDown={handleInputKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      {isVisible && trimmedSearchValue !== "" && (
        <ResetIcon className="reset-icon" onClick={handleResetIconClick} />
      )}
      <SearchIcon className="search-icon" onClick={handleSearchIconClick} />
      {isVisible && (
<<<<<<< HEAD
        <Suspense fallback={<Loading />}>
          <SuggestionBox
            trimmedSearchValue={trimmedSearchValue}
            filteredAttractions={filteredAttractions}
            numOfFilteredAttractions={numOfFilteredAttractions}
            selected={selected}
            onInputChange={setInputValue}
            onSelectionChange={setSelected}
          />
        </Suspense>
=======
        <SuggestionBox
          trimmedSearchValue={trimmedSearchValue}
          filteredAttractions={filteredAttractions}
          numOfFilteredAttractions={numOfFilteredAttractions}
          selected={selected}
          onInputChange={setInputValue}
          onSelectionChange={setSelected}
        />
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
      )}
    </SearchForm>
  );
};
<<<<<<< HEAD
function Loading() {
  return (
    <AttractionItemContent as="li" type="notice">
      로딩중...
    </AttractionItemContent>
  );
}
=======

>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
export default SearchBar;
