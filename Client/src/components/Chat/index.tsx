import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";
import { useRecoilValue } from "recoil";
import { ChatStatus } from "../../recoil/ChatState";

const Chat = () => {
  const chatStatus = useRecoilValue(ChatStatus);

  return (
    <>
      {(chatStatus === "EXITED" || chatStatus === "MINIMIZED") && (
        <ChatButton />
      )}
      {chatStatus !== "EXITED" && <ChatPanel chatStatus={chatStatus} />}
    </>
  );
};
export default Chat;
/*minimized에서는 새메시지 도착하면 버튼 변경 */
