import styled from "styled-components";
import { ChatPanelStatusType } from "./Chat";

const ChatBoxDiv = styled.div<{
  chatStatus: ChatPanelStatusType;
}>`
  width: 400px;
  height: 580px;
  position: fixed;
  bottom: 40px;
  right: 55px;
  border-radius: var(--br-l);
  z-index: ${(props) =>
    props.chatStatus === "MINIMIZED" ? "var(--zi-m-four)" : "var(--zi-five)"};
  background-color: var(--chatbox-background);
  box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
  display: ${(props) => (props.chatStatus === "EXITED" ? "none" : "flex")};
  opacity: ${(props) => (props.chatStatus === "MINIMIZED" ? "0" : "1")};
  flex-direction: column;
  transform-style: preserve-3d;
`;

const ChatBoxWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding-bottom: 5px;
  height: 100%;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::webkit-scrollbar-gutter {
    scrollbar-gutter: auto;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--chatbox-background);
    border-radius: 5px;
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: var(--black-400);
  }
`;

const ChatHeaderWrapper = styled.div<{ showSearchBox: boolean }>`
  position: sticky;
  height: 60px;
  border-radius: ${(props) =>
    props.showSearchBox ? "0 var(--br-l) 0 0" : "var(--br-l) var(--br-l) 0 0"};
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--black-275);
  background-color: white;
  padding-top: 1px;
  z-index: var(--zi-four);
`;
const LogoIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 10px 14px 20px;
  svg {
    height: 20px;
    path {
      fill: white;
    }
  }
`;
const ChatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    margin-top: 2px;
  }
  div {
    font-size: var(--font-xs);
    color: var(--black-700);
    margin-top: 4px;
    span {
      color: var(--black-900);
    }
  }
`;
const Tooltip = styled.span`
  position: absolute;
  display: block;
  transform: translate(-25%);
  opacity: 0;
  transition: all ease 0.1s;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: var(--fw-medium);
  font-size: var(--font-xxs);
  padding: 5px;
  border-radius: var(--br-s);
`;
const ChatControllWrapper = styled.div`
  margin-left: auto;
  margin-right: 12px;
  display: flex;
  span.tooltip-iconwrapper {
    color: var(--black-900);
    margin: 0 7px;
    display: inline-block;
    vertical-align: middle;
    :hover {
      cursor: pointer;
    }
  }
  .search-icon {
    height: 22px;
    width: 20px;
  }
  .out-icon {
    height: 22px;
    width: 20px;
  }
  .window-icon {
    width: 20px;
  }
  span:hover ${Tooltip} {
    opacity: 1;
  }
`;

const ChatExpandableButton = styled.button<{
  connected: boolean;
  chatStatus: ChatPanelStatusType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: var(--br-l);
  box-shadow: 0px 2px 15px 0px rgba(161, 161, 161, 0.322);
  background-color: white;
  z-index: var(--zi-four);
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: ${(props) =>
    props.chatStatus === "EXITED" ? "none" : "1px solid var(--purple-300)"};
  cursor: pointer;
  svg {
    color: ${(props) =>
      props.chatStatus === "EXITED" ? "var(--black-900)" : "var(--purple-300)"};
    width: 20px;
    height: 20px;
  }
  span {
    font-size: var(--font-xxs);
    position: absolute;
    transform: translate(20px, -22px);
    background-color: var(--purple-300);
    color: var(--black-200);
    padding: 3px 6px;
    border-radius: 50%;
  }
`;
const DividerLine = styled.hr<{
  width?: string;
  margin?: string;
  color?: string;
}>`
  width: ${(props) => (props.width ? props.width : "98%")};
  margin: ${(props) =>
    props.margin ? `${props.margin} 0 5px 0` : "0 0 var(--sb-padding) 0"};
  border: ${(props) =>
    props.color
      ? `0.5px solid ${props.color}`
      : "0.5px solid var(--black-300)"};
  text-align: center;
  transform: translateX(1%);
`;
export {
  ChatControllWrapper,
  ChatInfoWrapper,
  LogoIconWrapper,
  ChatBoxWrapper,
  ChatBoxDiv,
  ChatHeaderWrapper,
  ChatExpandableButton,
  DividerLine,
  Tooltip,
};
