import { atom } from "recoil";

export const PostTags = atom<string[]>({
  key: "PostTags",
  default: [],
});

export const PostContent = atom<string[]>({
  key: "PostContent",
  default: [],
});

export const PostPreviewList = atom<string[][]>({
  key: "PostPreviewList",
  default: [],
});
