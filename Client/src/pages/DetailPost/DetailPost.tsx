import { useEffect, useState } from "react";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import Comment from "../../components/DetailPost/Comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState, MemberId } from "../../recoil/state";
import Modal from "../../components/Modal";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import * as dp from "./DetailPostStyled";
import { ArrayCommentType, PostDetailType } from "../../utils/d";
import AddComment from "../../components/DetailPost/AddComment";
import { deletePostHandler } from "../../API/BlogDetail/Delete/Delete";
import { getPost, getPostCommentList } from "../../API/BlogDetail/Get/Get";
import { handleLikePost } from "../../API/BlogDetail/Post/Post";
import { isModalVisiable } from "../../recoil/setOverlay";
import { getCurrentCount } from "../../utils/utils";

const DetailPost = () => {
  const [post, setPost] = useState<PostDetailType>();
  const [commentList, setCommentList] = useState<ArrayCommentType>();
  const [isLogin] = useRecoilState(LoginState);
  const [isVoted, setIsVoted] = useState(false);
  const { id } = useParams();
  const [memberId] = useRecoilState(MemberId);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useRecoilState(isModalVisiable);
  const initialLikesRef = useRef(post?.isVoted); //로컬 좋아요 상태 저장

  useEffect(() => {
    const get = async () => {
      const response = await getPost(isLogin, id, memberId);
      setPost(response);
    };
    get();
  }, [isVoted]);

  let data: any[] = [];
  for (let i = 0; i < post?.postImageUrls.length!; i++) {
    data.push({
      imageURL: post?.postImageUrls[i],
      content: post?.postContents[i],
      imgageId: i + 1,
    });
  }

  useEffect(() => {
    const getData = async () => {
      const response = await getPostCommentList(id);
      setCommentList(response);
    };
    getData();
  }, []);

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
      <dp.DetailPostWrapper>
        {isModal && <Modal />}
        {(post && post.memberId === memberId) || memberId === 1 ? (
          <dp.PostMangeButtnContainer>
            <dp.PostManageButton onClick={() => navigate(`/edit/${id}`)}>
              <MdModeEdit /> 수정
            </dp.PostManageButton>
            <dp.PostManageButton onClick={() => deletePostHandler(id)}>
              <MdDelete /> 삭제
            </dp.PostManageButton>
          </dp.PostMangeButtnContainer>
        ) : null}
        <dp.DetailPostTitle>
          <h2>{post?.postTitle}</h2>
        </dp.DetailPostTitle>
        <dp.DetailPostInfo>
          <dp.DetailPostAttractionsContainer>
            {post?.attractionName}
            <p>
              <MdPlace /> &nbsp;{post?.attractionAddress}
            </p>
          </dp.DetailPostAttractionsContainer>
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
        </dp.DetailPostInfo>
        <dp.PostContentContainer>
          <dp.PostContentBox>
            {data.map((post, idx) => (
              <div key={idx}>
                <div>
                  <img src={post.imageURL} alt="picture" key={post.postId} />
                </div>
                <div>{post.content}</div>
              </div>
            ))}
          </dp.PostContentBox>
          <div>
            {post &&
              post.postHashTags.map((tag) => (
                <>
                  <dp.TagsButton key={post.postId}>{tag}</dp.TagsButton>
                </>
              ))}
          </div>
          <dp.PostContentBottom>
            <div>
              <img alt="userImg" src={post?.picture} />
              <strong>{post?.username}</strong>님의 포스트
            </div>
            <div>
              <div
                onClick={() => {
                  handleCopyClipBoard(document.location.href);
                }}
              >
                <AiOutlineShareAlt />
                <span>공유</span>
              </div>
              <div>
                <AiFillEye />
                <span>{post?.views}</span>
              </div>
              <div>
                <AiFillHeart
                  onClick={() =>
                    !memberId
                      ? setIsModal(true)
                      : handleLikePost(id, setIsVoted)
                  }
                  color={post && post.isVoted ? "red" : "grey"}
                />
                <span>
                  {getCurrentCount(
                    post?.likes,
                    initialLikesRef.current as boolean,
                    isVoted as boolean
                  )}
                </span>
              </div>
            </div>
          </dp.PostContentBottom>
        </dp.PostContentContainer>
        {post && post.commentCount === 0 ? (
          <dp.EmptyCommentContainer>
            <FaRegCommentDots />
            첫번째 댓글을 남겨주세요.
          </dp.EmptyCommentContainer>
        ) : (
          commentList &&
          commentList.map((comments) => (
            <Comment
              key={comments.commentId}
              comments={comments}
              postWriter={post?.memberId}
            />
          ))
        )}
        <AddComment />
      </dp.DetailPostWrapper>
      <Footer />
    </>
  );
};

export default DetailPost;
