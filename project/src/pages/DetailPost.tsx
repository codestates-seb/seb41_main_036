import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import PostComment from "../components/PostComment";
import axios from "../utils/axiosinstance";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState, MemberId } from "../recoil/state";
import Modal from "../components/Modal";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const DetailPostWrapper = styled.div`
  width: 83.5%;
  margin: 30px auto;
`;

const PostMangeButtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5em;
  width: 85%;
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

const DetailPostTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  > h2 {
    width: 50%;
    text-align: center;
    font-size: var(--font-xxl);
  }
`;

const DetailPostInfo = styled.div`
  width: 70%;
  display: flex;
  margin: 2em auto;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  div:first-child {
    display: flex;
    align-items: center;
    color: var(--black-800);
  }
  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: var(--font-sm);
  }
  > div:last-child > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const PostContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  justify-content: center;
  margin: 0 auto;

  > div:nth-child(2) {
    margin: 30px auto 0;
    width: 70%;
  }
`;

const PostContentBox = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    height: 30%;
    margin: 0 auto;
    object-fit: cover;
    margin-bottom: 2em;
  }
  div > div:last-child {
    padding: 0 30px;
    text-align: center;
    margin-bottom: 2em;
  }
`;
const TagsButton = styled.button`
  padding: 7px 10px;
  height: 30px;
  border: none;
  background-color: transparent;
  margin-right: 10px;
  margin-top: 5em;
  cursor: pointer;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-s);
  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
`;

const PostContentBottom = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 0 3em 0;
  border-bottom: 3px solid #9e95ec;
  > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  > div:last-child {
    width: 100px;
    display: flex;
    justify-content: space-around;
  }
  > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--black-700);
    cursor: pointer;
  }
  > div > div > span {
    font-size: var(--font-xs);
    color: var(--black-900);
  }
`;

const AddComment = styled.form<{ isLogin: boolean }>`
  margin: 35px auto 50px;
  width: 80%;
  > h3 {
    margin-left: 7%;
  }

  > div {
    width: 94%;
    margin: 22px 30% 0 58px;
    display: flex;
  }
  > div > img {
    width: 40px;
    height: 40px;
    border-radius: var(--br-l);
    margin: 0 14px 0 30px;
  }
  > div > textarea {
    border-color: #c6c6c6;
    width: 90%;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    resize: none;
    margin-bottom: 30px;
  }
  button {
    position: relative;
    top: 8em;
    right: 6.2em;
  }
`;

const EmptyCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em 0;

  svg {
    margin-right: 1em;
  }
`;

const DetailPostAttractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-lg);
  font-weight: var(--fw-bold);
  p {
    margin-top: 5px;
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
    svg {
      color: var(--purple-400);
    }
  }
