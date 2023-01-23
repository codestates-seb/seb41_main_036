import styled from "styled-components";
import { BsEye} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai';
import {Pagination,Page} from "./PaginationComponent";
import { useState } from "react";


const PostContainer = styled.div`
  width: 80%;
  height: 600px;
  background-color:#f8f9fa;
  margin: 0 12%;
  display:flex;
  flex-wrap: wrap;
`;


const PostCard = styled.div`
  width: 22%;
  height: 230px;
  background-color: #ffffff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  }

  >div:nth-child(1){
    width: 100%;
    height: 150px;
    background-image:cover;
    >img{
      border-radius: 5px;
      margin: 5px;
      width: 97%;
      height: 150px;
      background-image:cover;
    }

  }
  >div:nth-child(2){
    width: 100%;
    height: 50px;
    font-size:14px;
    clear: both;
    background-color: #ffffff;
    display: flex;

    >div:nth-child(1){
      width: 80%;
      height: 60px;
      display: flex;
      >img{
        width: 40px;
        height: 40px;
        background-image: cover;
        border-radius: 50%;
        margin:10px 10px;
      }
      >div{
        margin-top: 10px;
        >div{
          color:#323232;
          font-weight: bold;
        }
        >span{
          font-size: 11px;
          color:grey;
        }
      }
    }
    >div:nth-child(2){
      display: flex;
      width: 90px;
      margin-top: 10px;
      font-size: 13px;
      color:grey;
      >p{
        margin: 0 10px 0 3px;
      }
    }

  }
  >div:nth-child(3){
    height: 20px;
    background-color: white;
    margin-left: 15px;
    margin-top: 5px;
    color:grey;
    font-weight: bold;
    font-size: 14px;
  }
`
type PostData = {
  createdAt:string|undefined, 
  likes:number|undefined,
  memberId:number|undefined,
  modifiedAt:string|undefined,
  picture:string|undefined,
  postId:number|undefined,
  postTitle:string|undefined,
  username:string|undefined,
  views:number|undefined
}


const PostBox = ({postData}:any) => {

  const [posts, setPosts] = useState([]); 
  const limit = 8; // 여기 조절해서 한 페이지당 게시물 수 바꿀 수 있습니다. 
  const [page, setPage] = useState(1); 
  const offset = (page - 1) * limit; 

  return(
    <>
      <PostContainer>
        {
          postData.map((el:any)=>{
            return(
              <PostCard key={el.postId}>
                <div><img src={el.picture}></img></div>
                <div>
                  <div>
                    <img src={el.picture}></img>
                      <div>
                        <div>{el.username}</div>
                        <span>{(el.createdAt).slice(0,10)}</span>
                      </div>
                    </div>
                  <div>
                    <BsEye></BsEye><p>{el.views}</p>
                    <AiFillHeart></AiFillHeart><p>{el.likes}</p>
                  </div>
                </div>
                <div>{el.postTitle}</div>
              </PostCard>
            )
          })
        }
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      <Page>
        <Pagination total={postData.length} limit={5} page={page} setPage={setPage}></Pagination>
      </Page>
      </PostContainer>
    </>
  )
}

export default PostBox;