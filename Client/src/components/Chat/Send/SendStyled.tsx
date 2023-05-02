import styled, { css } from "styled-components";
import { sendbarStyleType } from "../Chat";
export type SendBarButtonType = "emoji" | "send";
const EmojipickerWrapper = styled.div<{ rowNum: number }>`
  position: absolute;
  right: 0;
  transform: ${(props) =>
    `translateY(calc(-50% - 15px - var(--sb-padding) - var(--sb-lineheight) * ${props.rowNum}/2))`};
  emoji-picker {
    --emoji-font-family: "Apple Color Emoji";
  }
`;
const ReplyInfoDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px 13px 7px;
  div.reply-info {
    margin-right: 10px;
  }
  div.reply-message {
    color: var(--black-800);
    font-size: var(--font-xs);
    word-break: break-all;
  }
  div.reply-user {
    margin-top: 3px;
    font-size: var(--font-xs);
    font-weight: var(--fw-medium);
    color: var(--black-600);
  }
  span {
    color: var(--pink-heart);
    margin-left: auto;
    svg {
      width: 17px;
      height: 17px;
    }
    :hover {
      cursor: pointer;
    }
  }
`;
const SendbarButton = styled.div<{
  buttontype: SendBarButtonType;
  rowNum: number;
  showEmoji?: boolean;
  disabled?: boolean;
}>`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0.5;
  background-color: var(--chatbox-background);
  border: none;
  width: 10%;
  transition: background-color ease 0.1s;
  height: ${(props) =>
    `calc(${props.rowNum} * var(--sb-lineheight) + var(--sb-padding) * 2)`};
  div.emoji-icon {
    transition: all ease 0.2s;
    filter: grayscale(100%);
    font-size: var(--font-md);
  }
  svg.send-icon {
    transition: all ease 0.2s;
    transform: scale(1.1);
    color: ${(props) =>
      props.disabled ? "var(--black-400)" : "var(--black-800)"};
  }
  ${(props) =>
    props.buttontype === "emoji" &&
    css`
      border-radius: 0;
    `}
  ${(props) =>
    props.buttontype === "send" &&
    css`
      border-radius: 0 15px 15px 0;
    `}
    ${(props) =>
    props.showEmoji &&
    css`
      div.emoji-icon {
        font-size: var(--font-xl);
        filter: none;
      }
    `}
      :hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
    background-color: ${(props) =>
      props.disabled ? "var(--chatbox-background)" : "var(--black-275)"};
    div.emoji-icon {
      font-size: var(--font-xl);
      filter: none;
    }
  }
`;

const SendBarFrameDiv = styled.div<{
  styleProps: sendbarStyleType;
  showSearchBox?: boolean;
  showNewMessageBox?: boolean;
}>`
  --sb-padding: ${(props) => `${props.styleProps.padding}px`};
  --sb-lineheight: ${(props) => `${props.styleProps.lineheight}px`};
  width: 100%;
  padding: 15px;
  background-color: white;
  position: sticky;
  bottom: 0;
  border-radius: ${(props) =>
    props.showSearchBox ? "0 0 15px 0" : "0 0 15px 15px"};
  z-index: ${(props) => (props.showNewMessageBox ? "0" : "-1")};
  transition: ${(props) =>
    props.showNewMessageBox ? "none" : "all ease 0.5s"};
`;

const SendBarDiv = styled.div<{
  disabled: boolean;
  rowNum: number;
}>`
  display: flex;
  width: 100%;
  textarea {
    background-color: var(--chatbox-background);
    font-family: "Pretendard Variable";
    display: block;
    flex-grow: 9.2;
    border-radius: 15px 0 0 15px;
    border: none;
    padding: var(--sb-padding) 0 var(--sb-padding) 15px;
    resize: none;
    overflow: auto;
    line-height: var(--sb-lineheight);
    scrollbar-gutter: stable;
    scroll-padding-bottom: var(--sb-padding);
    font-size: var(--font-xs);
    cursor: auto;
    :focus {
      outline: none;
    }
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
  }
`;

export {
  EmojipickerWrapper,
  ReplyInfoDiv,
  SendbarButton,
  SendBarDiv,
  SendBarFrameDiv,
};
