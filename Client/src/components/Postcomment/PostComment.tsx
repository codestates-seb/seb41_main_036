import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MemberId } from "../../recoil/state";
import axios from "../../utils/axiosinstance";
import { CommentType } from "../../utils/d";
import * as poc from "./PostCommentStyled";

const PostComment = ({ comment }: { comment: CommentType }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [commentContent, setCommentcontent] = useState("");
  const [recomment, setRecomment] = useState("");
  const [memberId] = useRecoilState(MemberId);
  const commentId = comment.commentId;
  const { id } = useParams();

  const commentContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentcontent(e.target.value);
  };

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
  const handleSubmitRecomment = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      axios
        .post(`/comments/upload/${id}`, {
          commentContent: recomment,
          parentId: comment.parentId,
        })
        .then((res) => console.log(res));
    }
  };
  return (
    <>
      <poc.PostCommentWrapper key={comment.commentId}>
        <poc.PostCommentBox>
          <poc.PostCommentTitle>
            <poc.PostCommentImg alt="userImg" src={comment.memberPicture} />
            <div>
              <poc.PostCommentUserName>
                {comment.username}
              </poc.PostCommentUserName>
              <poc.PostCommentDate>
                {comment.createdAt.slice(0, 4)}년{" "}
                {comment.createdAt.slice(5, 7)}월{" "}
                {comment.createdAt.slice(8, 10)}일
              </poc.PostCommentDate>
            </div>
          </poc.PostCommentTitle>
          {memberId === memberId || memberId === 1 ? (
            <poc.PostManageButtonContainer>
              <poc.PostManageButton
                onClick={() => setIsRecomment(!isRecomment)}
              >
                답글 쓰기
              </poc.PostManageButton>
              {isEdit ? (
                <poc.PostManageButton onClick={modifiedComment}>
                  완료
                </poc.PostManageButton>
              ) : (
                <poc.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                  수정
                </poc.PostManageButton>
              )}
              <poc.PostManageButton onClick={deleteComment}>
                삭제
              </poc.PostManageButton>
            </poc.PostManageButtonContainer>
          ) : null}
        </poc.PostCommentBox>
        {isEdit ? (
          <poc.PostCommentInputContainer
            padding="20px 40px"
            width="100%"
            height="100px"
          >
            <textarea
              value={comment.commentContent}
              onChange={commentContentHandler}
            ></textarea>
          </poc.PostCommentInputContainer>
        ) : (
          <poc.PostCommentContentContainer>
            {comment.commentContent}
            {isRecomment ? (
              <poc.PostCommentInputContainer
                padding="20px 0"
                width="70%"
                height="45px"
              >
                <textarea
                  value={recomment}
                  onChange={(e) => setRecomment(e.target.value)}
                  onKeyDown={handleSubmitRecomment}
                ></textarea>
              </poc.PostCommentInputContainer>
            ) : null}
          </poc.PostCommentContentContainer>
        )}
      </poc.PostCommentWrapper>
    </>
  );
};

export default PostComment;
