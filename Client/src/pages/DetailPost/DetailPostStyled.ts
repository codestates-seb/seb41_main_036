import styled from "styled-components";

export const DetailPostWrapper = styled.div`
  width: 83.5%;
  margin: 30px auto;
`;

export const PostMangeButtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5em;
  width: 85%;
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

export const DetailPostTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  > h2 {
    width: 50%;
    text-align: center;
    font-size: var(--font-xxl);
  }
`;

export const DetailPostInfo = styled.div`
  width: 70%;
  display: flex;
  margin: 2em auto;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  div:first-child {
    display: flex;
    align-items: center;
    color: var(--black-800);
    margin-top: 25px;
  }
  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: var(--font-sm);
  }
  > div:last-child > button {
    display: flex;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const PostContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  justify-content: center;
  margin: 0 auto;

  > div:nth-child(2) {
    margin: 30px auto 0;
    width: 70%;
  }
`;

export const PostContentBox = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    height: 30%;
    margin: 0 auto;
    object-fit: cover;
    margin-bottom: 2em;
  }
  div > div:last-child {
    padding: 0 30px;
    text-align: center;
    margin-bottom: 2em;
  }
`;
export const TagsButton = styled.button`
  padding: 7px 10px;
  height: 30px;
  border: none;
  background-color: transparent;
  margin-right: 10px;
  margin-top: 5em;
  cursor: pointer;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  border-radius: var(--br-s);
  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
`;

export const PostContentBottom = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 0 3em 0;
  border-bottom: 1px solid var(--black-600);
  > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    font-size: var(--font-base);
  }
  > div:last-child {
    width: 100px;
    display: flex;
    justify-content: space-around;
  }
  > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--black-700);
    cursor: pointer;
  }
  > div > div > span {
    font-size: var(--font-xs);
    color: var(--black-900);
  }
`;

export const AddComment = styled.form<{ isLogin: boolean }>`
  margin: 35px auto 50px;
  width: 80%;
  > h3 {
    margin-left: 7%;
    font-size: var(--fw-reg);
    color: var(--black-800);
  }

  > div {
    width: 94%;
    margin: 22px 30% 0 58px;
    display: flex;
  }
  > div > img {
    width: 40px;
    height: 40px;
    border-radius: var(--br-l);
    margin: 0 14px 0 30px;
  }
  > div > textarea {
    border-color: #c6c6c6;
    width: 90%;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    resize: none;
    margin-bottom: 30px;
  }
  button {
    position: relative;
    top: 8em;
    right: 6.2em;
  }
`;

export const EmptyCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  color: var(--black-700);
  font-size: var(--font-sm);
  svg {
    margin-right: 1em;
  }
`;

export const DetailPostAttractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-md);
  font-weight: var(--fw-bold);
  color: var(--black-500);
  p {
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
    font-weight: var(--fw-reg);
    letter-spacing: 0.03rem;
    svg {
      color: var(--black-500);
    }
  }
`;
