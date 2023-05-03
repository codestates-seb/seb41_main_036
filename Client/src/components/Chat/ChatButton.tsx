import { useRecoilState, useRecoilValue } from "recoil";
import { ChatStatus, NewMessageArrivedState } from "../../recoil/ChatState";
import { ChatExpandableButton } from "./ChatStyled";
import { BsFillChatLeftDotsFill as ChatIcon } from "react-icons/bs";
import { LoginState } from "../../recoil/state";
import { useState } from "react";
import Modal from "../Modal";

const ChatButton = () => {
  const isLogin = useRecoilValue(LoginState);
  const [chatStatus, setChatStatus] = useRecoilState(ChatStatus);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMessageArrived] = useRecoilState(NewMessageArrivedState);

  const handleButtonClick = () => {
    if (!isLogin) {
      setIsModalVisible(true);
      return;
    }
    setChatStatus("JOINED");
  };

  return (
    <>
      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}
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
