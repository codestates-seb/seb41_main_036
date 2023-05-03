import { FlashingDot, FlashingDotWrapper } from "./IconStyled";

const FlashingDots = () => {
  return (
    <FlashingDotWrapper>
      <FlashingDot>
        <div>
          <FlashingDot />
        </div>
      </FlashingDot>
    </FlashingDotWrapper>
  );
};
export default FlashingDots;
