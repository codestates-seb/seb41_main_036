import styled, { css } from "styled-components";

export const FavoriteCardContainer = styled.div<{
  DeleteMode: boolean;
  startAnimation: boolean;
}>`
  position: relative;
  height: 185px;
  background-color: white;
  border-radius: var(--br-m);
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box !important;
  border: ${(props) =>
    props.startAnimation ? "0" : "1px solid var(--black-275)"};
  margin: ${(props) => (props.startAnimation ? "10px 0 0" : "10px 3px 0 3px")};
  padding: ${(props) => (props.startAnimation ? "0" : "5px")};
  width: ${(props) => (props.startAnimation ? "0" : "32%")};
  transform: ${(props) => (props.startAnimation ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startAnimation ? "0" : "1")};
  overflow: hidden;
  svg {
    position: absolute;
    transform: translateY(50px);
    display: none;
    color: var(--black-900);
    opacity: 0.9;
    height: 80px;
    width: 40px;
    z-index: var(--zi-three);
    transition: all 0.3s ease;
    :hover {
      color: red;
      cursor: pointer;
    }
  }
  :hover::after {
    display: ${(props) => (props.DeleteMode ? "block" : "none")};
    position: absolute;
    content: "";
    z-index: var(--zi-two);
    bottom: 0;
    left: 0;
    height: 182px;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  :hover {
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
    svg {
      display: ${(props) => (props.DeleteMode ? "block" : "none")};
    }
  }
`;
export const AttractionImage = styled.img`
  margin-top: 8px;
  object-fit: cover;
  width: 90%;
  height: 60%;
  aspect-ratio: 4/3;
  border-radius: 2px;
  margin-bottom: 2px;
  :hover {
    cursor: pointer;
  }
`;
export const AttractionTextInfo = styled.div`
  width: 90%;
  padding: 5px 0;
  color: var(--black-900);
  display: flex;
  span {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: var(--font-xs);
    margin: 4px 8px 4px 0;
    color: var(--black-700);
    border-radius: 10px;
    border: 1px solid var(--black-250);
    background-color: var(--black-200);
    strong {
      color: var(--black-700);
      font-weight: var(--fw-medium);
      margin-left: 3px;
    }
  }
  h3 {
    display: inline;
    font-size: var(--font-sm);
    font-weight: 700;
    letter-spacing: 0.05rem;
    color: var(--black-800);
    margin-left: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export const Page = styled.nav`
  width: 300px;
  margin: 0 auto;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

export const MyPagePostCardWrapper = styled.div<{
  EditMode: boolean;
  startTransition: boolean;
}>`
  position: relative;
  width: 100%;
  margin: ${(props) => (props.startTransition ? "0" : "3px")};
  border-radius: var(--br-m);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  border: ${(props) => (props.startTransition ? "0" : "1px solid white")};
  padding: ${(props) => (props.startTransition ? "0" : "2px 5px")};
  background-color: hsl(230, 60%, 99%);
  height: ${(props) => (props.startTransition ? "0" : "18.3%")};
  transform: ${(props) => (props.startTransition ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startTransition ? "0" : "1")};
  :hover {
    background-color: white;
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
  }
  :hover::after {
    display: ${(props) => (props.EditMode ? "block" : "none")};
    position: absolute;
    content: "";
    transform: translateX(-4px);
    z-index: var(--zi-two);
    height: 100%;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
export const PostImg = styled.img`
  height: 80%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 30%;
  margin: 0 12px 0 5px;
  :hover {
    cursor: pointer;
  }
`;
export const MyPagePostTextInfoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  h2 {
    font-size: var(--font-sm) !important;
    font-weight: var(--fw-bold) !important;
    color: var(--black-800) !important;
    letter-spacing: 0.05rem;
    margin-bottom: 7px;
    :hover {
      cursor: pointer;
    }
  }
`;
export const MyPagePostTextInfoRightContainer = styled.div`
  font-size: var(--font-xs);
  color: var(--black-700);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60%;
  margin-right: 15px;
  span {
  }
  .modifiedAt {
    color: var(--purple-300);
    opacity: 0.8;
  }
`;
export const PostTextInfoBottom = styled.div`
  display: flex;
  span {
    font-size: var(--font-xs);
    margin-right: 5px;
    color: var(--black-700);
  }
`;
export const IconWrapper = styled.div`
  margin-right: 20px;
  position: relative;
  z-index: var(--zi-three);
  svg {
    color: var(--black-680);
    opacity: 0.9;
    height: 40px;
    width: 23px;

    transition: all 0.3s ease;
    cursor: pointer;
  }
  .edit-icon {
    margin-right: 15px;
    :hover {
      color: black;
    }
  }
  .delete-icon:hover {
    color: red;
    opacity: 0.8;
  }
`;
