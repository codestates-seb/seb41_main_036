import styled from "styled-components";

export const MyPageWrapper = styled.div`
  height: calc(100vh - 33px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MyPageContainer = styled.div`
  width: 83.5%;
  height: 75vh;
  margin: 0 auto;
  background-color: white;
  border-radius: var(--br-l);
  display: flex;
`;
export const MyPageUserInfo = styled.aside`
  width: 20%;
  height: 100%;
  letter-spacing: 0.03rem;
  > div:first-child {
    svg {
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    height: 85%;

    div:nth-child(3) {
      svg {
        cursor: pointer;
        margin-left: 25%;
        color: var(--black-800);
        :hover {
          color: var(--purple-300);
        }
      }
    }
    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-bottom: 20px;
    }

    div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: var(--font-sm);
      color: var(--black-900);
      svg {
        color: var(--black-500);
        margin-right: 3px;
      }
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      font-weight: var(--fw-bold);
      font-size: var(--font-xl);
      margin-bottom: 20px;
      svg {
        margin-left: 10px;
      }
    }
    div:nth-child(3) {
      color: var(--black-800);
      font-size: var(--font-base);
      font-weight: var(--fw-bold);
    }
    div:nth-child(4) {
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        color: var(--purple-400);
      }
    }
  }
  input {
    color: var(--black-900);
    top: 10em;
    height: 30px;
    padding: 8px 7px 6px;
    margin-top: 5px;
    border: none;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid var(--black-500);
    background-color: var(--black-200);
    transition: all 0.3s ease;
    :focus {
      outline: none;
      border-bottom: 1px solid var(--purple-300);
      background-color: hsl(235, 100%, 97%);
    }
    &::selection {
      background-color: var(--purple-300);
      color: white;
    }
  }
`;
export const MyPageMainContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-bottom-left-radius: var(--br-l);
  border-bottom-right-radius: var(--br-l);
  background-color: hsl(223, 64%, 98%);
  box-shadow: 0px 20px 20px -20px rgba(184, 184, 184, 0.5);
  color: var(--black-800);

  > div {
    height: 100%;
    padding: 30px;
    > span {
      text-align: right;
      font-weight: var(--fw-base);
      font-size: var(--font-sm);
      margin: 0 5px 10px 0;
    }
  }
  h2 {
    font-size: var(--font-base);
    font-weight: var(--fw-md);
    letter-spacing: 0.03rem;
    display: inline;
  }
`;

export const MyPageTabBarContainer = styled.nav`
  display: flex;
  width: 50%;
  height: 50px;
`;

export const MyPageTabBarMenu = styled.button`
  font-family: "Pretendard variable";
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
  width: 100%;
  height: 100%;
  border-top-left-radius: var(--br-l);
  border-top-right-radius: var(--br-l);
  background-color: #fdfdfd;
  font-weight: var(--fw-bold);
  color: var(--black-700);
  border: none;
  font-size: var(--font-sm);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  svg {
    transition: all 0.2s ease-in-out;
    margin: 0 10px 0px 0;
    color: var(--black-500);
  }

  &.onToggle {
    color: var(--purple-400);
    background-color: #f6f8fd;

    svg {
      color: var(--purple-400);
    }
  }
`;
export const EditSubmitButton = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  background-color: var(--purple-300);
  border-radius: var(--br-m);
  margin-top: 10px;
  color: white;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  svg {
    margin-right: 5px;
  }
  span {
    display: flex;
    align-items: center;
    font-weight: var(--fw-medium);
    margin-bottom: 10px;
  }
  :hover {
    cursor: pointer;
    color: var(--purple-300);
  }
`;
export const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  color: var(--black-700);
  width: 30px;
  position: relative;
  top: 2.5em;
  left: 1.6em;
  border: none;
  background-color: transparent;
  margin-left: 45%;
  margin-top: 3%;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

export const MyPageCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 11px;
  background-color: #ffffff;
  border-radius: var(--br-m);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 10%;
  cursor: pointer;
  h3 {
    font-size: 15px;
    width: 75%;
  }
  div {
    display: flex;
    align-items: center;
    width: 85px;
    height: 100%;
    font-size: var(--font-sm);
    span:first-child {
      margin-right: 6px;
    }
  }
  img {
    width: 100px;
    height: 35px;
    object-fit: cover;
    border-radius: var(--br-s);
  }
  span {
    display: flex;
    align-items: center;
    line-height: 50px;
    margin-right: 10px;
  }
`;

export const MyPageMainTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  span {
    font-size: var(--font-sm);
  }
`;

export const EditButton = styled.button<{ EditPosts: boolean }>`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: var(--black-275);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 7px 8px 5px;

  color: ${(props) => (props.EditPosts ? "var(--black-800)" : "#33b864")};

  :hover {
    background-color: ${(props) =>
      props.EditPosts ? "var(--black-600)" : "#33b864"};
    opacity: 0.8;
    border-radius: 10px;
    color: white;
  }
`;

export const DeleteButton = styled.button<{
  BookMarkDelete?: boolean;
  EditPosts?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: var(--black-275);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  padding: 7px 8px 5px;

  color: ${(props) => (props.BookMarkDelete ? "var(--black-800)" : "red")};
  opacity: 0.7;

  :hover {
    background-color: ${(props) =>
      props.BookMarkDelete ? "var(--black-600)" : "red"};
    opacity: 0.8;
    border-radius: 10px;
    color: white;
  }
`;

export const FavoriteCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  transition: all 0.5s ease;
`;
export const MyPagePostCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 390px;
  margin-top: 10px;
  gap: 1px 2%;
`;
