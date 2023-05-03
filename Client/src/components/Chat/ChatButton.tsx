import { useRecoilState, useRecoilValue } from "recoil";
import { ChatStatus, NewMessageArrivedState } from "../../recoil/ChatState";
import { ChatExpandableButton } from "./ChatStyled";
import { BsFillChatLeftDotsFill as ChatIcon } from "react-icons/bs";
import { LoginState } from "../../recoil/state";
import Modal from "../Modal";
import { isModalVisible } from "../../recoil/setOverlay";

const ChatButton = () => {
  const isLogin = useRecoilValue(LoginState);
  const [chatStatus, setChatStatus] = useRecoilState(ChatStatus);
  const [isModal, setIsModal] = useRecoilState(isModalVisible);
  const [newMessageArrived] = useRecoilState(NewMessageArrivedState);

  const handleButtonClick = () => {
    if (!isLogin) {
      setIsModal(true);
      return;
    }
    setChatStatus("JOINED");
  };

  return (
    <>
      {isModal && <Modal />}
      <ChatExpandableButton
        onClick={handleButtonClick}
        connected={false}
        chatStatus={chatStatus}
      >
        <ChatIcon />
        {!!newMessageArrived?.count && (
          <span>
            {newMessageArrived.count > 99 ? "99+" : newMessageArrived.count}
          </span>
        )}
      </ChatExpandableButton>
    </>
  );
};
export default ChatButton;
