import { useState } from "react";
import styled from "styled-components";
import dummy from "../dummyData.json";
const PostCommentContainer = styled.div`
  margin-top: 20px;
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
  }

  > div > div:first-child > div > span {
    font-size: var(--font-xxs);
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

<<<<<<< HEAD
interface CommentType {
  commentId: number;
  memberId: number;
  username: string;
  memberPicture: string;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
}

=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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
<<<<<<< HEAD
const PostComment = ({ comment }: { comment: CommentType }) => {
  const [commentEdit, setCommentEdit] = useState(false);
  const [commentContent, setCommentcontent] = useState(comment.commentContent);
=======
const PostComment = () => {
  const [commentEdit, setCommentEdit] = useState(false);
  const [commentContent, setCommentcontent] = useState(dummy.post[0].content);
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  const commentContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentcontent(e.target.value);
  };
  return (
    <>
      <PostCommentContainer>
        <div>
          <div>
<<<<<<< HEAD
            <img alt="userImg" src={comment.memberPicture} />
            <div>
              {comment.username}
              <span>{comment.createdAt}</span>
=======
            <img alt="userImg" src={dummy.post[0].userImg} />
            <div>
              {dummy.post[0].username}
              <span>{dummy.post[0].createdAt}</span>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
            </div>
          </div>
          <div>
            {commentEdit ? (
              <PostManageButton>완료</PostManageButton>
            ) : (
              <PostManageButton onClick={() => setCommentEdit(!commentEdit)}>
                수정
              </PostManageButton>
            )}

            <PostManageButton>삭제</PostManageButton>
          </div>
        </div>
        {commentEdit ? (
          <form>
            <textarea
              value={commentContent}
              onChange={commentContentHandler}
            ></textarea>
          </form>
        ) : (
<<<<<<< HEAD
          <div> {comment.commentContent}</div>
=======
          <div> {dummy.post[0].content}</div>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
        )}
      </PostCommentContainer>
    </>
  );
};

export default PostComment;
