import { atom } from "recoil";

export const setOverlay = atom({
  key: "setOverlay",
  default: false,
});

export const isModalVisiable = atom({
  key: "isModalVisiable",
  default: false,
});
