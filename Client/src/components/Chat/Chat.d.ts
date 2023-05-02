export type MessageType =
  | "CHAT"
  | "JOIN"
  | "LEAVE"
  | "DELETE"
  | "REPORT"
  | "REPLY"
  | "LOADMORE";

export type ChatPanelStatusType = "EXITED" | "MINIMIZED" | "JOINED";

export type AlertMessageType =
  | "REPORT_COMPLETE"
  | "CHECK_NETWORK"
  | "DELETE_ERROR";

export type sendbarStyleType = {
  padding: number;
  lineheight: number;
};

export interface AlertInfo {
  id: number;
  message: AlertMessageType;
}

export interface chatDatatype {
  chatId: number;
  content: string;
  createdAt: string;
  memberId: number;
  picture: string | undefined;
  type: MessageType;
  username: string;
  verifyKey: string;
  targetContent: string | null;
  targetChatId: number | null;
  targetMemberId: number | null;
  targetPicture: string | null;
  targetUsername: string | null;
  isVoted: boolean;
  likes: number;
  status?: "SENDING" | "FAIL";
  isReported: boolean;
}

export interface searchedMessageType {
  chatId: number;
  content: string;
  memberId: number;
  username: string;
  picture?: string;
  createdAt?: string;
}
