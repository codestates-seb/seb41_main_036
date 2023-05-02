import styled from "styled-components";
const FlashingDot = styled.div`
  position: relative;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: var(--black-600);
  color: var(--black-600);
  animation: dot-flashing 0.8s infinite linear alternate;
  animation-delay: 0.4s;
  margin: 0 15px 4.5px 0;
  :before,
  :after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }
  ::before {
    left: -8px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: var(--black-600);
    color: var(--black-600);
    animation: dot-flashing 0.8s infinite alternate;
    animation-delay: 0s;
  }
  ::after {
    left: 8px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: var(--black-600);
    color: var(--black-600);
    animation: dot-flashing 0.8s infinite alternate;
    animation-delay: 0.8s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: var(--black-600);
    }
    50%,
    100% {
      background-color: var(--black-300);
    }
  }
`;

const FlashingDotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export { FlashingDot, FlashingDotWrapper };
