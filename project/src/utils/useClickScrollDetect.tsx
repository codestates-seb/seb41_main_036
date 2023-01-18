import { useRef, useState, useEffect } from "react";

//ref요소가 click된 요소의 자식이 아니면 isvisible을 false로 만든다
function useClickDetect() {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (!ref.current!.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };
  const handleScroll = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}
export default useClickDetect;
