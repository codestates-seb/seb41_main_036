import styled from "styled-components";

const FixBoxVertical = styled.div<{ inverted: boolean }>`
  padding: 27px 30px 20px 30px;
  background-color: white;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  height: 220px;
  border-radius: 85px;
  box-shadow: 0px 0px 21px rgba(180, 180, 180, 0.25);
  position: ${(props) => (props.inverted ? "fixed" : "absolute")};
  left: ${(props) => (props.inverted ? "87%" : "87%")};
  top: ${(props) => (props.inverted ? "62%" : "1000px")};
`;
const IconContainer = styled.div<{ isSelected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.5 ease;
  font-weight: var(--fw-bold);
  svg {
    transition: all 0.3s ease;
    :hover {
      cursor: pointer;
      color: var(--black-800);
    }
  }
  .share-icon {
    color: ${(props) => (props.isSelected ? "var(--black-900)" : "grey")};
    z-index: var(--zi-three);
    width: 15px;
    height: 15px;
  }
  .post-icon {
    margin-top: 8px;
    margin-left: 7px;
    width: 26px;
    height: 26px;
  }

  .bookmark-icon {
    width: 17px;
    height: 17px;
    margin-top: 9px;
    :hover {
      fill: var(--black-800);
      transform: scale(1.05);
    }
  }
  .heart-icon {
    height: 19px;
    width: 19px;
    :hover {
      fill: var(--pink-heart);
      transform: scale(1.1);
    }
  }
`;

const MarkerCount = styled.p`
  color: var(--black-700);
  font-size: var(--font-xs);
  margin: 2px auto;
`;

const ShareBox = styled.div<{ isVisible: boolean }>`
  position: absolute;
  --svg-length: 40px;
  --svg-margin: 8px;
  transition: all 0.4s ease;
  transform: ${(props) =>
    props.isVisible
      ? "translate(calc(-50% + 7.5px),0)"
      : "translate(calc(-50% + 7.5px), 0) scale(0)"};
  height: var(--svg-length);
  display: flex;
  justify-content: center;
  svg {
    padding: 9px;
    height: var(--svg-length);
    width: var(--svg-length);
    position: absolute;
    transition: all 0.4s ease;
    border-radius: 50%;
  }

  svg.kakao-icon {
    color: #3f3035;
    background-color: rgba(255, 250, 230, 1);
    transform: ${(props) =>
      props.isVisible
        ? "translate(-65px, calc(var(--svg-length)*3 + var(--svg-margin)*3))"
        : "translate(-50%,-50%)"};
    :hover {
      background-color: white;
    }
  }
  svg.facebook-icon {
    color: rgb(66, 103, 178);
    background-color: rgba(66, 103, 178, 0.05);
    transform: ${(props) =>
      props.isVisible
        ? `translate(-65px, calc(var(--svg-length) + var(--svg-margin)))`
        : "translate(-50%,-50%)"};
    :hover {
      background-color: white;
    }
  }
  svg.twitter-icon {
    color: rgb(29, 161, 242);
    background-color: rgba(29, 161, 242, 0.05);
    transform: ${(props) =>
      props.isVisible
        ? `translate(-65px, calc(var(--svg-length) * 2 + var(--svg-margin)*2))`
        : "translate(-50%,-50%)"};
    :hover {
      background-color: white;
    }
  }
  svg.shareAddress-icon {
    background-color: var(--black-200);
    color: var(--black-650);
    transform: ${(props) =>
      props.isVisible ? `translate(-65px, 0)` : "translate(-50%,-50%)"};

    :hover {
      background-color: white;
    }
  }
`;
export { FixBoxVertical, MarkerCount, ShareBox, IconContainer };
