import axios from "../../../utils/axiosinstance";
import { ArrayCommentType, PostDetailType } from "../../../utils/d";

export const getPost = async (
  isLogin: boolean,
  id: string | undefined,
  memberId: number
) => {
  let result: PostDetailType = {
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
  if (isLogin) {
    await axios
      .get(`/posts/details/${id}/${memberId}`)
      .then((res) => (result = res.data.data))
      .catch((err) => console.error(err));
  } else {
    await axios
      .get(`/posts/details/${id}`)
      .then((res) => (result = res.data.data))
      .catch((err) => console.error(err));
  }
  return result;
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
