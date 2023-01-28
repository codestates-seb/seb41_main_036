import { useState } from "react";
import { Header } from ".";
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
import { HiddenHeaderBodyWrapper, HiddenHeaderTopWrapper } from "./style";

const HiddenHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleArrowClick = () => {
    setIsVisible((p) => !p);
  };
  return (
    <Header>
      <HiddenHeaderTopWrapper isVisible={isVisible}>
        <Header.HeaderTop />
        <ArrowDownIcon className="arrow-down" onClick={handleArrowClick} />
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
  );
};
export default HiddenHeader;
