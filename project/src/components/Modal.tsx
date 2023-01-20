import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';
import '../index.css';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(126, 133, 137, 0.8);
`;
const Container = styled.div`
  width: 380px;
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
    width:100%;
    height: 110px;
    display: flex;
    background-color: #F9FAFB;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    >div:nth-child(1){
      margin: 20px 0 10px 20px;
    }
    >div:nth-child(2){
      padding: 13px;
      margin-top: 10px;
    }
    & h3{
      font-size: 15px;
      color:  var(--black-900);
    }
    & p{
      margin-top: 10px;
      font-size: 13px;
      display: block;
      color: var(--black-700);
      font-weight: 600;
    }
`

const ContainerButton = styled.div`
  height: 70px;
  background-color: #e9e9e9;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  >button{
    font-weight: 600;
    background-color: white;
    cursor: pointer;
    margin-top: 9px;
    width: 50px;
    height: 30px;
    border: 1px solid var(--black-600);
    border-radius: 3px;
    margin-right: 5px;
    :nth-child(1){
      margin-left: 250px;
    }
    :hover{
      background-color: #3F8EF1;
      color:white;
    }
  }
`


const Modal = ():JSX.Element => {
  return (
  <>
    <ModalBackground>
      <Container>
        <ContainerInfo>
        <div><FcInfo size="50"/></div>
        <div>
          <h3>작성중 포스트 삭제</h3>
          <p>현재 작성중인 글을 삭제하시겠습니까?</p>
        </div>
        </ContainerInfo>
        <ContainerButton>
          <button>삭제</button>
          <button>취소</button>
        </ContainerButton>
      </Container>
    </ModalBackground>
  </>
  )

}

export default Modal;