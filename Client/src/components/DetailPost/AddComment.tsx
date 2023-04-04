import * as dp from "../../pages/DetailPost/DetailPostStyled";
import Button from "../../components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../recoil/state";
import { useParams } from "react-router-dom";
import { handleCommentSubmit } from "../../API/BlogDetail/Post/Post";

const AddComment = ({
  setIsModalVisible,
}: {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [addComment, setAddComment] = useState("");
  const [isLogin] = useRecoilState(LoginState);
  const { id } = useParams();

  const handleCommentWrite = () => {
    if (!isLogin) setIsModalVisible(true);
  };

  return (
    <dp.AddComment isLogin={isLogin}>
      <h3>댓글 남기기</h3>
      <div>
        <img
          src={
            "https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g"
          }
          alt="userImg"
        />
        <textarea
          placeholder="댓글을 남겨주세요!"
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
          onClick={handleCommentWrite}
        />
        {isLogin ? (
          <Button
            type="violet"
            width="75px"
            height="30px"
            text="등록"
            onClick={(e) => handleCommentSubmit(id, addComment, e)}
          />
        ) : (
          <Button type="gray" width="80px" height="35px" text="등록" />
        )}
      </div>
    </dp.AddComment>
  );
};

export default AddComment;
