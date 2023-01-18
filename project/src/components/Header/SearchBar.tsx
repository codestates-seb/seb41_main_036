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
} from "react";
import { SuggestionBox } from "./SuggestionBox";
import { SearchForm } from "./style";
import useClickScrollDetect from "../../utils/useClickScrollDetect";
import { getfilteredAttractions } from "../../utils/functions";
import { AttractionsData } from "../../data/searchBarData";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { IoCloseOutline as ResetIcon } from "react-icons/io5";

const MAX_SUGGEST = 5;
interface SearchBarProps {
  defaultValue: string;
}
const SearchBar = ({ defaultValue = "" }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [selected, setSelected] = useState(-1);
  const [searchValue, setSearchValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { ref, isVisible, setIsVisible } = useClickScrollDetect();

  const { trimmedSearchValue, filteredAttractions, numOfFilteredAttractions } =
    useMemo(() => {
      const trimmedSearchValue = searchValue
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
    }, [searchValue]);
  useEffect(() => {
    if (!isVisible) setSelected(-1);
    setSearchValue(inputValue);
  }, [isVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
    startTransition(() => setSearchValue((e.target as HTMLInputElement).value));
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
      if (selected === 0) setInputValue(searchValue);
      e.preventDefault();
    } else if (e.key === "Enter" && selected > -1) {
    }
  };
  const handleResetIconClick = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setInputValue("");
    setSearchValue("");
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
        <SuggestionBox
          trimmedSearchValue={trimmedSearchValue}
          filteredAttractions={filteredAttractions}
          numOfFilteredAttractions={numOfFilteredAttractions}
          selected={selected}
          onInputChange={setInputValue}
          onSelectionChange={setSelected}
        />
      )}
    </SearchForm>
  );
};

export default SearchBar;
