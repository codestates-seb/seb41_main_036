import { useState, useEffect, useRef, useLayoutEffect, Fragment } from "react";
import CarouselContent from "./CarouselContent";
import carouselData from "../../data/CarouselData";
import {
  CarouselWrapper,
  CarouselContentListContainer,
  CarouselControlContainer,
  RangeSliderContainer,
  SliderDot,
} from "./style";
import { IoIosArrowForward as NextIcon } from "react-icons/io";
import { IoIosArrowBack as PrevIcon } from "react-icons/io";
import { IoPause as PauseIcon } from "react-icons/io5";
import { IoPlay as PlayIcon } from "react-icons/io5";

const newCarouselData = [
  { ...carouselData[carouselData.length - 1], id: 20 },
  ...carouselData,
  { ...carouselData[0], id: 21 },
];

const INTERVAL = 6000;
const Carousel = () => {
  const [currentPhoto, setCurrentPhoto] = useState<number>(1); //현재 캐러셀 위치
  const [textTransition, setTextTransition] = useState<number>(-1); //textTransition이 일어나야할 번호
  const [isPlaying, setIsPlaying] = useState(true); //재생버튼
  const transitionOnRef = useRef<boolean>(false); //전체 캐러셀 애니메이션 관리
  const autoCarouselTimerIdRef = useRef<NodeJS.Timeout | null>(null); //setInterval id
  const preUpdatedCurrentPhotoRef = useRef<number>(1);

  useLayoutEffect(() => {
    setTimeout(() => {
      switch (currentPhoto) {
        case 0:
          setCurrentPhoto(newCarouselData.length - 2);
          setTextTransition(newCarouselData.length - 2);
          transitionOnRef.current = false;
          break;
        case newCarouselData.length - 1:
          setCurrentPhoto(1);
          setTextTransition(1);
          transitionOnRef.current = false;
          break;
        default:
          transitionOnRef.current = false;
          setTextTransition(currentPhoto);
      }
    }, 500);
  }, [currentPhoto]);

  useEffect(() => {
    setTextTransition(currentPhoto);

    autoCarouselTimerIdRef.current = setInterval(() => {
      transitionOnRef.current = true;
      setCurrentPhoto((p) => p + 1);
    }, INTERVAL);
    return () =>
      clearInterval(autoCarouselTimerIdRef.current as NodeJS.Timeout);
  }, []);

  if (currentPhoto === 0) {
    preUpdatedCurrentPhotoRef.current = newCarouselData.length - 2;
  } else if (currentPhoto === newCarouselData.length - 1) {
    preUpdatedCurrentPhotoRef.current = 1;
  } else {
    preUpdatedCurrentPhotoRef.current = currentPhoto;
  }

  //transitionOnRef.current가 false가 되는 경우: 맨 마지막 이미지 또는 맨 처음 이미지에 도달하고 transition이 끝났을 때
  //true가 되는 경우: 다음 이미지 번호로 상태를 업데이트 할 때
  const handlePrevClick = () => {
    if (!transitionOnRef.current) {
      clearInterval(autoCarouselTimerIdRef.current as NodeJS.Timeout);
      transitionOnRef.current = true;
      setCurrentPhoto((p) => p - 1);
      if (isPlaying) {
        autoCarouselTimerIdRef.current = setInterval(() => {
          transitionOnRef.current = true;
          setCurrentPhoto((p) => p + 1);
        }, INTERVAL);
      }
    }
  };
  const handleNextClick = () => {
    if (!transitionOnRef.current) {
      clearInterval(autoCarouselTimerIdRef.current as NodeJS.Timeout);
      transitionOnRef.current = true;
      setCurrentPhoto((p) => p + 1);
      if (isPlaying) {
        autoCarouselTimerIdRef.current = setInterval(() => {
          transitionOnRef.current = true;
          setCurrentPhoto((p) => p + 1);
        }, INTERVAL);
      }
    }
  };
  const handlePauseClick = () => {
    if (autoCarouselTimerIdRef.current) {
      clearInterval(autoCarouselTimerIdRef.current as NodeJS.Timeout);
      setIsPlaying(false);
      autoCarouselTimerIdRef.current = null;
    }
  };
  const handlePlayClick = () => {
    if (!autoCarouselTimerIdRef.current) {
      autoCarouselTimerIdRef.current = setInterval(() => {
        transitionOnRef.current = true;
        setCurrentPhoto((p) => p + 1);
      }, INTERVAL);
      setIsPlaying(true);
    }
  };

  const handleDotClick = (i: number) => {
    if (!transitionOnRef.current) {
      clearInterval(autoCarouselTimerIdRef.current as NodeJS.Timeout);
      transitionOnRef.current = true;

      setCurrentPhoto(i);
      if (isPlaying) {
        autoCarouselTimerIdRef.current = setInterval(() => {
          transitionOnRef.current = true;
          setCurrentPhoto((p) => p + 1);
        }, INTERVAL);
      }
    }
  };

  return (
    <>
      <CarouselWrapper>
        <CarouselContentListContainer
          currentPhotoNum={currentPhoto}
          transitionOn={transitionOnRef.current}
        >
          {newCarouselData.map((el, i) => (
            <CarouselContent
              key={el.id}
              data={el}
              isTransitionEnd={i === textTransition}
            />
          ))}
        </CarouselContentListContainer>
        <CarouselControlContainer>
          <PrevIcon className="prev-icon" onClick={handlePrevClick} />
          {isPlaying ? (
            <PauseIcon className="pause-icon" onClick={handlePauseClick} />
          ) : (
            <PlayIcon className="play-icon" onClick={handlePlayClick} />
          )}

          <NextIcon className="next-icon" onClick={handleNextClick} />
        </CarouselControlContainer>
        <RangeSliderContainer currentPhoto={currentPhoto}>
          {newCarouselData.map((el, i) =>
            i === 0 || i === newCarouselData.length - 1 ? (
              <Fragment key={el.id}></Fragment>
            ) : (
              <SliderDot
                key={el.id}
                currentDot={i === preUpdatedCurrentPhotoRef.current}
                onClick={() => handleDotClick(i)}
              />
            )
          )}
        </RangeSliderContainer>
      </CarouselWrapper>
    </>
  );
};
export default Carousel;
