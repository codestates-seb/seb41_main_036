import { atom } from "recoil";

export const PostTitle = atom<string>({
  key: "PostTitle",
  default: undefined,
});

export const PostTags = atom<string[]>({
  key: "PostTags",
  default: [],
});

export const PostImage = atom<string>({
  key: "PostImage",
  default: undefined,
});

export const PostImageList = atom<FileList>({
  key: "PostImageList",
  default: undefined,
});

export const PostContent = atom<string[]>({
  key: "PostContent",
  default: [],
});

export const PostPreviewList = atom<string[][]>({
  key: "PostPreviewList",
  default: [],
});
