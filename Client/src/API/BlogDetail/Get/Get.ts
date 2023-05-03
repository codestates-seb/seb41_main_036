import axios from "axios";
import { ArrayCommentType } from "../../../utils/d";

export const getPost = async (
  postId: string | undefined,
  memberId?: number,
  isLogin?: boolean
) => {
  try {
    const url = isLogin
      ? `/posts/details/${postId}/${memberId}`
      : `/posts/details/${postId}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return {
      attractionAddress: "",
      attractionId: 1,
      attractionName: "",
      memberId: 1,
      commentCount: 1,
      createdAt: "",
      isVoted: false,
      likes: 1,
      modifiedAt: "",
      picture: "",
      postContents: [""],
      postHashTags: [""],
      postId: 1,
      postImageUrls: [""],
      postTitle: "",
      username: "",
      views: 1,
    };
  }
};

export const getPostCommentList = async (id: string | undefined) => {
  let result: ArrayCommentType = [];
  await axios
    .get(`/comments/listof/${id}`)
    .then((res) => {
      result = res.data.data;
    })
    .catch((err) => console.error(err));
  return result;
};
