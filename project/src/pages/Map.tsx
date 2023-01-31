import styled from "styled-components";
import KakaoMap from "../components/KakaoMap";
import { regionDummy } from "../regionDummyData";
import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus, BsFillChatLeftFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
import "../index.css";
import axios from "../utils/axiosinstance";
import { GiTalk } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { LoginState } from "../recoil/state";
import { useRecoilState } from "recoil";

const Container = styled.div`
  display: flex;
  background-color: white;
  * {
    box-sizing: content-box !important;
  }
`;

const PlaceList = styled.div`
  width: 25%;
  height: 86vh;
  padding: 10px 0;
  box-sizing: content-box;
`;

const DropDown = styled.article`
  position: absolute;
  margin-left: 20px;
  box-sizing: content-box;
  > button {
    cursor: pointer;
    background-color: white;
    height: 40px;
    margin-left: 5px;
    padding-left: 10px;
    line-height: 40px;
    display: flex;
    border: 1px solid var(--black-600);
    border-radius: var(--br-s);
    > div:nth-child(1) {
      width: 150px;
      height: 40px;
      text-align: center;
      font-weight: bold;
      line-height: 40px;
      margin-left: 65px;
    }
    > div:nth-child(2) {
      margin-top: 4px;
      margin-left: 40px;
    }
  }
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 200px;
  margin-left: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  color: var(--black-750);
  position: relative;
  top: 0;
  border-collapse: collapse;
  ::-webkit-scrollbar {
    display: none;
  }
  > button {
    cursor: pointer;
    font-weight: 500;
    background-color: #ffffffe5;
    width: 300px;
    height: 40px;
    padding: 10px 0;
    border-left: 0.5px solid var(--black-500);
    border-bottom: 0.5px solid var(--black-500);
    border-top: -0.9px solid var(--black-500);
    :hover {
      color: var(--purple-400);
      background-color: white;
      font-weight: bold;
    }
  }
`;

const PlaceComponent = styled.div`
  margin-top: 50px;
  width: 310px;
  height: 88vh;
  margin-left: 26px;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
`;
const Place = styled.div<{ imgUrl: string }>`
  background-color: skyblue;
  width: 294px;
  height: 140px;
  margin-left: -1px;
  margin-bottom: 5px;
  border-radius: var(--br-s);
  cursor: pointer;
  border: 1px solid var(--black-600);
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.8) 10%,
      rgba(20, 20, 20, 0.7) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.35) 75%,
      rgba(20, 20, 20, 0.25) 100%
    ),
    url(${(props) => props.imgUrl});
  background-size: cover;
  > div {
    padding: 85px 0 2px 20px;
    font-weight: bold;
    font-size: 18px;
    color: white;
  }
  > p {
    padding: 5px 0 0 15px;
    font-weight: bold;
    font-size: 11px;
    color: white;
    margin-bottom: 15px;
  }
`;

const PlaceDetailModal = styled.div`
  position: absolute;
  left: 350px;
  width: 400px;
  height: 90vh;
  border-right: 7px solid #e4dcdc;
  border-left: 1px solid #e4dcdc;
`;

const PlaceDetailModalHeader = styled.div`
  box-sizing: content-box;
  > div:nth-child(1) {
    width: 100%;
    height: 200px;
    > img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }
  > div:nth-child(2) {
    display: flex;
    > p:nth-child(1) {
      font-size: 14px;
      margin: 15px 265px 0 20px;
      line-height: 20px;
      font-weight: 600;
      color: var(--black-700);
    }
    > div {
      cursor: pointer;
      margin-top: 13px;
      margin-right: 11px;
    }
    & p {
      font-size: 10px;
      margin-left: 5px;
      color: #373737;
    }
  }
  > div:nth-child(3) {
    box-sizing: content-box;
    display: flex;
    width: 325px;
    height: 30px;
    > h2 {
      background-color: #fbf8ba;
      margin-left: 20px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    > a {
      font-size: 13px;
      margin-left: 10px;
      line-height: 30px;
      text-decoration: none;
      color: var(--purple-400);
      font-weight: 600;
    }
  }
  > div:nth-child(5) {
    display: flex;
    color: #919191;
    font-weight: bold;
    margin: 10px 0 0 20px;
    > div {
      margin-right: 3px;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }
  > p:nth-child(4) {
    box-sizing: content-box;
    color: #555555;
    font-size: 14px;
    margin: 4px 0 0 20px;
    font-weight: 600;
  }
  > div {
    margin-right: 5px;
  }
  & p {
    font-size: 10px;
    margin-left: 5px;
    color: #373737;
  }
  > div:nth-child(5) {
    box-sizing: content-box;
    display: flex;
    color: #919191;
    font-weight: bold;
    margin: 8px 0 0 20px;
    > div {
      margin-right: 3px;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }
  > div:nth-child(6) {
    box-sizing: content-box;
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0 15px 20px;
    color: #0b113f87;
  }
  > span {
    color: #555555;
    margin-left: 350px;
    position: absolute;
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

const PlaceDetailModalMain = styled.div`
  width: 100%;
  height: 485px;
  border-top: 1px solid #e4dcdc;
  > div:nth-child(1) {
    box-sizing: content-box;
    font-size: 15px;
    font-weight: 700;
    margin: 17px 0 17px 20px;
    color: #393939;
  }
