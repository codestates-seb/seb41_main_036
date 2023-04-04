import { useState, useRef, useEffect } from "react";
import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { v4 as uuidv4 } from "uuid";

type chatType = {
  CHAT: string;
  JOIN: string;
  LEAVE: string;
};
interface chatDatatype {
  picture?: string;
  username?: string;
  created_At?: number;
  messageId?: number;
  content: string;
  verifyKey?: string;
  type?: chatType;
  sender?: string;
}
//sender는 임시
function useWebsocket(url: string, topic: string = "") {
  const [chatData, setChatData] = useState<Array<chatDatatype>>([]);
  const clientRef = useRef<Stomp.Client | null>(null);
  const subscriptionRef = useRef<Stomp.StompSubscription | null>(null);

  useEffect(() => {
    clientRef.current = new Stomp.Client(initialConnectSet);
    clientRef.current.activate();
    console.log("2번위치");
    return () => {
      const cleanUp = () => {
        if (subscriptionRef.current !== null) {
          subscriptionRef.current.unsubscribe();
          console.log("구독취소");
        }
        if (clientRef.current) {
          clientRef.current.deactivate();
        }
      };
      cleanUp();
      console.log("여기!!!");
    };
  }, []); //연결, 해제

  const subscribeCallback = (message: Stomp.IMessage) => {
    console.log("메시지 응답");
    const parsedMessage = JSON.parse(message.body);
    setChatData((p) => [...p, parsedMessage]);
    console.log(parsedMessage, "응답 메시지");
  }; //구독후 메시지 도착 시: 메시지 출력

  const connectCallback = (frame: Stomp.Frame) => {
    if (!clientRef.current) {
      console.log("소켓 연결 실패");
      return;
    }
    subscriptionRef.current = clientRef.current.subscribe(
      topic,
      subscribeCallback
    );
    console.log("구독완료");
  };
  //연결완료 시 : subscribe

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
      verifykey: uuidv4(),
      type: "CHAT",
    };

    if (!clientRef.current?.connected) return;
    clientRef.current.publish({
      destination: "/app/chat",
      body: JSON.stringify(payload),
    });
  };
  //"/app/chat"

  const initialConnectSet: Stomp.StompConfig = {
    webSocketFactory: () => new SockJS(url),
    reconnectDelay: 5000,
    debug: (str) => {
      console.log(str);
    },
    onConnect: connectCallback,
    onStompError: errorCallback,
    onDisconnect: disconnectCallback,
    onWebSocketError: () => {
      /*웹소켓 연결 에러 처리*/
    },

    heartbeatIncoming: 3000,
    heartbeatOutgoing: 3000,
  };
  return { clientRef, chatData, setChatData, sendMessage };
}
export default useWebsocket;

/* 
ws연결된 상태로 client객체 반환
연결하려면 activate,
연결을 끊고 싶다면 deactivate,

// server 모를 때
// 기억 id2 -> 응답 x null
// 전송 미처리 

// Response 
받은 메시지(server)
1. 프로필 사진 : picture
2. 닉네임 : username
3.보낸시간 : created_At
4.메시지 id : 저장
5.메시지 : content
6.메시지 id2 : verifyKey
7.type (CHAT, JOIN, LEAVE)

보낸 메시지(client)
// Header 토큰 o
1. content
2. verifyKey
3. type (CHAT, JOIN, LEAVE)

보낸 메시지 로컬 처리
1. 현재시간
2. 보낸 메시지
3. 서버에서 내 메시지가 도착할 때까지 로딩중 아이콘

--> 서버에서 내 메시지가 도착하면 해당 정보로 업데이트

메시지 타입
1.CHAT
2.JOIN
3.LEAVE

*/
