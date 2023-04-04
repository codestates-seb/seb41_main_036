import axios from "../../../utils/axiosinstance";

export const modifiedComment = (commentId: number, commentContent: string) => {
  axios
    .patch(`/comments/edit/${commentId}`, {
      commentContent: commentContent,
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
};
