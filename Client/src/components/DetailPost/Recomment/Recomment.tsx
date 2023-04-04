import { useState } from "react";
import { ReCommentType } from "../../../utils/d";
import * as poc from "../Comment/CommentStyled";
import { useRecoilState } from "recoil";
import { MemberId } from "../../../recoil/state";
import { deletePostComment } from "../../../API/BlogDetail/Delete/Delete";
import { modifiedComment } from "../../../API/BlogDetail/Patch/Patch";

const Recomment = ({
  recomments,
  postWriter,
}: {
  recomments: ReCommentType;
  postWriter: number | undefined;
}) => {
  const [recommentContent, setRecommentContent] = useState("");
  const [recommentIdx, setRecommentIdx] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [memberId] = useRecoilState(MemberId);
  return (
    <>
      {recomments && (
        <div key={recomments.commentId}>
          <poc.PostCommentBox>
            <poc.PostCommentTitle>
              <div>
                <poc.PostCommentUserName
                  writer={postWriter === recomments.memberId ? "writer" : ""}
                >
                  {recomments.username}
                </poc.PostCommentUserName>
                <poc.PostCommentDate>
                  {recomments.createdAt.slice(0, 4)}년{" "}
                  {recomments.createdAt.slice(5, 7)}월{" "}
                  {recomments.createdAt.slice(8, 10)}일
                </poc.PostCommentDate>
              </div>
            </poc.PostCommentTitle>
            {memberId === recomments.memberId || memberId === 1 ? (
              <poc.PostManageButtonContainer>
                <poc.PostManageButton
                  onClick={() => {
                    setIsRecomment(!isRecomment);
                    setRecommentIdx(recomments.commentId);
                  }}
                ></poc.PostManageButton>
                {isEdit && recommentIdx === recomments.commentId ? (
                  <poc.PostManageButton
                    onClick={() =>
                      modifiedComment(recomments.commentId, recommentContent)
                    }
                  >
                    완료
                  </poc.PostManageButton>
                ) : (
                  <poc.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setRecommentIdx(recomments.commentId);
                    }}
                  >
                    수정
                  </poc.PostManageButton>
                )}
                {isEdit && recommentIdx === recomments.commentId ? (
                  <poc.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </poc.PostManageButton>
                ) : (
                  <poc.PostManageButton
                    onClick={() => deletePostComment(recomments.commentId)}
                  >
                    삭제
                  </poc.PostManageButton>
                )}
              </poc.PostManageButtonContainer>
            ) : null}
          </poc.PostCommentBox>
          {isEdit && recommentIdx === recomments.commentId ? (
            <poc.PostCommentInputContainer
              padding="20px 40px"
              width="100%"
              height="100px"
            >
              <textarea
                defaultValue={recomments.commentContent}
                onChange={(e) => setRecommentContent(e.target.value)}
              ></textarea>
            </poc.PostCommentInputContainer>
          ) : (
            <>{recomments.commentContent}</>
          )}
        </div>
      )}
    </>
  );
};

export default Recomment;