`;

const PostImgContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  overflow: auto;
  height: 35vh;
  > img {
    width: 48%;
    height: 110px;
    height: 110px;
    margin: 0 2px;
  }
`;

const PostNone = styled.div`
  padding: 10px;
  width: 300px;
  height: 100px;
  font-size: 13px;
  color: grey;
  display: flex;
  > div {
    margin-right: 5px;
  }
`;

const Map = () => {
  const [dropdownView, setDropdownView] = useState(false);
  const [regionFilter, setRegionFilter] = useState("전체");
  const [detailModal, setDetailModal] = useState(false);
  const [regionList, setRegionList] = useState<any>(undefined);
  const [modalData, setModalData] = useState<any>("");
  const [modalDataId, setModalDataId] = useState<number>(1);
  const [wholeData, setWholeData] = useState<any>();
  const navigate = useNavigate();

  const tags = [
    "#가족 여행지",
    "#야경이 아름다운 곳",
    "#여름 여행지",
    "#체험 학습",
    "#겨울 여행 추천",
    "#야경이 아름다운 곳",
    "#가을 여행지",
    "#친구와 방문하기 좋은 곳",
    "#연인과 함께",
    "#가을에 방문하기 좋은 곳",
    "#테마 거리",
  ];


  const url = "/attractions/maps?page=1&size=99&sort=posts";
  const [filterOrPosition, setFilterOrPosition] = useState<any>(false);
  const url2 = `/attractions/${modalDataId}`;
  const memberId = localStorage.getItem("memberId");
  const url3 = `/attractions/${modalDataId}/${memberId}`;
  const [isLogin] = useRecoilState(LoginState);
  const [isVoted,setIsVoted] = useState();
  const [isLiked,setIsLiked] = useState();
  const URL_FOR_SAVES = `/attractions/saves/${modalDataId}`;
  const URL_FOR_LIKES = `/attractions/likes/${modalDataId}`;
  const ATTRACTIONS_URL = isLogin ? url3 : url2;

  const handleClickLiked = () => {
    axios.post(URL_FOR_LIKES).then((res) => {
      setIsVoted(res.data.data.isVoted);
    });    
  }

  const handleClickSaved = () => {
    axios.post(URL_FOR_SAVES).then((res) => {
      setIsLiked(res.data.data.isSaved);
    });
  }

  useEffect(() => {

    axios.get(ATTRACTIONS_URL)
    .then((res)=>{
      setIsVoted(res.data.data.isVoted)
      setIsLiked(res.data.data.isSaved)
    })

    if (regionFilter === "전체") {
      axios
        .post(url, {
          provinces: [],
        })
        .then((res) => {
          setRegionList(res.data.data);
          setWholeData(res.data.data);
        });
    } else {
      axios
        .post(url, {
          provinces: [regionFilter],
        })
        .then((res) => {
          setRegionList(res.data.data);
        });
    }
  }, [regionFilter, setDropdownView, modalData, ATTRACTIONS_URL]);

  const handleModalData = (dataUrl: string|number) => {
    axios.get(`/attractions/mapdetails/${dataUrl}`).then((res) => {
      setModalData(res.data.data);
    });
  };

  return (
    <>
      <HiddenHeader></HiddenHeader>
      <Container>
        <PlaceList>
          <DropDown>
            <button
              onClick={() => {
                setDropdownView(!dropdownView);
              }}
            >
              <div>{regionFilter}</div>
              <div>
                <RiArrowDropDownLine
                  size="30"
                  color="#6255F8"
                ></RiArrowDropDownLine>
              </div>
            </button>
            {dropdownView ? (
              <SelectList>
                {regionDummy.map((el: any, index: number) => {
                  return (
                    <button
                      key={el.id}
                      onClick={() => {
                        setRegionFilter(el.Post);
                        setDropdownView(false);
                      }}
                    >
                      {el.Post}
                    </button>
                  );
                })}
              </SelectList>
            ) : null}
          </DropDown>
          <PlaceComponent>
            {regionList !== undefined &&
              regionList.map((el: any, index: any) => {
                return (
                  <Place
                    onClick={() => {
                      setDetailModal(true);
                      handleModalData(el.attractionId);
                      setModalDataId(el.attractionId);
                      setFilterOrPosition(false);
                    }}
                    imgUrl={el.fixedImage}
                    key={el.attractionId}
                  >
                    <div>{el.attractionName}</div>
                    <p>
                      <FaMapMarkerAlt size="10"></FaMapMarkerAlt>
                      {el.attractionAddress}
                    </p>
                  </Place>
                );
              })}
          </PlaceComponent>
        </PlaceList>
        {detailModal ? (
          <PlaceDetailModal>
            <PlaceDetailModalHeader>
              <div>
                <img src={modalData.fixedImage}></img>
              </div>
              <div>
                <p>서울 명소</p>
                <div onClick={()=>handleClickLiked()}>
                  <AiOutlineHeart 
                    color={
                      isVoted === true ? "var(--pink-heart)" : "var(--black-400)"
                    }
                    ></AiOutlineHeart>
                  <p>{ modalData.likes }</p>
                </div>
                <div onClick={()=>{handleClickSaved()}}>
                  <BsBookmarkPlus 
                    color={isLiked ? "green" : "var(--black-400)"}
                    ></BsBookmarkPlus>
                  <p>{modalData.saves}</p>
                </div>
              </div>
              <div>
                <h2>{modalData.attractionName}</h2>
                <a href={"/attractions/detail/" + modalData.attractionId}>
                  더보기
                </a>
              </div>
              <p>{modalData.attractionAddress}</p>
              <div>
                <div>
                  <BsFillChatLeftFill size="13"></BsFillChatLeftFill>
                </div>
                <p>{modalData && modalData.numOfPosts}개의 리뷰</p>
              </div>
              <div>
                {tags[modalData.attractionId % tags.length]}{" "}
                {tags[(modalData.attractionId - 1) % tags.length]}{" "}
              </div>
              <span onClick={() => setDetailModal(false)}>{"<<<"}</span>
            </PlaceDetailModalHeader>
            <PlaceDetailModalMain>
              <div>방문자 포토리뷰</div>
              <PostImgContainer>
                {modalData.numOfPosts > 1 ? (
                  modalData.postIdAndUrls.map((el: any, index: any) => {
                    return (
                      <>
                        <img
                          src={el.imageUrls}
                          key={index}
                          onClick={() => {
                            navigate(`/posts/detail/${el.postId}`);
                          }}
                        ></img>
                      </>
                    );
                  })
                ) : (
                  <PostNone>
                    <div>
                      <GiTalk size="19"></GiTalk>
                    </div>
                    등록된 포토리뷰가 없습니다.
                  </PostNone>
                )}
              </PostImgContainer>
            </PlaceDetailModalMain>
          </PlaceDetailModal>
        ) : null}
        {detailModal ? (
          <KakaoMap
            width="71%"
            height="94vh"
            dataList={regionList}
            position="absolute"
            left="750px"
            regionFilter={regionFilter}
            component="map"
            dataset={wholeData}
            modalData={modalData}
            filterOrPosition={filterOrPosition}
            setFilterOrPosition={setFilterOrPosition}
          ></KakaoMap>
        ) : (
          <KakaoMap
            width="100%"
            height="94vh"
            dataList={regionList}
            position="absolute"
            left="350px"
            regionFilter={regionFilter}
            component="map"
            dataset={wholeData}
            modalData={modalData}
            filterOrPosition={filterOrPosition}
            setFilterOrPosition={setFilterOrPosition}
          ></KakaoMap>
        )}
      </Container>
    </>
  );
};

export default Map;