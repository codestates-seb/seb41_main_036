import { chatDatatype } from "../Chat";
import {
  ChatContentBottomWrapper,
  ChatContentDiv,
  ChatContentMenu,
  ChatContentMenuItem,
  ChatContentWrapper,
  ChatMessageDiv,
  ChatProfileWrapper,
  ReactionTagSpan,
  UsernameDiv,
} from "./ChatBoxStyled";
import { DividerLine } from "../ChatStyled";
import { FaHeart as HeartIcon } from "react-icons/fa";
import { MdReport as ReportIcon } from "react-icons/md";
import { MdSubdirectoryArrowRight as ReplyIcon } from "react-icons/md";
import ReplyMessageBox from "./ReplyChatBox";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isDeleteModeState,
  isReplyMessageState,
  reportChatDataState,
  showReportModalState,
} from "../../../recoil/ChatState";

interface MyChatBoxProps {
  chatData: chatDatatype;
  timeStampFlagForTime: boolean;
  timeStampFlagForRadius: boolean;
  memberIdFlag: boolean;
  lastChatMessageRef:
    | ((node: HTMLDivElement) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
  searchTargetAnimation: boolean;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}

const OtherChatBox = ({
  chatData,
  timeStampFlagForTime,
  timeStampFlagForRadius,
  memberIdFlag,
  lastChatMessageRef,
  searchTargetAnimation,
  chatDataMapRef,
}: MyChatBoxProps) => {
  const isDeleteMode = useRecoilValue(isDeleteModeState);
  const setShowReportModal = useSetRecoilState(showReportModalState);
  const setIsReplyMessage = useSetRecoilState(isReplyMessageState);
  const setReportChatData = useSetRecoilState(reportChatDataState);
  const handleReplyClick = () => {
    setIsReplyMessage(chatData);
  };
  const handleHeartClick = () => {
    axios
      .post(
        `https://pikcha36.o-r.kr:8080/app/likes/${chatData.chatId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((res) => console.log(res.data, "좋아요 반영"))
      .catch((err) => console.log(err));
  };
  const handleReportClick = (isReported: boolean) => {
    if (isReported) return;
    setReportChatData(chatData);
    setShowReportModal(true);
  };
  return (
    <ChatMessageDiv
      key={chatData.createdAt}
      type="LEFT"
      ref={lastChatMessageRef}
      isFirst={timeStampFlagForRadius && memberIdFlag}
      searchTargetAnimation={searchTargetAnimation}
    >
      <ChatProfileWrapper showProfile={memberIdFlag}>
        {memberIdFlag && <img src={chatData.picture} alt="chat profile" />}
      </ChatProfileWrapper>
      <ChatContentWrapper direction="LEFT">
        {memberIdFlag && <UsernameDiv>{chatData.username}</UsernameDiv>}
        <ChatContentBottomWrapper
          messageType={chatData.type}
          isDeleteMode={isDeleteMode}
          isOthers={true}
        >
          <ChatContentDiv
            type={timeStampFlagForRadius ? "first" : "notFirst"}
            messageType={chatData.type}
          >
            {chatData.type === "REPLY" && (
              <>
                <ReplyMessageBox
                  chatData={chatData}
                  textColor="var(--black-800)"
                  chatDataMapRef={chatDataMapRef}
                />
                <DividerLine margin="3px" color="var(--black-275)" />
              </>
            )}
            {chatData.type === "DELETE"
              ? "삭제된 메시지입니다"
              : chatData.type === "REPORT"
              ? "3회 이상 신고된 메시지입니다"
              : chatData.content}
            {chatData.type !== "DELETE" && chatData.type !== "REPORT" && (
              <ChatContentMenu type="LEFT" reportDisabled={chatData.isReported}>
                <ChatContentMenuItem
                  className="report-box"
                  onClick={() => handleReportClick(chatData.isReported)}
                  reportDisabled={chatData.isReported}
                >
                  <ReportIcon className="report-icon" />
                </ChatContentMenuItem>
                <ChatContentMenuItem
                  className="reply-box"
                  onClick={handleReplyClick}
                >
                  <ReplyIcon className="reply-icon" />
                </ChatContentMenuItem>
                <ChatContentMenuItem
                  className="heart-box"
                  onClick={handleHeartClick}
                >
                  <HeartIcon className="heart-icon" />
                </ChatContentMenuItem>
              </ChatContentMenu>
            )}
          </ChatContentDiv>

          {timeStampFlagForTime && (
            <span className="time-tag">
              {new Date(chatData.createdAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </ChatContentBottomWrapper>
        {chatData.type !== "DELETE" && !!chatData.likes && (
          <ReactionTagSpan
            isVoted={chatData.isVoted}
            onClick={handleHeartClick}
            isOthers={true}
          >
            <HeartIcon />
            {chatData.likes}
          </ReactionTagSpan>
        )}
      </ChatContentWrapper>
    </ChatMessageDiv>
  );
};
export default OtherChatBox;
