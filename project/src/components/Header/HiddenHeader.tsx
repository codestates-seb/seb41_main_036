import { useState } from "react";
import { Header } from ".";
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
import { HiddenHeaderBodyWrapper, HiddenHeaderTopWrapper } from "./style";
import useClickDetect from "../../hooks/useClickDetect";
const HiddenHeader = () => {
  const { ref, isVisible, setIsVisible } = useClickDetect();

  const handleArrowClick = () => {
    setIsVisible((p) => !p);
  };
  return (
    <header ref={ref as React.RefObject<HTMLHeadElement>}>
      <Header>
        <HiddenHeaderTopWrapper
          isVisible={isVisible}
          onClick={handleArrowClick}
        >
          <Header.HeaderTop />
          <ArrowDownIcon className="arrow-down" />
        </HiddenHeaderTopWrapper>
        <HiddenHeaderBodyWrapper isVisible={isVisible}>
          <Header.HeaderBody
            searchBarOn={false}
            defaultValue={""}
            backgroundOn={false}
            selectedMenu={2}
          />
        </HiddenHeaderBodyWrapper>
      </Header>
    </header>
  );
};
export default HiddenHeader;
