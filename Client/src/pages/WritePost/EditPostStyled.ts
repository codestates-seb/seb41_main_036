import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 92vh;
  background-color: #fcfcfc;
  > form {
    width: 45%;
    display: flex;
    flex-direction: column;
    padding: 10px 40px;
  }
  input {
    padding-left: 10px;
    width: 80%;
    border: none;
    outline: none;
    font-size: 25px;
    font-weight: var(--fw-bold);
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
      padding-left: 20px;
    }
    button {
      margin-right: 10px;
    }
  }
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    > p {
      width: 84%;
      font-size: 15px;
      margin-left: 38px;
      margin-bottom: 100px;
      text-align: start;
      color: #2d2d2d;
      line-height: 24px;
    }
    > button {
      margin-top: 20px;
      width: 94.5%;
      height: 20px;
      font-size: 14px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      color: var(--purple-400);
      cursor: pointer;
      text-align: right;
    }
  }
`;

export const TagBox = styled.span`
  padding: 5px 7px;
  border: none;
  background-color: transparent;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-l);
  margin: 0 10px;
  font-size: var(--font-xs);
  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
  button {
    border: none;
    background-color: transparent;
  }
  svg {
    padding-top: 3px;
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
  }
  > div:nth-child(2) {
    width: 55%;
    background-color: #f0f0f0;
    padding: 20px;
    text-align: right;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const PreviewImgWrapper = styled.div`
  overflow: scroll;
  width: 90%;
  height: 400px;
  margin: 0 auto;
  object-fit: cover;
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
  // background-color: aqua;
  border: 0.5px solid var(--purple-300);
  /* From https://css.glass */
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