import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import HeaderVisibilityState from "../../recoil/HeaderState";
import { Header } from ".";
import { throttle } from "../../utils/utils";

interface FixedHeaderOnScrollUpProps {
  defaultValue?: string;
}
const FixedHeaderOnScrollUp = ({
  defaultValue = "",
}: FixedHeaderOnScrollUpProps) => {
  const pageOffsetRef = useRef<number | null>(null);
  const [showHeader, setShowHeader] = useRecoilState(HeaderVisibilityState);

  const handleScroll = () => {
    if (pageOffsetRef.current === null) pageOffsetRef.current = 0;
    const { scrollY } = window;
    const deltaY = scrollY - pageOffsetRef.current;
    const isVisible = scrollY === 0 || deltaY < 0;
    setShowHeader(isVisible);
    pageOffsetRef.current = scrollY;
  };

  const handlethrottleScroll = throttle(handleScroll, 300);
  useEffect(() => {
    window.addEventListener("scroll", handlethrottleScroll);
    return () => {
      window.removeEventListener("scroll", handlethrottleScroll);
    };
  }, []);

  return (
    <>
      <Header isVisible={showHeader}>
        <Header.HeaderTop />
        <Header.HeaderBody defaultValue={defaultValue} />
      </Header>
    </>
  );
};
export default FixedHeaderOnScrollUp;
