import styled from "styled-components";
import { FcInfo } from "react-icons/fc";
import "../index.css";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(126, 133, 137, 0.8);
  z-index: 1000;
`;
const Container = styled.div`
  width: 390px;
  height: 135px;
  border-radius: 9px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: fixed;
  top: 40%;
  left: 40%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const ContainerInfo = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  background-color: #f9fafb;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  > div:nth-child(1) {
    margin: 20px 0 10px 20px;
  }
  > div:nth-child(2) {
    > h3 {
      margin-top: 5px;
      font-weight: 700;
    }
    padding: 5px 15px;
    margin-top: 10px;
  }

  & p {
    margin-top: 10px;
    font-size: 13px;
    display: block;
    color: var(--black-700);
    font-weight: 600;
  }
`;

const ContainerButton = styled.div`
  height: 70px;
  background-color: #e9e9e9;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  > button {
    font-weight: 600;
    background-color: white;
    cursor: pointer;
    margin-top: 9px;
    width: 50px;
    height: 30px;
    border: 1px solid var(--black-600);
    border-radius: 3px;
    margin-right: 5px;
    :nth-child(1) {
      margin-left: 250px;
    }
    :hover {
      background-color: #3f8ef1;
      color: white;
      font-weight: 600;
    }
  }
`;
interface ModalProps {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({ setIsModalVisible }: ModalProps) => {
  const navigate = useNavigate();
  const HandleLoginModalViewer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/login`);
  };

  return (
    <>
      <ModalBackground>
        <Container>
          <ContainerInfo>
            <div>
              <FcInfo size="50" fill="red" />
            </div>
            <div>
              <h3>로그인이 필요한 서비스입니다. </h3>
              <p>로그인 하시겠습니까?</p>
            </div>
          </ContainerInfo>
          <ContainerButton>
            <button onClick={HandleLoginModalViewer}>확인</button>
            <button onClick={() => setIsModalVisible(false)}>취소</button>
          </ContainerButton>
        </Container>
      </ModalBackground>
    </>
  );
};

export default Modal;
