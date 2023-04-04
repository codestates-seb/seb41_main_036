import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { deletePostComment } from "../../../API/BlogDetail/Delete/Delete";
import { modifiedComment } from "../../../API/BlogDetail/Patch/Patch";
import { MemberId } from "../../../recoil/state";
import * as poc from "./CommentStyled";
import ReComment from "../Recomment/Recomment";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { handleCommentSubmit } from "../../../API/BlogDetail/Post/Post";
import { CommentType, ReCommentType } from "../../../utils/d";

const Comment = ({
  comments,
  postWriter,
}: {
  comments: CommentType;
  postWriter: number | undefined;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [commentIdx, setCommentIdx] = useState(0);
  const [content, setContent] = useState({
    recommentContent: "",
    editcommentContent: "",
  });
  const { recommentContent, editcommentContent } = content;
  const [isMoreRecomment, setIsMoreReomment] = useState(false);
  const [memberId] = useRecoilState(MemberId);
  const { id } = useParams();

  return (
    <>
      {comments && (
        <poc.PostCommentWrapper key={comments.commentId}>
          <poc.PostCommentBox>
            <poc.PostCommentTitle>
              <poc.PostCommentImg
                alt="userImg"
                src={comments.memberPicture}
              />
              <poc.PostCommentUserName
                writer={postWriter === comments.memberId ? "writer" : ""}
              >
                {comments.username}
              </poc.PostCommentUserName>
              <poc.PostCommentDate>
                {comments.createdAt.slice(0, 4)}년{" "}
                {comments.createdAt.slice(5, 7)}월{" "}
                {comments.createdAt.slice(8, 10)}일
              </poc.PostCommentDate>
              <poc.PostManageButton
                onClick={() => {
                  setIsRecomment(!isRecomment);
                  setCommentIdx(comments.commentId);
                }}
              >
                {isRecomment && commentIdx === comments.commentId
                  ? "답글 취소"
                  : "답글 쓰기"}
              </poc.PostManageButton>
            </poc.PostCommentTitle>
            {memberId === comments.memberId || memberId === 1 ? (
              <poc.PostManageButtonContainer>
                {isEdit && commentIdx === comments.commentId ? (
                  <poc.PostManageButton
                    onClick={() =>
                      modifiedComment(comments.commentId, editcommentContent)
                    }
                  >
                    완료
                  </poc.PostManageButton>
                ) : (
                  <poc.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setCommentIdx(comments.commentId);
                    }}
                  >
                    수정
                  </poc.PostManageButton>
                )}
                {isEdit && commentIdx === comments.commentId ? (
                  <poc.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </poc.PostManageButton>
                ) : (
                  <poc.PostManageButton
                    onClick={() => deletePostComment(comments.commentId)}
                  >
                    삭제
                  </poc.PostManageButton>
                )}
              </poc.PostManageButtonContainer>
            ) : null}
          </poc.PostCommentBox>
          {isEdit && commentIdx === comments.commentId ? (
            <poc.PostCommentInputContainer
              padding="20px 40px"
              width="100%"
              height="100px"
            >
              <textarea
                defaultValue={comments.commentContent}
                onChange={(e) =>
                  setContent({
                    ...content,
                    editcommentContent: e.target.value,
                  })
                }
              ></textarea>
            </poc.PostCommentInputContainer>
          ) : (
            <poc.PostCommentContentContainer>
              {comments.commentContent}
              {isRecomment && commentIdx === comments.commentId ? (
                <poc.PostCommentInputContainer
                  padding="20px 0"
                  width="70%"
                  height="45px"
                >
                  <textarea
                    value={recommentContent}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        recommentContent: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={(e) =>
                      handleCommentSubmit(
                        id,
                        recommentContent,
                        e,
                        comments.commentId
                      )
                    }
                  >
                    작성
                  </button>
                </poc.PostCommentInputContainer>
              ) : null}
              {comments.children.length !== 0 ? (
                <poc.PostCommentisMoreRecommentContainer
                  onClick={() => {
                    setIsMoreReomment(!isMoreRecomment);
                    setCommentIdx(comments.commentId);
                  }}
                >
                  {isMoreRecomment && commentIdx === comments.commentId ? (
                    <IoMdArrowDropup size={"20px"} />
                  ) : (
                    <IoMdArrowDropdown size={"20px"} />
                  )}{" "}
                  답글 {comments.children.length}개
                </poc.PostCommentisMoreRecommentContainer>
              ) : null}
              {isMoreRecomment && commentIdx === comments.commentId
                ? comments.children.map((recomments: ReCommentType) => (
                    <ReComment
                      key={recomments.commentId}
                      recomments={recomments}
                      postWriter={postWriter}
                    />
                  ))
                : null}
            </poc.PostCommentContentContainer>
          )}
        </poc.PostCommentWrapper>
      )}
    </>
  );
};

export default Comment;
