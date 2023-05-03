import { flushSync } from "react-dom";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ScrollTargetChatIdState,
  chatDataState,
} from "../../../recoil/ChatState";

import { scrollFlagRef } from "../ChatPanel";
import { SearchedMessageContent, SearchedMessageWrapper } from "./SearchStyled";
import { chatDatatype, searchedMessageType } from "../Chat";

export const emptyMessage: chatDatatype = {
  chatId: -1,
  content: "",
  createdAt: "",
  memberId: -1,
  picture: undefined,
  type: "CHAT",
  username: "",
  verifyKey: "",
  targetContent: null,
  targetChatId: null,
  targetMemberId: null,
  targetPicture: null,
  targetUsername: null,
  isVoted: false,
  likes: 0,
  isReported: false,
};

interface SearcheMessageProps {
  messageData: searchedMessageType;
  lastChatIdRef: React.MutableRefObject<number | undefined>;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}

const SearchedMessage = ({
  messageData,
  lastChatIdRef,
  chatDataMapRef,
}: SearcheMessageProps) => {
  const [chatData, setChatData] = useRecoilState(chatDataState);
  const setScrollTargetChatId = useSetRecoilState(ScrollTargetChatIdState);
  const handleSearchedMessageClick = (chatId: number) => {
    scrollFlagRef.current = false;
    //1.chatData에 존재하는 경우
    if (chatDataMapRef.current?.has(chatId)) {
      chatDataMapRef.current?.get(chatId)?.node.scrollIntoView();
      setScrollTargetChatId(chatId);
      return;
    }
    //2.chatData에 존재하지 않는 경우
    const searchResult = chatIdSearch(chatData, chatId);

    const [beforeChatIdx, nextChatIdx] =
      searchResult.targetIdIndex as Array<number>;
    axios
      .get(
        `https://pikcha36.o-r.kr:8080/app/load?gte=${chatId}&lte=${chatData[nextChatIdx].chatId}`,
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((res) => {
        const loadMoreMessage: chatDatatype = {
          ...emptyMessage,
          type: "LOADMORE",
        };
        /*
          데이터 추가 데이터
          추가 안하는 경우: 이미 load more버튼이 양옆으로 존재할때
          */
        let newChatData = [...res.data.data.slice(1)];
        if (chatData[nextChatIdx].type !== "LOADMORE" && res.data.hasNext) {
          newChatData = [
            ...newChatData,
            {
              ...loadMoreMessage,
              chatId: newChatData[newChatData.length - 1].chatId,
            },
          ];
        }
        if (
          beforeChatIdx !== -1 &&
          chatData[beforeChatIdx].type !== "LOADMORE" &&
          res.data.data[0].chatId !== chatData[beforeChatIdx].chatId
        ) {
          newChatData = [
            { ...loadMoreMessage, chatId: newChatData[0].chatId },
            ...newChatData,
          ];
        }
        const updateChatData = [
          ...chatData.slice(0, beforeChatIdx + 1),
          ...newChatData,
          ...chatData.slice(beforeChatIdx + 1),
        ];
        flushSync(() => {
          setChatData(updateChatData);
        });
        lastChatIdRef.current = updateChatData[0].chatId;
        chatDataMapRef.current?.get(chatId)?.node.scrollIntoView();
        setScrollTargetChatId(chatId);
        /*chatId제거 타이밍? */
      })
      .catch(console.log);
  };
  return (
    <SearchedMessageWrapper
      onClick={() => handleSearchedMessageClick(messageData.chatId)}
    >
      <img src={messageData.picture} alt="profile" />
      <SearchedMessageContent>
        <div className="username">{messageData.username}</div>
        <div className="content">{messageData.content}</div>
      </SearchedMessageContent>
      <div className="createdAt">
        <span className="createdAt">
          {new Intl.DateTimeFormat("ko-KR")
            .format(new Date(messageData.createdAt as string))
            .slice(0, -1)}
        </span>
      </div>
    </SearchedMessageWrapper>
  );
};
export default SearchedMessage;

/* 일치하는 chatId가 있으면 found:true 반환 chatId에 해당하는 위치의 인덱스 반환
일치하는 chatId가 없으면 found:false && chatId에 해당하는 위치의 앞뒤 인덱스 반환
*/

function chatIdSearch(chatMessage: chatDatatype[], targetId: number) {
  let first = 0;
  let last = chatMessage.length - 1;
  let mid;
  while (first <= last) {
    mid = Math.floor((first + last) / 2);
    if (chatMessage[mid].chatId === targetId)
      return { found: true, targetIdIndex: mid };
    else if (chatMessage[mid].chatId < targetId) first = mid + 1;
    else last = mid - 1;
  }
  return {
    found: false,
    targetIdIndex: [Math.min(first, last), Math.max(first, last)],
  };
}
