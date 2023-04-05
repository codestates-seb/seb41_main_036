import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { Dispatch, SetStateAction } from "react";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 40rem;
  }
`;

const ModalGuideText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  p {
    font-size: var(--font-md);
    font-weight: var(--fw-bold);
    color: #585ac6;
  }
`;
const WriteGuide = ({
  setIsWriteGuideModal,
}: {
  setIsWriteGuideModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <ModalBackground>
        <ModalWrapper>
          <ModalContainer>
            <ModalGuideText>
              <p>하나 이상의 이미지를 꼭 등록해주세요.</p>
              <TfiClose
                cursor={"pointer"}
                onClick={() => setIsWriteGuideModal(false)}
              />
            </ModalGuideText>
            <img src={process.env.PUBLIC_URL + "/WriteGuide.gif"} />
          </ModalContainer>
        </ModalWrapper>
      </ModalBackground>
    </>
  );
};

export default WriteGuide;
