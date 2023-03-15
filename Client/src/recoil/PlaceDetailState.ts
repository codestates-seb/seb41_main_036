import { atom } from "recoil";
import { PlaceData } from "../pages/PlaceDetail";

export const BookmarkSavesState = atom<boolean>({
  key: "BookmarkSaves",
  default: false,
});

export const LikesState = atom<boolean>({
  key: "Likes",
  default: false,
});

export const AttractionDataState = atom<PlaceData>({
  key: "attractionData",
  default: undefined,
});
