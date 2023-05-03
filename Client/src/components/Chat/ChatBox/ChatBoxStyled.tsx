import styled, { css } from "styled-components";
import { MessageType } from "../Chat";
const ChatMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
`;

const UserInfoAlarmWrapper = styled.div`
  display: flex;
  justify-content: center;
  span {
    padding: 5px 10px;
    margin: 5px;
    background-color: #c6c6c6;
    color: white;
    font-size: var(--font-xxs);
    border-radius: 5px;
    letter-spacing: 0.01rem;
    font-weight: var(--fw-medium);
  }
`;

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0 15px 0;
`;

const StyledLoadMoreButton = styled.button`
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black-500);
  background-color: var(--chatbox-background);
  width: 100px;
  height: 30px;
  border-radius: var(--br-l);
  font-size: var(--font-xs);
  color: var(--black-700);
  transition: all ease 0.2s;
  svg.plus-icon {
    margin-left: 5px;
  }
  :hover {
    cursor: pointer;
    border: 1px solid var(--chat-messagebox);
    color: var(--chat-messagebox);
  }
`;
const DeleteCheckIconWrapper = styled.div<{ isDeleteChecked: boolean }>`
  visibility: hidden;
  transition: all ease 0.3s;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(calc(-50% + 10px), calc(-50% + 2px), -2px);
  svg {
    transition: all ease 0.2s;
    color: ${(props) =>
      props.isDeleteChecked ? " var(--pink-heart)" : "var(--black-500)"};
    width: 20px;
    height: 20px;
  }
  :hover {
    cursor: pointer;
    svg {
      animation: check-flashing ease 1s infinite;
    }
  }
  @keyframes check-flashing {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const ChatContentBottomWrapper = styled.div<{
  messageType: MessageType;
  isDeleteMode: boolean;
  isOthers?: boolean;
}>`
  display: flex;
  align-items: flex-end;
  height: 100%;
  transition: all ease 0.3s;
  ${(props) =>
    props.isDeleteMode &&
    props.messageType !== "DELETE" &&
    props.messageType !== "REPORT" &&
    !props.isOthers &&
    css`
      transform: translateX(-25px);
      ${DeleteCheckIconWrapper} {
        visibility: visible;
        pointer-events: auto;
        transform: translate3d(calc(-50% + 35px), calc(-50% + 2px), -2px);
      }
    `}
  :hover {
    time-tag {
      display: block;
    }
  }
  ${(props) =>
    !props.isDeleteMode &&
    props.messageType !== "DELETE" &&
    props.messageType !== "REPORT" &&
    css`
      :hover {
        span {
          opacity: 1;
          visibility: visible;
        }
        span.time-tag {
          display: none;
        }
      }
    `}
`;
const ChatContentMenu = styled.div<{
  type: "RIGHT" | "LEFT";
  reportDisabled?: boolean;
}>`
  position: absolute;
  display: flex;
  padding: 5px;
  height: 100%;
  align-items: center;

  ${(props) =>
    props.type === "RIGHT" &&
    css`
      top: 50%;
      right: 100%;
      transform: translate(calc(-50% + 65px), calc(-50%));
    `}
  ${(props) =>
    props.type === "LEFT" &&
    css`
      top: 50%;
      left: 100%;
      transform: translate(calc(-50% + 65px), calc(-50%));
    `}
      span.report-box {
    svg {
      width: 15px;
      height: 15px;
    }
  }
  ${(props) =>
    !props.reportDisabled &&
    css`
      span.report-box {
        svg {
          color: #9a8aff;
          width: 15px;
          height: 15px;
        }
        :hover {
          background-color: #dad3ff;
        }
      }
    `}

  span.heart-box {
    svg {
      color: var(--pink-heart);
      width: 12px;
      height: 12px;
    }
    :hover {
      background-color: #ffdddd;
    }
  }
  span.reply-box {
    svg {
      width: 13px;
      height: 13px;
    }
    :hover {
      background-color: var(--black-300);
    }
  }
  span.trash-box {
    svg {
      color: var(--pink-heart);
      width: 12px;
      height: 12px;
    }
    :hover {
      background-color: #ffdddd;
    }
  }
  span.setting-box {
    svg {
      color: #9a8aff;
      width: 15px;
      height: 15px;
    }
    :hover {
      background-color: #dad3ff;
    }
  }
`;

const ChatContentMenuItem = styled.span<{ reportDisabled?: boolean }>`
  transition: all ease 0.1s;
  visibility: hidden;
  opacity: 0;
  width: 30px;
  height: 30px;
  padding: 8px;
  border-radius: 50%;
  background-color: var(--black-275);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px !important;
  :hover {
    cursor: pointer;
  }
  ::after {
    position: absolute;
    transform: translate(37px, -18px);
    display: none;
    content: "이미 신고한 메시지입니다";
    font-size: var(--font-xxs);
    color: var(--black-600);
    padding: 5px;
    white-space: nowrap;
    background-color: transparent;
  }
  ${(props) =>
    props.reportDisabled &&
    css`
      svg {
        color: var(--black-600);
      }
      :hover {
        cursor: default;
      }
      :hover::after {
        display: block;
      }
    `}
`;

const ChatContentMyDiv = styled.div<{
  type: "first" | "notFirst";
  messageType: MessageType;
}>`
  word-break: break-all;
  font-size: var(--font-xs);
  letter-spacing: 0.03rem;
  background-color: var(--chat-messagebox);
  margin-top: ${(props) => (props.type === "first" ? "7px" : "0")};
  border-radius: ${(props) =>
    props.type === "first" ? "8px 0 8px 8px" : "8px"};
  padding: 7px 12px;
  color: var(--black-200);
  display: inline;
  max-width: 210px;
  line-height: 1.05rem;
  position: relative;
  transform-style: preserve-3d;
  ${(props) =>
    (props.messageType === "DELETE" || props.messageType === "REPORT") &&
    css`
      color: var(--delete-message);
    `}
