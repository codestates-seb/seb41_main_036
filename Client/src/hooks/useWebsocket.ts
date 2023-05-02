import { useState, useRef, useEffect } from "react";
import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  AlertQueueState,
  NewMessageArrivedState,
  chatDataState,
  onlineNumberOfUserState,
} from "../recoil/ChatState";
import { LoginState } from "../recoil/state";
import { chatDatatype } from "../components/Chat/Chat";

function useWebsocket(
  url: string,
  topic: string = "",
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>
) {
  const setChatData = useSetRecoilState(chatDataState);
  const [chatBuffer, setChatBuffer] = useState<Array<chatDatatype>>([]);
  const clientRef = useRef<Stomp.Client | null>(null);
  const subscriptionRef = useRef<Stomp.StompSubscription | null>(null);
  const lastChatIdRef = useRef<number | undefined>(undefined);
  const setOnlineNumOfUsers = useSetRecoilState(onlineNumberOfUserState);
  const setAlertQueue = useSetRecoilState(AlertQueueState);
  const isLogin = useRecoilValue(LoginState);
  const setNewMessageArrived = useSetRecoilState(NewMessageArrivedState);
  /*likes-,delete-,report-*/
  useEffect(() => {
    clientRef.current = new Stomp.Client(initialConnectSet);
    return () => {
      setChatData([]);
      if (subscriptionRef.current !== null) {
        subscriptionRef.current.unsubscribe();
      }
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []); //연결, 해제

  useEffect(() => {
    if (!isLogin && clientRef.current) {
      clientRef.current.deactivate();
    } //로그인 상태가 아니면 소켓 연결 종료
  });

  const subscribeCallback = (message: Stomp.IMessage) => {
    const parsedMessage = JSON.parse(message.body);
    //메시지 삭제인지 확인
    switch (parsedMessage.type) {
      case "LIKES": {
        if (!chatDataMapRef.current?.has(parsedMessage.chatId)) return; //없으면 처리X
        const targetIdx = chatDataMapRef.current?.get(
          parsedMessage.chatId
        )?.idx;
        if (
          parsedMessage.memberId === Number(localStorage.getItem("memberId"))
        ) {
          setChatData((p) => {
            return [
              ...p.slice(0, targetIdx),
              {
                ...p[targetIdx as number],
                likes: parsedMessage.likes,
                isVoted: parsedMessage.isVoted,
              },
              ...p.slice((targetIdx as number) + 1),
            ];
          });
        } else {
          setChatData((p) => {
            return [
              ...p.slice(0, targetIdx),
              { ...p[targetIdx as number], likes: parsedMessage.likes },
              ...p.slice((targetIdx as number) + 1),
            ];
          });
        }
        break;
      }
      case "LEAVE":
      case "JOIN": {
        setOnlineNumOfUsers(parsedMessage.numberOfUsers);
        const payload = {
          chatId: -1,
          content: "",
          createdAt: parsedMessage.createdAt,
          memberId: Number(parsedMessage.memberId),
          picture: "",
          type: parsedMessage.type,
          username: parsedMessage.username,
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
        setChatData((p) => [
          ...p,
          { ...payload, chatId: p[p.length - 1].chatId },
        ]);
        break;
      }
      case "DELETE": {
        if (
          (parsedMessage.ids as Array<number>).find((el) =>
            chatDataMapRef.current?.has(el)
          ) === -1
        )
          return;
        //삭제하려는 메시지를 가지고 있지 않으면 아무것도 안함
        setChatData((p) => {
          const newChatData = [...p];
          (parsedMessage.ids as Array<number>).forEach((el) => {
            const targetIdx = chatDataMapRef.current?.get(el)?.idx;
            if (!targetIdx) return p;
            newChatData[targetIdx] = {
              ...p[targetIdx],
              content: "",
              type: "DELETE",
              likes: 0,
            };
          });
          return newChatData;
        });
        break;
      }
      case "CHAT": {
        if (
          parsedMessage.memberId === Number(localStorage.getItem("memberId"))
        ) {
          setChatBuffer((p) =>
            p.length
              ? p.filter((el) => el.verifyKey !== parsedMessage.verifyKey)
              : p
          );
        } else {
          setNewMessageArrived((p) => ({
            message: parsedMessage,
            count: p ? p.count + 1 : 1,
          }));
        }
        setChatData((p) => [...p, parsedMessage]);
        break;
      }
      case "REPLY": {
        if (
          parsedMessage.memberId === Number(localStorage.getItem("memberId"))
        ) {
          setChatBuffer((p) =>
            p.length
              ? p.filter((el) => el.verifyKey !== parsedMessage.verifyKey)
              : p
          );
        } else {
          setNewMessageArrived((p) => ({
            message: parsedMessage,
            count: p ? p.count + 1 : 1,
          }));
        }
        setChatData((p) => [...p, parsedMessage]);
        break;
      }
      case "REPORT": {
        if (!chatDataMapRef.current?.has(parsedMessage.chatId)) return;
        setChatData((p) => {
          const newChatData = [...p];
          const targetIdx = chatDataMapRef.current?.get(
            parsedMessage.chatId
          )?.idx;
          if (!targetIdx) return p;
          newChatData[targetIdx] = {
            ...newChatData[targetIdx],
            content: "",
            type: "REPORT",
            isVoted: false,
            likes: 0,
          };
          return newChatData;
        });
        break;
      }
    }
  }; //구독후 메시지 도착 시: 메시지 출력

  const connectCallback = (frame: Stomp.Frame) => {
    if (!clientRef.current) {
      return;
    }
    subscriptionRef.current = clientRef.current.subscribe(
      topic,
      subscribeCallback
    );

    (clientRef.current as Stomp.Client).publish({
      destination: "/app/chat",
      body: JSON.stringify({
        type: "JOIN",
        memberId: localStorage.getItem("memberId"),
      }),
    });
  };
  //연결완료 시 : subscribe-client에서 서버에게....

  const errorCallback = (frame: Stomp.Frame) => {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  }; //오류 발생 : console.log

  const disconnectCallback = () => {
    console.log("disconnected");
  }; //연결 해제 : console.log

  const sendMessage = (text: string) => {
    console.log(clientRef.current, "메시지 전송-소켓 연결 확인");

    const payload = {
      content: text,
      verifyKey: uuidv4(),
      type: "CHAT",
      memberId: localStorage.getItem("memberId"),
    };
    if (!clientRef.current?.connected) return;
    setChatBuffer((p) => [
      ...p,
      {
        chatId: -1,
        content: text,
        createdAt: new Date().toISOString(),
        memberId: Number(localStorage.getItem("memberId") as string),
        picture: undefined,
        type: "CHAT",
        username: "",
        verifyKey: payload.verifyKey,
        targetContent: null,
        targetChatId: null,
        targetMemberId: null,
        targetPicture: null,
        targetUsername: null,
        isVoted: false,
        likes: 0,
        status: "SENDING",
        isReported: false,
      },
    ]);

    (clientRef.current as Stomp.Client).publish({
      destination: "/app/chat",
      body: JSON.stringify(payload),
    });

    (function () {
      let start = new Date().getTime();
      let i = 1;
      let callback = function () {
        let ts = new Date().getTime();
        if (ts - 10000 > start) {
          setChatBuffer((p) => {
            const failedIndex = p.findIndex(
              (el) => el.verifyKey === payload.verifyKey
            );
            return failedIndex === -1
              ? p
              : [
                  ...p.slice(0, failedIndex),
                  { ...p[failedIndex], status: "FAIL" },
                  ...p.slice(failedIndex + 1),
                ];
          });
        } else {
          requestAnimationFrame(callback);
        }
      };
      requestAnimationFrame(callback);
    })();
    //10초후 전송실패
  };

  const deleteMessage = (message: Set<number> | number[]) => {
    if (!clientRef.current?.connected) return;

    const payload = {
      ids: [...message],
      memberId: localStorage.getItem("memberId"),
    };
    console.log(payload, "payload");
    axios
      .delete("https://pikcha36.o-r.kr:8080/app/delete", {
        data: payload,
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlertQueue((p) => [
          {
            id: Math.random(),
            message: "DELETE_ERROR",
          },
          ...p,
        ]);
      });
  };

  const replyMessage = (text: string, targetInfo: chatDatatype) => {
    const payload = {
      content: text,
      verifyKey: uuidv4(),
      type: "REPLY",
      memberId: localStorage.getItem("memberId"),
      targetId: targetInfo.chatId,
    };
    if (!clientRef.current?.connected) return;
    setChatBuffer((p) => [
      ...p,
      {
        chatId: -1,
        content: text,
        createdAt: new Date().toISOString(),
        memberId: Number(localStorage.getItem("memberId")),
        picture: "",
        type: "CHAT",
        username: "",
        verifyKey: payload.verifyKey,
        targetContent: targetInfo.content as string,
        targetChatId: targetInfo.chatId as number,
        targetPicture: targetInfo.picture as string,
        targetUsername: targetInfo.username as string,
        targetMemberId: targetInfo.memberId as number,
        isVoted: false,
        likes: 0,
        status: "SENDING",
        isReported: false,
      },
    ]);

    clientRef.current.publish({
      destination: "/app/reply",
      body: JSON.stringify(payload),
    });
  };

  const initialConnectSet: Stomp.StompConfig = {
    webSocketFactory: () => new SockJS(url),
    reconnectDelay: 10000,
    debug: (str) => {
      console.log(str);
    },
    connectHeaders: {
      Authorization: localStorage.getItem("Authorization") as string,
    },
    onConnect: connectCallback,
    onStompError: errorCallback,
    onDisconnect: disconnectCallback,
    onWebSocketError: () => {
      /*웹소켓 연결 에러 처리*/
    },

    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  };
  return {
    clientRef,
    sendMessage,
    chatBuffer,
    setChatBuffer,
    deleteMessage,
    replyMessage,
    lastChatIdRef,
  };
}
export default useWebsocket;
