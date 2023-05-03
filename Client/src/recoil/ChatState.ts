import { atom } from "recoil";
import {
  AlertInfo,
  ChatPanelStatusType,
  chatDatatype,
} from "../components/Chat/Chat";
export const chatDataState = atom<chatDatatype[]>({
  key: "chatDataState",
  default: [],
});
//채팅 데이터
export const isDeleteModeState = atom<boolean>({
  key: "isDeleteModeState",
  default: false,
});
//삭제모드
export const showConfirmModalState = atom<boolean>({
  key: "showConfirmModalState",
  default: false,
});
//취소 승인 모달-완료
export const showReportModalState = atom<boolean>({
  key: "showReportModalState",
  default: false,
});
//신고 모달
export const deleteItemsState = atom<Set<number>>({
  key: "deleteItemsState",
  default: new Set(),
});
//삭제할 메시지

export const isReplyMessageState = atom<chatDatatype | null>({
  key: "isReplyMessageState",
  default: null,
});
//답글 달 메시지 저장

export const reportChatDataState = atom<chatDatatype | null>({
  key: "reportChatDataState",
  default: null,
});
//신고 메시지 저장
export const onlineNumberOfUserState = atom<number>({
  key: "onlineNumberOfUserState",
  default: 0,
});
//채팅 참가 인원

export const AlertQueueState = atom<Array<AlertInfo>>({
  key: "AlertQueueState",
  default: [],
});
//알림 메시지 큐

export const ChatStatus = atom<ChatPanelStatusType>({
  key: "ChatStatus",
  default: "EXITED",
});
//채팅 상태

export const ShowSearchBox = atom<boolean>({
  key: "ShowSearchBox",
  default: false,
});
//검색 박스
export const ScrollTargetChatIdState = atom<number | null>({
  key: "ScrollTargetChatIdState",
  default: null,
});
//클릭한 검색 메시지
export const NewMessageArrivedState = atom<{
  message: chatDatatype;
  count: number;
} | null>({
  key: "NewMessageArrivedState",
  default: null,
});
//새로 도착한 메시지

export const ShowNewMesssageBoxState = atom<boolean>({
  key: "ShowNewMesssageBoxState",
  default: false,
});
//새 메시지 알림 모달

export const CountNewMessageState = atom<number>({
  key: "CountNewMessageState",
  default: 0,
});
//최소화 상태에서 새 메시지 개수
