import { useState, useRef } from "react";
import { Header } from ".";
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
import { HiddenHeaderBodyWrapper, HiddenHeaderTopWrapper } from "./style";

const HiddenHeader = () => {
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseOverHandler = () => {
    clearTimeout(timeOutRef.current as NodeJS.Timeout);
    timeOutRef.current = setTimeout(() => setIsVisible(true), 350);
  };
  const mouseOutHandler = () => {
    clearTimeout(timeOutRef.current as NodeJS.Timeout);
    setTimeout(() => setIsVisible(false), 500);
  };
  return (
    <Header
      mouseOverHandler={mouseOverHandler}
      mouseOutHandler={mouseOutHandler}
    >
      <HiddenHeaderTopWrapper isVisible={isVisible}>
        <Header.HeaderTop />
        <ArrowDownIcon className="arrow-down" />
      </HiddenHeaderTopWrapper>
      <HiddenHeaderBodyWrapper isVisible={isVisible}>
        <Header.HeaderBody
          searchBarOn={false}
          defaultValue={""}
          backgroundOn={false}
        />
      </HiddenHeaderBodyWrapper>
    </Header>
  );
};
export default HiddenHeader;
