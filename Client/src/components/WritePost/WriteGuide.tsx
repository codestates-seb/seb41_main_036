import { CgClose } from "react-icons/cg";
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
              <CgClose
                cursor="pointer"
                size="25px"
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
