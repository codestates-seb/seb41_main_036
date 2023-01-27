import styled, { keyframes } from "styled-components";

const SearchBarWrapper = styled.div`
  max-width: 420px;
  min-width: 350px;
  margin-left: 38px;
`;
const SearchForm = styled.form<{ isVisible: Boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(0, -22px);
  max-width: 420px;
  min-width: 358px;
  border-radius: var(--br-l);
  background-color: ${(props) => (props.isVisible ? "white" : "transparent")};
  padding: 3px 3px 5px;
  box-shadow: ${(props) =>
    props.isVisible ? "0px 0px 10px 5px rgba(225,225,225,0.2)" : "none"};
  input {
    font-family: "Pretendard Variable";
    font-size: var(--font-sm);
    padding: 10px 60px 10px 12px;
    border: 0;
    border-radius: ${(props) => (props.isVisible ? "0" : "var(--br-m)")};
    border-bottom: ${(props) =>
      props.isVisible ? "1px solid var(--black-275)" : "1px solid transparent"};
    background-color: ${(props) =>
      props.isVisible ? "transparent" : "var(--black-275)"};
    color: var(--black-800);
    transition-property: background-color, border-radius;
    transition-duration: 0.1s;
    transition-timing-function: ease;
    &:hover {
      cursor: text;
    }
    &::placeholder {
      font-size: var(--font-sm);
      color: ${(props) =>
        props.isVisible ? "transparent" : "var(--black-600)"};
    }
    &:focus {
      outline: none;
    }
    &::selection {
      background-color: var(--black-800);
      color: white;
    }
  }
  svg.search-icon {
    position: absolute;
    transform: translate(1600%, 38%);
    width: 20px;
    height: 20px;
    color: var(--black-500);
    transition: all 0.2s ease;
    &:hover {
      color: var(--purple-300);
      cursor: pointer;
    }
  }
  svg.more-search {
    padding-right: 5px;
    color: var(--purple-300);
  }
  svg.reset-icon {
    position: absolute;
    width: 27px;
    height: 27px;
    transform: translate(1080%, 15%);
    color: var(--black-500);
    &:hover {
      color: var(--pink-heart);
      cursor: pointer;
    }
  }
`;
const SuggestionItemWrapper = styled.ul`
  max-width: 420px;
  list-style: none;
  padding-left: 0px;
  margin: 0;
`;
const AttractionItem = styled.div<{ selectedEl: Boolean }>`
  max-width: 400px;
  color: var(--purple-300);
  background-color: ${(props) =>
    props.selectedEl ? "var(--black-250)" : "var(--black-100)"};
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 6px 5px 1px;
  border-radius: var(--br-m);
  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  svg {
    color: var(--black-300);
    width: 18px;
    height: 18px;
    transition: all 0.2s ease;
  }
  &:hover {
    svg {
      color: var(--purple-300);
    }
  }
  transition: all 0.2s ease;
`;
const AttractionItemContent = styled.div<{
  type: string;
}>`
  display: flex;
  align-items: center;
  letter-spacing: 0.02rem;
  text-align: start;
  font-size: ${(props) =>
    props.type === "name"
      ? "var(--font-sm)"
      : props.type === "more-result"
      ? "var(--font-xs)"
      : "var(--font-xs)"};
  color: ${(props) =>
    props.type === "name" ? "var(--black-900)" : "var(--black-680)"};
  padding: ${(props) => (props.type === "notice" ? "10px" : "0")};
  white-space: pre;
  strong {
    font-size: var(--font-sm);
    font-weight: var(--fw-bold);
  }
  padding-top: ${(props) =>
    props.type === "name" || props.type === "more-result"
      ? "0"
      : props.type === "notice"
      ? "14px"
      : "2px"};
  cursor: ${(props) => (props.type === "notice" ? "default" : "pointer")};
  &:hover {
    color: ${(props) =>
      props.type === "more-result" ? "var(--purple-300)" : "none"};
  }
  transition: all 0.2s ease;
`;
const HeaderTop = styled.div`
  background-color: var(--black-250);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: var(--zi-four);
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0 75px;
`;
const HeaderTopMenu = styled.ul`
  position: relative;
  z-index: var(--zi-four);
  display: flex;
  font-size: var(--font-xs);
  li {
    position: relative;
    padding-left: 30px;
    height: 100%;
    list-style: none;
    color: var(--black-900);
    button {
      border: 0;
      background-color: transparent;
    }
  }
`;
const HeaderBody = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  display: flex;
  max-width: 100%;
  padding: 0 75px;
  svg.logo {
    width: 200px;
  }
`;
const HeaderBodyMenu = styled.ul`
  margin-left: auto;
  display: flex;
  li {
    font-size: var(--font-sm);
    list-style: none;
    padding-left: 35px;
    white-space: nowrap;
    text-align: center;
    font-weight: 600;
    color: var(--black-900);
    transition: all 0.3s ease;
    &:hover {
      color: var(--purple-300);
      cursor: pointer;
    }
  }
`;
const Profile = styled.div`
  margin-left: 20px;
  width: 40x;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const HeaderWrapper = styled.header<{
  isVisible: boolean;
  headerColor?: string;
}>`
  background-color: ${(props) =>
    props.headerColor ? props.headerColor : "white"};
  flex-direction: column;
  position: sticky;
  z-index: var(--zi-four);
  top: ${(props) => (props.isVisible ? "0" : "-104px")};
  display: flex;
  transition: all 0.7s cubic-bezier(0.3, 1, 0.65, 1);
  will-change: auto;
`;
const HeaderBodyWrapper = styled.div<{ backgroundOn: boolean }>`
  width: 100%;

  background-color: ${(props) =>
    props.backgroundOn ? "white" : "transparent"};
`;
const HeaderMountEffect = keyframes`
   0% {
    transform:translate(0%,-42px);
    
  }
  100% {
    transform:translate(0,31px);
  }
`;
const HeaderUnMountEffect = keyframes`
  0% {
    transform:translate(0,31px);
  }
  100% {
    transform:translate(0%,-42px);
    
  }
`;
const HiddenHeaderBodyWrapper = styled.header<{
  isVisible: boolean;
}>`
  position: fixed;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  box-shadow: 0 3px 32px 0 rgba(180, 180, 180, 0.1);
  -webkit-backdrop-filter: blur(11.5px);
  margin: 0 auto;
  left: 0;
  right: 0;
  transform: ${(props) =>
    props.isVisible ? "translate(0,32px)" : "translate(0,-42px)"};
  animation: ${(prop) =>
      prop.isVisible ? HeaderMountEffect : HeaderUnMountEffect}
    0.9s ease forwards;
`;
const HiddenHeaderTopWrapper = styled.div<{ isVisible: boolean }>`
  height: 32px;
  position: relative;
  z-index: var(--zi-four);
  width: 100%;
  margin: 0 auto;
  background-color: var(--black-250);
  svg.arrow-down {
    transition: all 0.5s ease-in-out;
    transform-origin: center;
    transform: ${(props) =>
      props.isVisible
        ? "translate(4370%, -150%) rotate( -180deg) "
        : "translate(4370%, -150%)"};
    z-index: var(--zi-four);
    position: absolute;
    color: var(--black-700);
  }
`;

export {
  SearchBarWrapper,
  SearchForm,
  AttractionItem,
  AttractionItemContent,
  SuggestionItemWrapper,
  HeaderTop,
  HeaderTopMenu,
  HeaderBody,
  HeaderBodyMenu,
  Profile,
  HeaderWrapper,
  HeaderBodyWrapper,
  HiddenHeaderBodyWrapper,
  HiddenHeaderTopWrapper,
};