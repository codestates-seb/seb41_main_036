import styled from "styled-components";

export const PostCommentContainer = styled.div`
  width: 70%;
  margin: 20px auto;
  > div {
    display: flex;
    justify-content: space-between;
  }
  > div > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div > div:first-child {
    display: flex;
  }
  > div > div:first-child > div {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  > div > div:first-child > div > span {
    font-size: var(--font-xxs);
    font-weight: 200;
    margin-top: 4px;
  }
  > div > div:last-child {
    display: flex;
  }
  > form {
    width: 100%;
  }
  > div:last-child {
    padding: 20px 40px;
    border-bottom: 1px solid var(--black-600);
  }
  > form {
    padding: 20px 40px;
  }
  > form > textarea {
    width: 100%;
    height: 100px;
    display: flex;
    resize: none;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--purple-300);
    font-size: var(--font-base);
    &:focus {
      outline-color: var(--purple-400);
      box-shadow: 0 0 6px var(--purple-300);
    }
  }
`;

export const PostManageButton = styled.button`
  min-width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  font-size: var(--font-sm);
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;