import axios from "../../../utils/axiosinstance";

export const modifiedComment = (commentId: number, commentContent: string) => {
  axios
    .patch(`/comments/edit/${commentId}`, {
      commentContent: commentContent,
    })
    .then((res) => console.log(res.data.data))
    .catch((err) => console.error(err));
};
