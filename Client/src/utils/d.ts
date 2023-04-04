//Place

export interface PlaceType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
  isSaved: boolean;
  isVoted: boolean;
}

export interface PageInfoType {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PageSessionType {
  curPage: number;
  sort: number;
  checkedList: string[];
}

export interface ArrayPlaceType extends Array<PlaceType> {}

//Post

export interface PostType {
  postId: number;
  postTitle: string;
  memberId: number;
  username: string;
  picture: string | string[];
  createdAt: string;
  likes: number;
  modifiedAt: number;
  views: number;
}

export interface ArrayPostType extends Array<PostType> {}

//MyPage

export interface UserType {
  memberId: number;
  username: string;
  memberTitle: null;
  phoneNumber: string;
  address: string;
  picture: string;
  email: string;
  totalMyPosts: number;
  totalMySaves: number;
  posts:
    | [
        {
          postId: number;
          postTitle: string;
          pictureUrl: string;
          views: number;
          likes: number;
          createdAt: string;
          modifiedAt: string;
        }
      ];
  saves:
    | {
        attractionId: number;
        attractionName: string;
        fixedImage: string;
        likes: number;
        saves: number;
      }[];
  createdAt: string;
  modifiedAt: string;
}

export interface MyPostsType {
  postId: number;
  postTitle: string;
  pictureUrl: string;
  views: number;
  likes: number;
  createdAt: string;
  modifiedAt: string;
}

export interface MySavesType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  saves: number;
}
export interface ArrayMyPostsType extends Array<MyPostsType> {}
export interface ArrayMySavesType extends Array<MySavesType> {}

export interface PostDetailType {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
  memberId: number;
  commentCount: number;
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
  parentId: number;
  memberId: number;
  username: string;
  memberPicture: string;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
  children: [];
}
export interface ArrayCommentType extends Array<CommentType> {}

export interface ReCommentType {
  children: [];
  commentContent: string;
  commentId: number;
  createdAt: string;
  memberId: number;
  memberPicture: string;
  modifiedAt: string;
  parentId: number;
  status: string;
  username: string;
}

// DetailPost

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
