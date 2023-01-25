import styled from "styled-components";
import { BsEye } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { ArrayPostType } from "../pages/Post";
import { useNavigate } from "react-router-dom";

const PostContainer = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
  display: flex;
  flex-wrap: wrap;
`;

const PostCard = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 230px;
  background-color: #ffffff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: var(--br-m);
  transition: all 0.3s ease;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 5px 24px;

  :hover {
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  > div:nth-child(1) {
    display: flex;
    justify-content: center;
    height: 150px;

    > img {
      border-top-left-radius: var(--br-m);
      border-top-right-radius: var(--br-m);
      width: 100%;
      padding: 5px;
      background-image: cover;
    }
  }
  > div:nth-child(2) {
    height: 50px;
    font-size: 14px;
    clear: both;
    background-color: #ffffff;
    display: flex;

    > div:nth-child(1) {
      width: 80%;
      height: 60px;
      display: flex;
      > img {
        height: 40px;
        background-image: cover;
        border-radius: 50%;
        margin: 10px;
        object-fit: cover;
      }
      > div {
        margin-top: 10px;
        > div {
          color: #323232;
          font-weight: bold;
        }
        > span {
          font-size: 11px;
          color: grey;
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 13px;
      color: grey;
      padding-bottom: 21px;
      > p {
        margin: 0 15px 0 6px;
      }
    }
  }
  > div:nth-child(3) {
    height: 20px;
    background-color: white;
    margin-left: 15px;
    margin-top: 5px;
    color: grey;
    font-weight: bold;
    font-size: 14px;
  }
`;

const PostCardComponent = ({
  posts,
  limit,
  margin,
  width,
  curPage = 1,
}: {
  posts: ArrayPostType;
  limit: number;
  margin: string;
  width: string;
  curPage?: number;
}) => {
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const navigate = useNavigate();
  return (
    <>
      <PostContainer margin={margin}>
        {currentPosts.map((post: any) => {
          return (
            <PostCard key={post.postId} width={width}>
              <div>
                <img
                  src={post.picture}
                  onClick={() => navigate(`/posts/detail/${post.postId}`)}
                ></img>
              </div>
              <div>
                <div>
                  <img src={post.picture}></img>
                  <div>
                    <div>{post.username}</div>
                    <span>{post.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <div>
                  <BsEye></BsEye>
                  <p>{post.views}</p>
                  <AiFillHeart></AiFillHeart>
                  <p>{post.likes}</p>
                </div>
              </div>
              <div
                onClick={() => navigate(`/posts/detail/${post.attractionId}`)}
              >
                {post.postTitle}
              </div>
            </PostCard>
          );
        })}
      </PostContainer>
    </>
  );
};

export default PostCardComponent;