`;
export interface PostDetailType {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
  memberId: number;
  comments: [
    {
      commentId: number;
      memberId: number;
      username: string;
      memberPicture: string;
      commentContent: string;
      createdAt: string;
      modifiedAt: string;
    }
  ];
  createdAt: string;
  isVoted: boolean;
  likes: number;
  modifiedAt: string;
  picture: string;
  postContents: string[];
  postHashTags: string[];
  postId: number;
  postImageUrls: string[];
  postTitle: string;
  username: string;
  views: number;
}

export interface CommentType {
  commentId: number;
  memberId: number;
  username: string;
  memberPicture: string;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ArrayCommentType extends Array<CommentType> {}
// PostContent 리팩토링 예정
// interface PostContentsType {
//   imageURL: string;
//   content: string;
//   imageId: number;
// }
// interface ArrayPostCotentsType extends Array<PostContentsType> {}
// const [postContents, setPostContents] = useState<
//   ArrayPostCotentsType | PostContentsType
// >([]);

const DetailPost = () => {
  const [post, setPost] = useState<PostDetailType>();
  const [postComments, setPostComments] = useState<ArrayCommentType>();
  const [comment, setComment] = useState("");
  const [isLogin] = useRecoilState(LoginState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const [memberId] = useRecoilState(MemberId);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      axios
        .get(`/posts/details/${id}/${memberId}`)
        .then((res) => setPost(res.data.data))
        .catch((err) => console.error(err));
      setPostComments(post?.comments);
    } else {
      axios
        .get(`/posts/details/${id}`)
        .then((res) => setPost(res.data.data))
        .catch((err) => console.error(err));
      setPostComments(post?.comments);
    }
  }, [post === undefined]);
  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`/comments/upload/${id}`, {
        commentContent: comment,
      })
      .then((res) => {
        if (res.status === 201) {
          setComment("");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };
  let data: any[] = [];
  for (let i = 0; i < post?.postImageUrls.length!; i++) {
    data.push({
      imageURL: post?.postImageUrls[i],
      content: post?.postContents[i],
      imgageId: i + 1,
    });
  }
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/posts/delete/${id}`)
        .then((res) => {
          if (res.status === 204) {
            alert("삭제가 완료되었습니다.");
            navigate(-1);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCommentWrite = () => {
    if (!isLogin) setIsModalVisible(true);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("url이 성공적으로 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      <DetailPostWrapper>
        {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}
        {(post && post.memberId === memberId) || memberId === 1 ? (
          <PostMangeButtnContainer>
            <PostManageButton onClick={() => navigate(`/edit/${id}`)}>
              <MdModeEdit /> 수정
            </PostManageButton>
            <PostManageButton onClick={deleteHandler}>
              <MdDelete /> 삭제
            </PostManageButton>
          </PostMangeButtnContainer>
        ) : null}
        <DetailPostTitle>
          <h2>{post?.postTitle}</h2>
        </DetailPostTitle>
        <DetailPostInfo>
          <DetailPostAttractionsContainer>
            {post?.attractionName}
            <p>
              <MdPlace /> &nbsp;{post?.attractionAddress}
            </p>
          </DetailPostAttractionsContainer>
          <div>
            <button
              onClick={() =>
                navigate(`/attractions/detail/${post?.attractionId}`)
              }
            >
              <RxDoubleArrowLeft />
              &nbsp; 이 명소 포스트 더보기
            </button>
            <span>{post?.createdAt.slice(0, 10)}</span>
          </div>
        </DetailPostInfo>
        <PostContentContainer>
          <PostContentBox>
            {data.map((post, idx) => (
              <div key={idx}>
                <div>
                  <img src={post.imageURL} alt="picture" />
                </div>
                <div>{post.content}</div>
              </div>
            ))}
          </PostContentBox>
          <div>
            {post &&
              post?.postHashTags.map((tag, idx) => (
                <>
                  <TagsButton key={idx}>{tag}</TagsButton>
                </>
              ))}
          </div>
          <PostContentBottom>
            <div>
              <img alt="userImg" src={post?.picture} />
              <strong>{post?.username}</strong>님의 포스트
            </div>
            <div>
              <div onClick={()=>{handleCopyClipBoard(document.location.href)}}>
                <AiOutlineShareAlt />
                <span>공유</span>
              </div>
              <div>
                <AiFillEye />
                <span>{post?.views}</span>
              </div>
              <div>
                <AiFillHeart />
                <span>{post?.likes}</span>
              </div>
            </div>
          </PostContentBottom>
        </PostContentContainer>
        {postComments && postComments.length === 0 ? (
          <EmptyCommentContainer>
            <FaRegCommentDots />
            첫번째 댓글을 남겨주세요.
          </EmptyCommentContainer>
        ) : (
          postComments?.map((comment) => (
            <PostComment key={comment.commentId} comment={comment} />
          ))
        )}
        <AddComment isLogin={isLogin}>
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onClick={handleCommentWrite}
            />
            {isLogin ? (
              <Button
                type="violet"
                width="80px"
                height="35px"
                text="등록"
                onClick={(e) => handleCommentSubmit(e)}
              />
            ) : (
              <Button type="gray" width="80px" height="35px" text="등록" />
            )}
          </div>
        </AddComment>
      </DetailPostWrapper>
      <Footer />
    </>
  );
};

export default DetailPost;
