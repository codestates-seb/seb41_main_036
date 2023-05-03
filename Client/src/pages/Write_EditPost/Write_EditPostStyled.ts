import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fcfcfc;
`;

export const WritePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const WritePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  input {
    padding-left: 10px;
    width: 80%;
    border: none;
    outline: none;
    font-size: 25px;
    font-weight: var(--fw-bold);
    background-color: transparent;
    &:focus {
      border-color: transparent;
    }
    &::placeholder {
      font-size: 30px;
      font-weight: var(--fw-bold);
    }
  }
  hr {
    margin-top: 10px;
    height: 1px;
    border: 0;
    background: #b8b8b8;
  }
  div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const PreviewContainer = styled.div`
  width: 55%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f0f0f0;
  padding: 10px 40px;
  word-break: break-all;
  div:first-child {
    h2 {
      margin-top: 5px;
      margin-bottom: 25px;
      height: 44px;
    }
    button {
      margin-right: 10px;
    }
  }
`;

export const PreviewContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagBox = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 7px;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-l);
  margin: 0 10px;
  font-size: var(--font-sm);
  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
`;

export const TagWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #2d2d2d;
  > input {
    width: 200px;
    padding-left: 10px;
    font-size: var(--font-base);
    height: 30px;
    outline: none;
    color: #2d2d2d;
    &::placeholder {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  background-color: #fcfcfc;
  > div:nth-child(1) {
    width: 45%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > div:nth-child(2) {
    width: 55%;
    background-color: #f0f0f0;
    padding: 20px;
    font-size: 20px;
    font-weight: var(--fw-bold);
  }
`;

export const PreviewImgContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow: scroll;

  > img {
    width: 100%;
  }
`;

export const PreviewTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

export const HandleBackAndSubmitContainer = styled.div`
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--black-200);
  position: fixed;
  bottom: 0;
  width: 45%;
  height: 60px;
  box-shadow: 0 -5px 3px -5px #adadad;
  svg {
    font-size: var(--font-xxxl);
    :hover {
      cursor: pointer;
      color: var(--black-600);
    }
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;
  padding: 20px;
  width: 400px;
  height: 300px;
  border: 0.5px solid var(--purple-300);
  background: rgba(255, 255, 255, 0.45);
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  input {
    color: var(--purple-400);
    border: none;
    background-color: transparent;
    display: none;
  }
  textarea {
    width: 300px;
    resize: none;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--black-500);
    &:focus {
      box-shadow: 0 0 10px var(--purple-300);
      border: 0;
      outline: none;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    margin-bottom: 20px;
    background-color: var(--black-200);
    border-radius: var(--br-l);
    color: var(--black-700);
    font-weight: var(--fw-bold);
    padding: 10px 0;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      color: var(--purple-300);
      transform: translateY(-5px);
    }
  }
  svg {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
  button:last-child {
    padding-top: 30px;
    background-color: transparent;
  }
`;

export const AddButton = styled.button`
  width: 30px;
  height: 30px;
`;

export const SelectImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 200px;
    height: 200px;
  }
`;

export const WriteGuideModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const WriteGuideModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const WriteGuideModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 35rem;
  }
`;

export const WriteGuideModalGuideText = styled.div`
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
