import { AiFillHeart, AiFillEye as EyeIcon } from "react-icons/ai";
import { ArrayPostType } from "../../pages/Post/Post";
import { useNavigate } from "react-router-dom";
import * as poc from "./PostCardStyled";

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
      <poc.PostContainer margin={margin}>
        {posts.map((post: any) => {
          return (
            <poc.PostCard key={post.postId} width={width}>
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
            </poc.PostCard>
          );
        })}
      </poc.PostContainer>
    </>
  );
};

export default PostCardComponent;
