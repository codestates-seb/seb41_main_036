import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import React, { Dispatch, SetStateAction } from "react";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalGuideText = styled.div`
  width: 21%;
  display: flex;
  justify-content: space-between;

  p {
    font-size: var(--font-md);
    font-weight: var(--fw-bold);
    color: #585ac6;
    margin-bottom: 15px;
  }

  button {
    font-size: var(--font-md);
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
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
        <ModalContainer>
          <ModalGuideText>
            <p>하나 이상의 이미지를 꼭 등록해주세요.</p>
            <button onClick={() => setIsWriteGuideModal(false)}>
              <TfiClose />
            </button>
          </ModalGuideText>
          <img src={process.env.PUBLIC_URL + "/WriteGuide.gif"} />
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default WriteGuide;