`;

const ChatContentWrapper = styled.div<{
  direction: "RIGHT" | "LEFT";
}>`
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.direction === "RIGHT" ? "flex-end" : "flex-start"};
`;

const ChatMessageDiv = styled.div<{
  type: "LEFT" | "RIGHT";
  isFirst?: boolean;
  searchTargetAnimation?: boolean;
}>`
  transform: translate(0, 0);
  display: flex;
  justify-content: ${(props) =>
    props.type === "RIGHT" ? "flex-end" : "flex-start"};
  align-items: ${(props) =>
    props.type === "RIGHT" ? "flex-end" : "flex-start"};
  margin: ${(props) => (props.isFirst ? "20px 10px 2.5px 10px" : "2.5px 10px")};
  animation: ${(props) =>
    props.searchTargetAnimation ? " chatShake 0.2s 2 linear;" : "none"};
  @keyframes chatShake {
    0% {
      transform: translate(-3px, 0);
    }
    50% {
      transform: translate(4px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  span {
    font-size: var(--font-xxs);
    margin: 5px 5px 1px 5px;
    color: var(--black-700);
  }
`;

const ReactionTagSpan = styled.span<{ isVoted?: boolean; isOthers?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17px;
  padding: 0 6px 0 3px;
  margin: 3px 0 1px 0px !important;
  border-radius: 7px;
  background-color: ${(props) => (props.isVoted ? "#ffdddd" : "white")};
  color: var(--black-900) !important;
  font-weight: var(--fw-medium);
  border: ${(props) =>
    props.isVoted ? "0.5px solid #ffd5d5" : "0.5px solid var(--black-300)"};
  svg {
    width: 17px;
    color: var(--pink-heart);
  }
  :hover {
    cursor: ${(props) => (props.isOthers ? "pointer" : "default")};
  }
`;

const ChatContentDiv = styled.div<{
  type: "first" | "notFirst";
  messageType: MessageType;
}>`
  word-break: break-all;
  font-size: var(--font-xs);
  letter-spacing: 0.03rem;
  line-height: 1.05rem;
  background-color: white;
  margin-top: ${(props) => (props.type === "first" ? "3px" : "0")};
  border-radius: ${(props) =>
    props.type === "first" ? "0px 8px 8px 8px" : "8px"};
  padding: 7px 12px;
  color: var(--black-900);
  max-width: 210px;
  position: relative;
  ${(props) =>
    (props.messageType === "DELETE" || props.messageType === "REPORT") &&
    css`
      color: var(--black-600);
    `}
`;

const ChatProfileWrapper = styled.div<{ showProfile: boolean }>`
  width: 35px;
  height: ${(props) => (props.showProfile ? "100%" : "0")};
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UsernameDiv = styled.div`
  font-size: var(--font-xs);
  color: var(--black-800);
  height: 30%;
  font-weight: var(--fw-medium);
  margin-bottom: 2px;
`;
const ReplyMessageBoxDiv = styled.div<{ textColor?: string }>`
  display: flex;
  align-items: flex-start;
  border-radius: 12px;
  padding: 0 2px 5px 0;
  img {
    width: 27px;
    height: 27px;
    object-fit: cover;
    border-radius: 50%;
    margin: 4px 10px 0 0;
  }
  div.target-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      color: ${(props) =>
        props.textColor ? props.textColor : "var(--black-200)"};
      font-size: var(--font-xxs);
      margin: 2px 0 0 0;
      letter-spacing: 0.03rem;
      word-break: break-all;
    }
    span.targetuser-info {
      font-weight: var(--fw-bold);
      color: ${(props) => (props.textColor ? "props.textColor" : "white")};
    }
  }
  :hover {
    cursor: pointer;
  }
`;
const MessageErrorControlWrapper = styled.div`
  padding: 1px 6px 1px 8px;
  background-color: var(--pink-heart);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--br-s);
  color: #ffb7b7;
  margin: 0 7px 4px 0;
  span {
    margin: 3px;
    svg {
      color: white;
      :hover {
        cursor: pointer;
      }
    }
    svg.retry-icon {
      width: 10px;
      height: 10px;
      margin-top: 2px;
    }
    svg.close-icon {
      width: 8px;
      height: 8px;
      margin-top: 2px;
    }
  }
`;

const ChatCreatedDateDiv = styled.div<{ showChatDate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-xxs);
  color: white;
  padding: 20px 0 5px 0;
  white-space: nowrap;
  position: sticky;
  top: -100px;
  ${(props) =>
    props.showChatDate &&
    css`
      top: 0px;
    `}
  z-index: var(--zi-five);
  span {
    margin: 0 10px 0 14px;
    background-color: var(--black-500);
    padding: 4px 7px;
    border-radius: var(--br-m);
  }
`;
export {
  ChatMessageWrapper,
  UserInfoAlarmWrapper,
  LoadMoreButtonWrapper,
  StyledLoadMoreButton,
  ChatContentBottomWrapper,
  ChatContentMenu,
  ChatContentMenuItem,
  ChatContentMyDiv,
  ChatContentWrapper,
  ChatMessageDiv,
  DeleteCheckIconWrapper,
  ReactionTagSpan,
  ChatContentDiv,
  ChatProfileWrapper,
  UsernameDiv,
  ReplyMessageBoxDiv,
  MessageErrorControlWrapper,
  ChatCreatedDateDiv,
};
