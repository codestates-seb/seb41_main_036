import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ArrayPlaceType, PageInfoType } from "../pages/Place";
import { ArrayPostType } from "../pages/Post";

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

export const RefreshToken = atom({
  key: "RefreshToken",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const LoggedUser = atom({
  key: "LoggedUser",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const locationFilterValue = atom<string[]>({
  key: "locationFilterValue",
  default: [],
});

export const placeInfoData = atom<ArrayPlaceType>({
  key: "placeInfoData",
  default: [],
});

export const postInfoData = atom<ArrayPostType>({
  key: "postInfoData",
  default: [],
});

export const curPageValue = atom<number>({
  key: "curPageValue",
  default: 1,
});
