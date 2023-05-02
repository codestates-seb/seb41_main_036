import { useState, ChangeEvent, KeyboardEvent, FormEvent, useRef } from "react";
import { flushSync } from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ShowNewMesssageBoxState,
  ShowSearchBox,
  isReplyMessageState,
} from "../../../recoil/ChatState";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react";
import useClickDetect from "../../../hooks/useClickDetect";

import { generateRandomEmoji } from "../../../utils/utils";
import { DividerLine } from "../ChatStyled";
import {
  EmojipickerWrapper,
  ReplyInfoDiv,
  SendBarDiv,
  SendBarFrameDiv,
  SendbarButton,
} from "./SendStyled";
import { RiSendPlaneFill as SendIcon } from "react-icons/ri";
import { IoClose as CloseIcon } from "react-icons/io5";
import { TbArrowForward as ReplyIcon } from "react-icons/tb";
import { chatDatatype, sendbarStyleType } from "../Chat";
import NewMessageModal from "../Modal/NewMessageModal";

export const sendbarStyle: sendbarStyleType = {
  padding: 10,
  lineheight: 20,
};

interface SendbarProps {
  sendMessage: (text: string) => void;
  replyMessage: (text: string, targetInfo: chatDatatype) => void;
  scrollIntoBottom: () => void;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const Sendbar = ({
  sendMessage,
  replyMessage,
  scrollIntoBottom,
  chatDataMapRef,
}: SendbarProps) => {
  const {
    ref: emojiRef,
    isVisible: showEmoji,
    setIsVisible: setShowEmoji,
  } = useClickDetect();
  const [isReplyMessage, setIsReplyMessage] =
    useRecoilState(isReplyMessageState);
  const [text, setText] = useState("");
  const [rowNum, setRowNum] = useState(1);
  const [emoji, setEmoji] = useState("🙂");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const showSearchBox = useRecoilValue(ShowSearchBox);
  const showNewMessageBox = useRecoilValue(ShowNewMesssageBoxState);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText((e.target as HTMLTextAreaElement).value);
  };

  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    flushSync(() => {
      if (text.trim().length === 0) return;
      if (isReplyMessage) {
        replyMessage(text, isReplyMessage);
        setIsReplyMessage(null);
      } else {
        sendMessage(text);
      }
      setText("");
      setRowNum(1);
    });
    scrollIntoBottom();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      flushSync(() => {
        if (text.trim().length === 0) return;
        if (isReplyMessage) {
          replyMessage(text, isReplyMessage);
          setIsReplyMessage(null);
        } else {
          sendMessage(text);
        }
        setText("");
        setRowNum(1);
      });

      scrollIntoBottom();
    }
  };

  function handleOnInput(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;

    if (target.scrollHeight > target.clientHeight && rowNum < 5) {
      setRowNum((p) => p + 1);
      return; //다음줄로 넘어가면 row늘리기
    }
    if (target.scrollHeight === target.clientHeight && rowNum !== 1) {
      target.style.height = "0";
      const newRowNum = Math.ceil(
        (target.scrollHeight - sendbarStyle.padding * 2) /
          sendbarStyle.lineheight
      );
      target.style.cssText = "";
      if (newRowNum < rowNum) setRowNum(newRowNum);
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    flushSync(() => {
      setText((p) => p + emojiData.emoji);
    });

    if (
      (textareaRef.current as HTMLTextAreaElement).scrollHeight >
        (textareaRef.current as HTMLTextAreaElement).clientHeight &&
      rowNum < 5
    ) {
      setRowNum((p) => p + 1);
      return; //다음줄로 넘어가면 row늘리기
    }
    (textareaRef.current as HTMLTextAreaElement).scrollTop = (
      textareaRef.current as HTMLTextAreaElement
    ).scrollHeight;
  };

  const handleMouseOver = () => {
    if (showEmoji) return;
    setEmoji(generateRandomEmoji());
  };

  const handleEmojiPickerClick = (e: React.MouseEvent) => {
    setShowEmoji((p) => !p);
  };

  const handleEmojipickerWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleCloseClick = () => {
    setIsReplyMessage(null);
  };
  return (
    <>
      <SendBarFrameDiv
        styleProps={sendbarStyle}
        showSearchBox={showSearchBox}
        showNewMessageBox={showNewMessageBox}
      >
        <NewMessageModal chatDataMapRef={chatDataMapRef} />
        {isReplyMessage !== null && (
          <>
            <ReplyInfoDiv>
              <div className="reply-info">
                <div className="reply-message">{isReplyMessage.content}</div>
                <div className="reply-user">
                  <ReplyIcon />
                  {Number(localStorage.getItem("memberId")) ===
                  isReplyMessage.memberId
                    ? "나"
                    : `${isReplyMessage.username}님`}
                  에게 답장
                </div>
              </div>
              <span onClick={handleCloseClick} className="close-icon">
                <CloseIcon />
              </span>
            </ReplyInfoDiv>
            <DividerLine />
          </>
        )}
        <SendBarDiv disabled={text.trim().length === 0} rowNum={rowNum}>
          <textarea
            key={1}
            ref={textareaRef}
            rows={rowNum}
            value={text}
            onInput={handleOnInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          ></textarea>
          <SendbarButton
            ref={emojiRef as React.RefObject<HTMLDivElement>}
            buttontype="emoji"
            rowNum={rowNum}
            onMouseEnter={handleMouseOver}
            onClick={handleEmojiPickerClick}
            showEmoji={showEmoji}
          >
            <div className="emoji-icon">{emoji}</div>
            <EmojipickerWrapper
              onClick={handleEmojipickerWrapperClick}
              rowNum={rowNum}
            >
              {showEmoji && (
                <EmojiPicker
                  height={420}
                  onEmojiClick={handleEmojiClick}
                  autoFocusSearch={false}
                  suggestedEmojisMode={SuggestionMode.RECENT}
                  lazyLoadEmojis={true}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              )}
            </EmojipickerWrapper>
          </SendbarButton>
          <SendbarButton
            buttontype="send"
            rowNum={rowNum}
            onClick={(e) => clickHandler(e)}
            disabled={text.trim().length === 0}
          >
            <SendIcon className="send-icon" />
          </SendbarButton>
        </SendBarDiv>
      </SendBarFrameDiv>
    </>
  );
};
export default Sendbar;
