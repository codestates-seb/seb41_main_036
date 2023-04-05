import { TfiClose } from "react-icons/tfi";
import { Dispatch, SetStateAction } from "react";
import * as wp from "../../pages/WritePost/WritePostStyled";

const WriteGuide = ({
  setIsWriteGuideModal,
}: {
  setIsWriteGuideModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <wp.WriteGuideModalBackground>
        <wp.WriteGuideModalWrapper>
          <wp.WriteGuideModalContainer>
            <wp.WriteGuideModalGuideText>
              <p>하나 이상의 이미지를 꼭 등록해주세요.</p>
              <TfiClose
                cursor="pointer"
                onClick={() => setIsWriteGuideModal(false)}
              />
            </wp.WriteGuideModalGuideText>
            <img src={process.env.PUBLIC_URL + "/WriteGuide.gif"} />
          </wp.WriteGuideModalContainer>
        </wp.WriteGuideModalWrapper>
      </wp.WriteGuideModalBackground>
    </>
  );
};

export default WriteGuide;
