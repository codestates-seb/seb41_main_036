import {
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import useWebsocket from "../../hooks/useWebsocket";
const URL = "https://pikcha36.o-r.kr:8080/stomp-websocket-sockjs"; //wss
const TOPIC = "/topic/messages";
const Chat = () => {
  const { clientRef, chatData, setChatData, sendMessage } = useWebsocket(
    URL,
    TOPIC
  );
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  useEffect(() => {
    console.log(chatData, "서버응답 body");
  }, [chatData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText((e.target as HTMLInputElement).value);
  };

  const clickHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "Enter") {
      sendMessage(text);
      setText("");
    }
  };
  return (
    <>
      <div>채팅 테스트</div>
      {chatData.map((el, i) => (
        <div key={i}> {el.content} </div>
      ))}
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      ></input>
      <button onClick={(e) => clickHandler(e)}>전송</button>
    </>
  );
};
export default Chat;
