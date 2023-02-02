import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CommentType } from "../pages/DetailPost";
import { MemberId } from "../recoil/state";
import axios from "../utils/axiosinstance";

const PostCommentContainer = styled.div`
width: 70%;
margin: 20px auto;
  > div {
    display: flex;
    justify-content: space-between;
  }
  > div > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div > div:first-child {
    display: flex;
  }
  > div > div:first-child > div {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  > div > div:first-child > div > span {
    font-size: var(--font-xxs);
    font-weight: 200;
    margin-top: 4px;
  }
  > div > div:last-child {
    display: flex;
  }
  > form {
    width: 100%;
  }
  > div:last-child {
    padding: 20px 40px;
    border-bottom: 1px solid var(--black-600);
  }
  > form {
    padding: 20px 40px;
  }
  > form > textarea {
    width: 100%;
    height: 100px;
    display: flex;
    resize: none;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--purple-300);
    font-size: var(--font-base);
    &:focus {
      outline-color: var(--purple-400);
      box-shadow: 0 0 6px var(--purple-300);
    }
  }
`;

const PostManageButton = styled.button`
  min-width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  font-size: var(--font-sm);
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
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
      <PostCommentContainer>
        <div>
          <div>
            <img alt="userImg" src={comment.memberPicture} />
            <div>
              {comment.username}
              <span>
                {comment.createdAt.slice(0,4)}년 {comment.createdAt.slice(5,7)}월 {comment.createdAt.slice(8,10)}일 / {comment.createdAt.slice(11,19)}에 작성</span>
            </div>
          </div>
          {memberId === comment.memberId || memberId === 1 ? (
            <div>
              {isEdit ? (
                <PostManageButton onClick={modifiedComment}>
                  완료
                </PostManageButton>
              ) : (
                <PostManageButton onClick={() => setIsEdit(!isEdit)}>
                  수정
                </PostManageButton>
              )}

              <PostManageButton onClick={deleteComment}>삭제</PostManageButton>
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
      </PostCommentContainer>
    </>
  );
};

export default PostComment;
