import { useState, useEffect, useCallback, useRef } from "react";
import { Header } from ".";

<<<<<<< HEAD

=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
const FixedHeaderOnScrollUp = () => {
  const pageOffsetRef = useRef<number | null>(null);
  const [showHeader, setShowHeader] = useState(true);

  const throttle = useCallback((callback: Function, delay: number) => {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback();
        timerId = null;
      }, delay);
    };
  }, []);

  const handleScroll = () => {
    if (pageOffsetRef.current === null) pageOffsetRef.current = 0;
    const { scrollY } = window;
    const deltaY = scrollY - pageOffsetRef.current;
    const isVisible = scrollY === 0 || deltaY < 0;
    setShowHeader(isVisible);
    pageOffsetRef.current = scrollY;
  };

  const handlethrottleScroll = throttle(handleScroll, 200);
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
        <Header.HeaderBody />
      </Header>
    </>
  );
};
export default FixedHeaderOnScrollUp;
