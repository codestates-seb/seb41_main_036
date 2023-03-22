import { AiFillHeart, AiFillEye as EyeIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ArrayPostType } from "../../utils/d";
import * as poc from "./PostCardStyled";
import { useMediaQuery } from "react-responsive";

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
  const Mobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

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
                  {Mobile ? null : <img src={post.memberPicture}></img>}
                  <div>
                    <div style ={ Mobile ? {padding:"15px", fontSize: "16px"} : {padding: "0" }}>{post.username}</div>
                    {Mobile ? null : <span>{post.createdAt.slice(0, 10)}</span>}
                  </div>
                </div>
                {Mobile ? null :
                <div>
                  <EyeIcon className="eye-icon" />
                  <p>{post.views}</p>
                  <AiFillHeart className="heart-icon"></AiFillHeart>
                  <p>{post.likes}</p>
                </div>}
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
