import { useState } from "react";
import { useRecoilState } from "recoil";
import { CommentType } from "../../pages/DetailPost/DetailPost";
import { MemberId } from "../../recoil/state";
import axios from "../../utils/axiosinstance";
import * as poc from "./PostCommentStyled";

const PostComment = ({ comment }: { comment: CommentType }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentcontent] = useState(comment.commentContent);
  const [memberId] = useRecoilState(MemberId);
  const commentContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentcontent(e.target.value);
  };
  const commentId = comment.commentId;

  const deleteComment = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/comments/delete/${commentId}`)
        .then((res) => {
          if (res.status === 204) {
            alert("삭제가 완료되었습니다.");
            window.location.reload();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const modifiedComment = () => {
    axios
      .patch(`/comments/edit/${commentId}`, {
        commentContent: commentContent,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsEdit(!isEdit);
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <poc.PostCommentContainer>
        <div>
          <div>
            <img alt="userImg" src={comment.memberPicture} />
            <div>
              {comment.username}
              <span>
                {comment.createdAt.slice(0, 4)}년{" "}
                {comment.createdAt.slice(5, 7)}월{" "}
                {comment.createdAt.slice(8, 10)}일 /{" "}
                {comment.createdAt.slice(11, 19)}에 작성
              </span>
            </div>
          </div>
          {memberId === comment.memberId || memberId === 1 ? (
            <div>
              {isEdit ? (
                <poc.PostManageButton onClick={modifiedComment}>
                  완료
                </poc.PostManageButton>
              ) : (
                <poc.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                  수정
                </poc.PostManageButton>
              )}

              <poc.PostManageButton onClick={deleteComment}>삭제</poc.PostManageButton>
            </div>
          ) : null}
        </div>
        {isEdit ? (
          <form>
            <textarea
              value={commentContent}
              onChange={commentContentHandler}
            ></textarea>
          </form>
        ) : (
          <div> {comment.commentContent}</div>
        )}
      </poc.PostCommentContainer>
    </>
  );
};

export default PostComment;
