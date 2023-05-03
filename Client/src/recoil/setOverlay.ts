import { atom } from "recoil";

export const setOverlay = atom({
  key: "setOverlay",
  default: false,
});

export const isModalVisible = atom({
  key: "isModalVisible",
  default: false,
});
