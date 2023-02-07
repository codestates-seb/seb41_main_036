import styled from "styled-components";
import { AiFillHeart, AiFillEye as EyeIcon } from "react-icons/ai";
import { ArrayPostType } from "../pages/Post";
import { useNavigate } from "react-router-dom";

const PostContainer = styled.div<{ margin: string }>`
  margin-left: ${(props) => (props.margin === "0" ? "0" : props.margin)};
  display: flex;
  flex-wrap: wrap;
  gap: 25px 1.3%;
  width: 100%;
  div:last-child {
    cursor: pointer;
  }
`;

const PostCard = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  max-width: 350px;
  height: 230px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: var(--br-m);
  transition: all 0.3s cubic-bezier(0, 0, 0.6, 1);
  box-shadow: 0px 0px 8px rgb(0 0 0 / 8%);
  :hover {
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
  }

  > div:nth-child(1) {
    display: flex;
    justify-content: center;
    height: 150px;

    > img {
      aspect-ratio: 4/3;
      border-top-left-radius: var(--br-m);
      border-top-right-radius: var(--br-m);
      width: 100%;
      padding: 5px;
      object-fit: cover;
      cursor: pointer;
    }
  }
  > div:nth-child(2) {
    height: 50px;
    font-size: 14px;
    clear: both;
    background-color: #ffffff;
    display: flex;
    padding-top: 5px;

    > div:nth-child(1) {
      width: 80%;
      height: 60px;
      display: flex;
      > img {
        height: 40px;
        width: 40px;
        background-image: cover;
        border-radius: 50%;
        margin: 0 10px;
        object-fit: cover;
      }
      > div {
      
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
      font-size: 13px;
      color: var(--black-900);
      padding: 0 10px 21px 0;
      > p {
        margin: 0 9px 0 6px;
        font-weight: var(--fw-bold);
      }
    }
  }
  > div:nth-child(3) {
    height: 20px;
    background-color: white;
    margin-left: 15px;
    margin-top: 3px;
    color: grey;
    font-weight: var(--fw-medium);
    font-size: 14px;
  }
  /* ::after {
    content: "";
    flex-grow: 0;
    width: 25%;
  } */
  svg.eye-icon {
    width: 17px;
    height: 17px;
  }
  svg.heart-icon {
    width: 15px;
    height: 15px;
    color: var(--pink-heart);
  }
`;

const PostCardComponent = ({
  posts,
  margin,
  width,
}: {
  posts: ArrayPostType;
  margin: string;
  width: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <PostContainer margin={margin}>
        {posts.map((post: any) => {
          return (
            <PostCard key={post.postId} width={width}>
              <div>
                <img
                  src={post.pictureUrl}
                  onClick={() => navigate(`/posts/detail/${post.postId}`)}
                  alt={post.attractionsTitle}
                ></img>
              </div>
              <div>
                <div>
                  <img src={post.memberPicture}></img>
                  <div>
                    <div>{post.username}</div>
                    <span>{post.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <div>
                  <EyeIcon className="eye-icon" />
                  <p>{post.views}</p>
                  <AiFillHeart className="heart-icon"></AiFillHeart>
                  <p>{post.likes}</p>
                </div>
              </div>
              <div onClick={() => navigate(`/posts/detail/${post.postId}`)}>
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
