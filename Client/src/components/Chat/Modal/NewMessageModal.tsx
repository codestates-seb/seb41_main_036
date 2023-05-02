import { useRecoilValue } from "recoil";

import {
  NewMessageArrivedState,
  ShowNewMesssageBoxState,
} from "../../../recoil/ChatState";
import { scrollFlagRef } from "../ChatPanel";
import { NewMessageBoxWrapper } from "./ModalStyled";
interface NewMessageBoxProps {
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const NewMessageModal = ({ chatDataMapRef }: NewMessageBoxProps) => {
  const newMessageArrived = useRecoilValue(NewMessageArrivedState);
  const showNewMessageBox = useRecoilValue(ShowNewMesssageBoxState);

  const handleClick = () => {
    if (newMessageArrived) {
      scrollFlagRef.current = false;
      chatDataMapRef.current
        ?.get(newMessageArrived.message.chatId)
        ?.node.scrollIntoView();
    }
  };
  return (
    <NewMessageBoxWrapper
      showNewMessageBox={showNewMessageBox}
      onClick={handleClick}
    >
      <img src={newMessageArrived?.message.picture} alt="user profile" />
      <div className="message-content">
        <span className="username">{newMessageArrived?.message.username}</span>
        <span className="message">{newMessageArrived?.message.content}</span>
      </div>
    </NewMessageBoxWrapper>
  );
};
export default NewMessageModal;
