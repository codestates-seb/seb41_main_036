import { Dispatch, SetStateAction } from "react";
import axios from "../../../utils/axiosinstance";

export const handleCommentSubmit = async (
  id: string | undefined,
  addComment: string
) => {
  axios
    .post(`/comments/upload/${id}`, {
      commentContent: addComment,
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
};

export const handleLikePost = (
  postId: string | undefined,
  setIsVoted: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .post(`/posts/likes/${postId}`)
    .then((res) => setIsVoted(res.data.data.isVoted));
};

export const handleSubmitRecomment = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  id: string | undefined,
  parentId: number,
  recomment: string
) => {
  if (e.key === "Enter") {
    axios
      .post(`/comments/upload/${id}`, {
        commentContent: recomment,
        parentId: parentId,
      })
      .then((res) => console.log(res));
  }
};
