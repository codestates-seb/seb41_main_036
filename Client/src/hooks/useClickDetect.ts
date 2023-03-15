import { useRef, useState, useEffect } from "react";

//ref요소가 click된 요소의 자식이 아니면 isvisible을 false로 만든다
function useClickDetect(defaultVisibleState: boolean = false) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(defaultVisibleState);

  const handleClick = (e: MouseEvent) => {
    if (isVisible && !ref.current!.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isVisible]);

  return { ref, isVisible, setIsVisible };
}
export default useClickDetect;
