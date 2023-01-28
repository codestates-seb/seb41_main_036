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

const DetailPostWrapper = styled.div`
  width: 83.5%;
  margin: 0 auto;
`;

const PostMangeButtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
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
  width: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  margin-bottom: 100px;
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
    margin-top: 30px;
  }

  img {
    width: 100%;
    margin: 0 auto;
  }
`;

const PostContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div:nth-child(2) {
    margin: 5em 0;
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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5em 0;
  border-bottom: 1px solid var(--black-600);
  > div > img {
    width: 30px;
    height: 30px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    font-weight: var(--fw-bold);
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

const AddComment = styled.form`
  margin-top: 20px;
  width: 100%;
  > div {
    margin-top: 20px;
    display: flex;
  }
  > div > img {
    width: 40px;
    height: 40px;
    border-radius: var(--br-l);
    margin-right: 10px;
  }
  > div > textarea {
    width: 95%;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    resize: none;
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

export interface PostDetailType {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
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
    axios
      .get(`/posts/details/${id}`)
      .then((res) => setPost(res.data.data))
      .catch((err) => console.error(err));
    setPostComments(post?.comments);
  }, [post === undefined]);
  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`/comments/upload/${id}`, {
        commentContent: comment,
      })
      .then((res) => {
        console.log(res);
        setComment("");
        window.location.reload();
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
          alert("삭제가 완료되었습니다.");
          console.log(res);
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCommentWrite = () => {
    if (!isLogin) setIsModalVisible(true);
  };
  
  return (
    <>
      <Header>
        <Header.HeaderTop />
        <Header.HeaderBody />
      </Header>
      <DetailPostWrapper>
        {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} />}
        {(post && post.postId === memberId) || memberId === 1 ? (
          <PostMangeButtnContainer>
            <PostManageButton>
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
          <div>
            <MdPlace /> &nbsp;{post?.attractionAddress}
          </div>
          <div>
            <button
              onClick={() =>
                navigate(`/attractions/detail/${post?.attractionId}`)
              }
            >
              <RxDoubleArrowLeft />
              &nbsp; 이 명소 방문 리뷰 더보기
            </button>
            <span>{post?.createdAt.slice(0, 10)}</span>
          </div>
        </DetailPostInfo>
        <PostContentContainer>
          <PostContentBox>
            {data.map((el) => (
              <div key={el.imageId}>
                <div>
                  <img src={el.imageURL} alt="picture" />
                </div>
                <div>{el.content}</div>
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
              {post?.username}님의 포스트
            </div>
            <div>
              <div>
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
          postComments?.map((comment, idx) => (
            <PostComment key={idx} comment={comment} />
          ))
        )}
        <AddComment>
          <h3>댓글 남기기</h3>
          <div>
            <img src={post?.picture} alt="userImg" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onClick={handleCommentWrite}
            />
            <Button
              type="violet"
              width="80px"
              height="35px"
              text="등록"
              onClick={(e) => handleCommentSubmit(e)}
            />
          </div>
        </AddComment>
      </DetailPostWrapper>
    </>
  );
};

export default DetailPost;
