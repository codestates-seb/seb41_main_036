import styled, { css } from "styled-components";
import { SendBarFrameDiv } from "../Send/SendStyled";
import { sendbarStyleType } from "../Chat";

const DeleteModal = styled.div`
  background-color: white;
  border: none;
  width: 230px;
  height: 130px;
  border-radius: var(--br-m);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 24px 5px rgba(245, 245, 245, 0.9);
  box-shadow: 0px 0px 24px 5px rgba(245, 245, 245, 0.9);
  div.modal-subject {
    padding: 0 15px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-grow: 0.8;
    font-weight: var(--fw-bold);
    color: var(--black-800);
    letter-spacing: 0.05rem;
    font-size: var(--font-sm);
    svg {
      width: 15px;
      color: var(--black-800);
    }
  }
  div.modal-content {
    font-size: var(--font-xs);
    flex-grow: 0.3;
    color: var(--black-700);
    letter-spacing: 0.02rem;
  }
  div.modal-buttonBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding: 0 10px 0px 10px;
    button {
      border-radius: var(--br-s);
      border: none;
      width: 47%;
      height: 65%;
      font-size: var(--font-xs);
      :hover {
        cursor: pointer;
      }
    }
    button.cancel-button {
      background-color: white;
      border: 0.5px solid var(--black-400);
    }
    button.confirm-button {
      background-color: var(--chat-messagebox);
      color: var(--black-200);
    }
  }
`;

const DeleteModalWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 580px;
  border-radius: var(--br-l);
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: var(--zi-four);
`;
const CancelAllButton = styled.button`
  height: calc(var(--sb-lineheight) + var(--sb-padding) * 2);
  border-radius: 15px;
  width: 48.5%;
  border: none;
  background-color: var(--grey-background);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.1s;
  cursor: pointer;
  span {
    padding-bottom: 1px;
    color: var(--pink-heart);
  }
  :hover {
    background-color: var(--black-250);
  }
`;
const DeleteAllButton = styled(CancelAllButton)<{
  disabled: boolean;
}>`
  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      span {
        display: none;
      }
    `}
  :hover {
    background-color: ${(props) =>
      props.disabled ? "var(--black-250)" : "#ffeeee"};
  }
`;
const ConfirmBarDiv = styled(SendBarFrameDiv)<{ styleProps: sendbarStyleType }>`
  display: flex;
  justify-content: space-between;
`;
const NewMessageBoxWrapper = styled.div<{ showNewMessageBox: boolean }>`
  position: absolute;
  width: 95%;
  height: 50px;
  top: -55px;
  left: 200px;
  border-radius: var(--br-m);
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
  transform: translate3d(-50%, 15px, -10px);
  color: var(--black-900);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px;
  pointer-events: none;
  transform-style: preserve-3d;
  backdrop-filter: blur(8px);
  background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #ffffff88);
  box-shadow: 0px 0px 7px 0px rgba(232, 232, 232, 0.468);
  ${(props) =>
    props.showNewMessageBox &&
    css`
      opacity: 1;
      transform: translate3d(-50%, 0, 10px);
      pointer-events: auto;
    `}
  :hover {
    cursor: pointer;
  }
  img {
    width: 28px;
    height: 28px;
    border-radius: 10px;
  }
  div.message-content {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  span.username {
    font-size: var(--font-xxs);
    color: var(--black-700);
    letter-spacing: 0.03rem;
    margin-bottom: 3px;
    font-weight: var(--fw-medium);
  }
  span.message {
    font-size: var(--font-xxs);
    color: var(--black-900);
    letter-spacing: 0.03rem;
  }
`;
const NotificationModalItemDiv = styled.div<{ startAnimation: boolean }>`
  background-color: white;
  color: var(--black-700);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  font-size: var(--font-xs);
  letter-spacing: 0.1rem;
  border-radius: var(--br-s);
  margin-top: 3px;
  box-shadow: 0 1px 10px 0 rgba(114, 114, 114, 0.1),
    0 2px 15px 0 rgba(112, 112, 112, 0.05);
  animation: ${(props) =>
    props.startAnimation ? "modalOutro 0.6s" : "modalIntro 0.6s"};
  svg {
    color: var(--black-700);
    margin-right: 17jpx;
    width: 20px;
  }
  @keyframes modalIntro {
    0% {
      opacity: 0.2;
      height: 0;
      transform: translateY(-10px);
    }
    50%,
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes modalOutro {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    50%,
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`;
const NotificationModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: transparent;
  color: white;
  border-radius: var(--br-s);
  z-index: var(--zi-five);
  width: 50%;
  top: 65px;
  transform: translateX(calc(50% + 4px));
`;

const CheckboxContainer = styled.div`
  input[type="checkbox"] {
    margin: 0 7px 0 0;
    display: none;
  }
  input + label {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid var(--black-300);
    position: relative;
    margin: 2px 7px 2px 0;
    :hover {
      cursor: pointer;
    }
  }
  input:checked + label::after {
    content: "";
    background-color: var(--reply-borderline);
    font-size: 10px;
    width: 7px;
    height: 7px;
    text-align: center;
    position: absolute;
    border-radius: 50%;
    top: 2px;
    left: 2px;
  }
`;
const ReportForm = styled.form`
  font-size: var(--font-xs);
  width: 100%;
  padding-top: 5px;
  letter-spacing: 0.02rem;
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 2px;
  }
  .radio-box {
    font-size: var(--font-xs);
    letter-spacing: 0.02rem;
    margin-top: 3px;
    vertical-align: text-top;
    display: flex;
    flex-direction: column;
  }

  textarea {
    font-family: "Pretendard Variable";
    resize: none;
    font-size: var(--font-xs);
    width: 100%;
    border: none;
    background-color: var(--black-200);
    border-radius: var(--br-m);
    margin: 3px 0 6px 0;
    padding: 7px 7px;
    cursor: auto;
    :focus {
      outline: none;
    }
  }
  .modal-buttonBox {
    padding: 0 !important;
  }
  button {
    padding: 5px 0;
    width: 48% !important;
  }
`;
const ReportLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: var(--font-sm);
  font-weight: var(--fw-bold);
  margin-top: 4px;
  color: var(--black-900);
  svg {
    color: red;
    margin-right: 5px;
  }
`;

const ReportModalDiv = styled(DeleteModal)`
  height: 310px;
  padding: 20px;
  font-size: var(--font-xs);
  .report-user {
    font-weight: var(--fw-bold);
    width: 100%;
    text-align: start;
  }
  .report-content {
    width: 100%;
    text-align: start;
    text-overflow: ellipsis; //////////////////////////해결하기
    overflow: hidden;
    color: var(--black-700);
    height: 1rem;
  }
`;
const ReportModalWrapper = styled(DeleteModalWrapper)``;

export {
  DeleteModal,
  DeleteModalWrapper,
  CancelAllButton,
  ConfirmBarDiv,
  DeleteAllButton,
  NewMessageBoxWrapper,
  NotificationModalItemDiv,
  NotificationModalWrapper,
  CheckboxContainer,
  ReportForm,
  ReportLabel,
  ReportModalDiv,
  ReportModalWrapper,
};
