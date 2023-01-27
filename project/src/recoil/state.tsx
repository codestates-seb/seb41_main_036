import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const AuthToken = atom({
  key: "AuthToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const LoggedUser = atom({
  key: "LoggedUser",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const MemberId = atom({
  key: "MemberId",
  default: Number(localStorage.getItem("memberId")),
});
