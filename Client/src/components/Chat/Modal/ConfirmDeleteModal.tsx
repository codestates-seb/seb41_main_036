import { useRecoilState, useSetRecoilState } from "recoil";
import {
  deleteItemsState,
  isDeleteModeState,
  showConfirmModalState,
} from "../../../recoil/ChatState";
import { DeleteModalWrapper, DeleteModal } from "./ModalStyled";
import { HiExclamationTriangle as ExclamaionIcon } from "react-icons/hi2";

interface ConfirmDeleteModalProps {
  deleteMessage: (message: Set<number> | number[]) => void;
}
const ConfirmDeleteModal = ({ deleteMessage }: ConfirmDeleteModalProps) => {
  const setShowConfirmModal = useSetRecoilState(showConfirmModalState);
  const [isDeleteMode, setIsDeleteMode] = useRecoilState(isDeleteModeState);
  const [deleteItems, setDeleteItems] = useRecoilState(deleteItemsState);
  const handleCancelClick = () => {
    if (!isDeleteMode) setDeleteItems(new Set());
    setShowConfirmModal(false);
  };
  const handleConfirmClick = () => {
    deleteMessage(deleteItems);
    setDeleteItems(new Set());
    setShowConfirmModal(false);
    setIsDeleteMode(false);
  };
  return (
    <DeleteModalWrapper>
      <DeleteModal>
        <div className="modal-subject">
          <ExclamaionIcon />
          &nbsp;&nbsp;메시지 삭제
        </div>
        <div className="modal-content">
          전체 대화방에서 메시지가 삭제됩니다.
        </div>
        <div className="modal-buttonBox">
          <button className="cancel-button" onClick={handleCancelClick}>
            취소
          </button>
          <button className="confirm-button" onClick={handleConfirmClick}>
            삭제
          </button>
        </div>
      </DeleteModal>
    </DeleteModalWrapper>
  );
};
export default ConfirmDeleteModal;
