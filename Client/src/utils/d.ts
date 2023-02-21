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