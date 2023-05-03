import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import useWebsocket from "../../hooks/useWebsocket";
import { ChatBoxDiv, ChatBoxWrapper } from "./ChatStyled";
import axios from "axios";
import Sendbar from "./Send/Sendbar";
import SendChatBox from "./ChatBox/SendChatBox";
import ChatBox from "./ChatBox/ChatBox";
import DeleteAllConfirm from "./Modal/DeleteAllConfirm";
import ConfirmDeleteModal from "./Modal/ConfirmDeleteModal";
import ReportModal from "./Modal/ReportModal";
import ChatHeader from "./ChatHeader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ShowSearchBox,
  chatDataState,
  isDeleteModeState,
  showConfirmModalState,
  showReportModalState,
} from "../../recoil/ChatState";
import NotificationModal from "./Modal/NotificationModal";
import { LoginState } from "../../recoil/state";

import SearchBox from "./Search/SearchBox";
import { ChatPanelStatusType } from "./Chat";

const URL = "https://pikcha36.o-r.kr:8080/stomp-websocket-sockjs";
const TOPIC = "/topic/messages"; //topic주소

interface ChatPanelProps {
  chatStatus: ChatPanelStatusType;
}

export const scrollFlagRef: { current: boolean | null } = { current: null }; //constant

const ChatPanel = ({ chatStatus }: ChatPanelProps) => {
  const chatDataMapRef = useRef<Map<
    number,
    { node: HTMLElement; idx: number }
  > | null>(null);
  //{node:,idx:}
  const {
    clientRef,
    sendMessage,
    chatBuffer,
    setChatBuffer,
    deleteMessage,
    replyMessage,
    lastChatIdRef,
  } = useWebsocket(URL, TOPIC, chatDataMapRef);

  const isDeleteMode = useRecoilValue(isDeleteModeState); //삭제모드
  const showConfirmModal = useRecoilValue(showConfirmModalState); //삭제승인 모달
  const showReportModal = useRecoilValue(showReportModalState); //신고 모달
  const setChatData = useSetRecoilState(chatDataState);
  const isLogin = useRecoilValue(LoginState);
  const sendChatBoxRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const showSearchBox = useRecoilValue(ShowSearchBox);
  //enter가 join보다 먼저 응답=> enter응답 받은 후 activate
  useEffect(() => {
    if (!isLogin) return;
    axios
      .get(`https://pikcha36.o-r.kr:8080/app/enter`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((res) => {
        scrollFlagRef.current = false;
        clientRef.current?.activate();
        flushSync(() => {
          setChatData(res.data.data);
        });
        lastChatIdRef.current = res.data.data[0].chatId;
        (chatBoxRef.current as HTMLDivElement).scrollTop = (
          chatBoxRef.current as HTMLDivElement
        ).scrollHeight;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const scrollIntoBottom = () => {
    scrollFlagRef.current = false;
    sendChatBoxRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const options = {
    root: chatBoxRef.current,
    rootMargin: "100px 0px",
    threshold: 0,
  };

  const topChatMessage = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (lastChatIdRef.current === 1) {
          return;
        }
        if (entries[0].isIntersecting) {
          axios
            .get(
              `https://pikcha36.o-r.kr:8080/app/load/${lastChatIdRef.current}`,
              {
                headers: {
                  Authorization: localStorage.getItem("Authorization"),
                },
              }
            )
            .then((res) => {
              const scrollTemp =
                (chatBoxRef.current as HTMLDivElement).scrollHeight -
                (chatBoxRef.current as HTMLDivElement).scrollTop;
              flushSync(() => {
                setChatData((p) => [...res.data.data, ...p]);
              });
              scrollFlagRef.current = false;
              (chatBoxRef.current as HTMLDivElement).scrollTop =
                (chatBoxRef.current as HTMLDivElement).scrollHeight -
                scrollTemp;

              lastChatIdRef.current = res.data.data[0].chatId;
            })
            .catch((err) => console.error(err));
        }
      }, options);

      observerRef.current.observe(node);
    },
    [options, chatBoxRef.current]
  );
  return (
    <ChatBoxDiv chatStatus={chatStatus}>
      {showConfirmModal && <ConfirmDeleteModal deleteMessage={deleteMessage} />}
      {showReportModal && <ReportModal setChatData={setChatData} />}
      <NotificationModal />
      {showSearchBox && (
        <SearchBox
          lastChatIdRef={lastChatIdRef}
          chatDataMapRef={chatDataMapRef}
        />
      )}
      <ChatHeader />
      <ChatBoxWrapper ref={chatBoxRef}>
        <ChatBox
          chatBoxRef={chatBoxRef}
          topChatMessage={topChatMessage}
          deleteMessage={deleteMessage}
          chatDataMapRef={chatDataMapRef}
        />
        {!!chatBuffer.length && (
          <SendChatBox
            chatBuffer={chatBuffer}
            setChatBuffer={setChatBuffer}
            sendChatBoxRef={sendChatBoxRef}
            sendMessage={sendMessage}
            replyMessage={replyMessage}
          />
        )}
      </ChatBoxWrapper>
      {isDeleteMode ? (
        <DeleteAllConfirm />
      ) : (
        <Sendbar
          sendMessage={sendMessage}
          replyMessage={replyMessage}
          scrollIntoBottom={scrollIntoBottom}
          chatDataMapRef={chatDataMapRef}
        />
      )}
    </ChatBoxDiv>
  );
};
export default ChatPanel;
