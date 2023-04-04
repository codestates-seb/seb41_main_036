import React, { Dispatch, SetStateAction } from "react";
import axios from "../../../utils/axiosinstance";

export const handleCommentSubmit = async (
  id: string | undefined,
  addComment: string,
  e: React.MouseEvent<HTMLButtonElement>,
  parentId?: number | null
) => {
  e.preventDefault();
  axios
    .post(`/comments/upload/${id}`, {
      commentContent: addComment,
      parentId: parentId,
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
