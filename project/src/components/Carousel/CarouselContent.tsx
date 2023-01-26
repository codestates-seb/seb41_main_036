import { memo, useState } from "react";
import {
  CarouselItemContainer,
  CarouselTextWrapper,
  LeftCarouselTextWrapper,
  RightCarouselTextWrapper,
  ImageWrapper,
} from "./style";
import { IoIosArrowForward as RightArrowIcon } from "react-icons/io";
import { MdLocationOn as PinIcon } from "react-icons/md";
import { Blurhash } from "react-blurhash";
interface CarouselContentProps {
  data: {
    img: string;
    id: number;
    title: string;
    subtitle: string;
    link: string;
    color: string;
    blur_hash: string;
    location: string;
  };
  isTransitionEnd: boolean;
}
const CarouselContent = memo(
  ({ data, isTransitionEnd }: CarouselContentProps) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const {
      img: imgUrl,
      id,
      title,
      subtitle,
      link,
      color,
      blur_hash,
      location,
    } = data;

    const handleImgLoad = () => {
      setImgLoaded(true);
    };

    return (
      <CarouselItemContainer>
        <ImageWrapper isLoaded={imgLoaded}>
          <Blurhash
            hash={blur_hash}
            style={{ width: "100%", height: "100%" }}
          />
          <img
            src={imgUrl}
            alt={`carousel${id}`}
            loading={id === 3 ? "eager" : "lazy"}
            onLoad={handleImgLoad}
          />
        </ImageWrapper>
        <CarouselTextWrapper>
          <LeftCarouselTextWrapper
            isTransitionEnd={isTransitionEnd}
            textColor={color}
          >
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <a href={link}>
              더 보러가기
              <RightArrowIcon className="right-arrow" />
            </a>
          </LeftCarouselTextWrapper>
          <RightCarouselTextWrapper
            isTransitionEnd={isTransitionEnd}
            textColor={color}
          >
            <span>
              <PinIcon className="location-pin" />
              {location}
            </span>
          </RightCarouselTextWrapper>
        </CarouselTextWrapper>
      </CarouselItemContainer>
    );
  }
);

export default CarouselContent;
