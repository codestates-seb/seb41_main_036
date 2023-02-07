import { useEffect, useState, useRef } from "react";
import LocationFilter from "../../components/LocationFilter";
import { Header } from "../../components/Header";
import PostCardComponent from "../../components/PostCard/PostCardComponent";
import axios from "../../utils/axiosinstance";
import Pagination from "../../components/Pagination";
import { PageInfoType } from "../Place/Place";
import Footer from "../../components/Footer";
import EmptyResult from "../../components/EmptyResult";
import * as po from "./PostStyled";
const ITEM_LIMIT = 9;

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

const sortList: { kor: string; eng: string }[] = [
  {
    kor: "최신순",
    eng: "newest",
  },
  {
    kor: "인기순",
    eng: "likes",
  },
  {
    kor: "조회순",
    eng: "views",
  },
];

export interface ArrayPostType extends Array<PostType> {}
const Post = () => {
  const [postsData, setPostsData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [onFilter, setOnFliter] = useState(0);
  const [sort, setSort] = useState("newest");
  const totalInfoRef = useRef<PageInfoType | null>(null);
  useEffect(() => {
    axios
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
        totalInfoRef.current = res.data.pageInfo;
      })
      .catch((err) => console.error(err));
  }, [curPage, checkedList]);

  const handleSortPlace = (sort: string) => {
    setSort(sort);
    axios
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  const handleSort = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <>
      <div style={{ display: "fixed" }}>
        <Header>
          <Header.HeaderTop />
          <Header.HeaderBody selectedMenu={1} backgroundOn={false} />
        </Header>
      </div>
      <po.PostWrapper>
        <po.LocationWrapper>
          {postsData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </po.LocationWrapper>
        <po.PostContainer>
          <po.PostFilterContainer>
            <span>총 {totalInfoRef.current?.totalElements}개의 포스트</span>
            <div>
              {sortList.map((sort, idx) => (
                <po.FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSort(idx);
                    handleSortPlace(sort.eng);
                  }}
                >
                  {sort.kor}
                </po.FilterButton>
              ))}
            </div>
          </po.PostFilterContainer>
          <po.PostCardContainer>
            {postsData && (
              <PostCardComponent posts={postsData} margin="0" width="32.2%" />
            )}
          </po.PostCardContainer>
          {!!postsData?.length ? (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            ></Pagination>
          ) : (
            <EmptyResult message="등록된 포스트가 없습니다" />
          )}
        </po.PostContainer>
      </po.PostWrapper>
      <Footer />
    </>
  );
};

export default Post;
