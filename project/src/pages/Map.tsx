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
import axios from "axios";
import { DataList } from "../components/KakaoMap";
import { GiTalk } from "react-icons/gi";

const Container = styled.div`
  display: flex;
  background-color: white;
`;

const PlaceList = styled.div`
  width: 25%;
  height: 86vh;
  padding: 10px 0;
`;

const DropDown = styled.article`
  position: absolute;
  margin-left: 20px;
  > button {
    cursor: pointer;
    background-color: white;
    width: 310px;
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
  overflow-y: scroll;
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
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
`
const Place = styled.div<{imgUrl:string}>`
    background-color: skyblue;
    width: 294px;
    height: 140px;
    margin-left: -1px;
    margin-bottom: 5px;
    border-radius: var(--br-s);
    cursor: pointer;
    border:1px solid var(--black-600);
    
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.8) 10%,
            rgba(20, 20, 20, .7) 25%,
            rgba(20, 20, 20, 0.5) 50%,
            rgba(20, 20, 20, 0.35) 75%,
            rgba(20, 20, 20, 0.25) 100%
      ), url(${props => props.imgUrl});
    background-size: cover;

    >div{
      padding:85px 0 2px 20px;
      font-weight: bold;
      font-size: 18px;
      color:white;
    }
    >p{
      padding:5px 0 0 20px;
      font-weight: bold;
      font-size: 12px;
      color:white;
    }
`

const PlaceDetailModal = styled.div`
  position: absolute;
  left: 350px;
  width: 400px;
  height: 90vh;
  border-right: 7px solid #e4dcdc;
  border-left: 1px solid #e4dcdc;
`;

const PlaceDetailModalHeader = styled.div`
  height: 370px;
  > div:nth-child(1) {
    width: 100%;
    height: 200px;
    > img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    >div:nth-child(2){ 
      display: flex;
      >p:nth-child(1){
        font-size: 14px;
        width: 60px;
        height: 20px;
        margin: 15px 250px 0 20px;
        line-height: 20px;
        font-weight: 600;
        color:var(--black-700);
      }
      >div{ // 개별 요소
        margin-top: 12px;
        margin-left: 3px;
        margin-right: 5px;
      }
      & p{
        font-size: 10px;
        margin-left: 5px;
        color:#373737;
      }
    }
    >div:nth-child(3){
      display: flex;
      width: 325px;
      height: 30px;
      >h2{
        //width:250px;
        background-color: #fbf8ba;
        margin-left: 15px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      >a{
        font-size: 13px;
        margin-left: 10px;
        line-height: 30px;
        text-decoration: none;
        color:var(--purple-400);
        font-weight: 600;
      }
    }
    >p:nth-child(4){
      color:#555555;
      font-size: 14px;
      margin: 4px 0 0 15px;
      font-weight: 600;
    }

    >div:nth-child(5){
      display: flex;
      color:#919191;
      font-weight: bold;
      margin: 8px 0 0 17px;
      >div{
        margin-right: 3px;
      }
      >p{
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  > p:nth-child(4) {
    color: #555555;
    font-size: 14px;
    margin: 4px 0 0 15px;
    font-weight: 600;
  }

  > div:nth-child(5) {
    display: flex;
    color: #919191;
    font-weight: bold;
    margin: 8px 0 0 17px;
    > div {
      margin-right: 3px;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }

  > div:nth-child(6) {
    font-size: 15px;
    font-weight: bold;
    margin: 20px 0 0 17px;
    color: #2e3776;
  }
  > span {
    color: #555555;
    margin-left: 350px;
    cursor: pointer;
  }
`;

const PlaceDetailModalMain = styled.div`
  width: 100%;
  height: 485px;
  border-top: 1px solid #e4dcdc;

  > div:nth-child(1) {
    font-size: 15px;
    font-weight: 700;
    margin: 25px 0 10px 20px;
    color: #393939;
  }
`;

const PostImgContainer = styled.div`
  width: 90%;
  height: 430px;
  margin: 0 auto;
  overflow: scroll;

  > img {
    width: 48%;
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
  //background-color:red;
`;

const Map = () => {
  // 드롭다운 메뉴를 보여줄지 말지 설정하는 변수
  const [dropdownView, setDropdownView] = useState(false);
  //현재 눌린 버튼의 값 설정
  const [regionFilter, setRegionFilter] = useState("전체");
  //우측 상세페이지 모달창 On/Off 설정
  const [detailModal, setDetailModal] = useState(false);

  // 현재 필터링된 데이터 목록
  const [regionList, setRegionList] = useState<any>(undefined);

  // 현재 눌린 명소의 값을 저장
  const [modalData, setModalData] = useState<any>("");

  // 현재 눌린 명소의 아이디를 저장
  const [modalDataId, setModalDataId] = useState<number>(1);

  // 카카오맵에 전체 마커로 찍을 데이터 저장용
  const [wholeData, setWholeData] = useState<any>();

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

  const url =
    "http://pikcha36.o-r.kr:8080/attractions/maps?page=1&size=100&sort=posts";
  //const url2 = 'http://pikcha36.o-r.kr:8080/attractions/mapdetails/1';
  const [filterOrPosition, setFilterOrPosition] = useState<any>(false);

  useEffect(() => {
    // 처음에 무조건 데이터를 받아옴
    // 그리고 요청 값 바뀔 때마다 다른 데이터를 불러와야함.

    // 필터링용 데이터 받아오기
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
          console.log("요청중..");
        });
    }

    console.log("전체 데이터----", wholeData);
    console.log("전체 데이터----", regionList);
  }, [regionFilter, setDropdownView]);

  const handleModalData = (dataUrl: string) => {
    // 모달창 데이터 받아오기
    axios
      .get(`http://pikcha36.o-r.kr:8080/attractions/mapdetails/${dataUrl}`)
      .then((res) => {
        setModalData(res.data.data);
        console.log("모달데이터", modalData);
      });
    // 받아온 데이터를 모달창에 뿌리기
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
                        console.log(regionFilter);
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
                      console.log("모달 데이터 아이디", modalDataId);
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
                <div>
                  <AiOutlineHeart color="#969696"></AiOutlineHeart>
                  <p>{modalData.likes}</p>
                </div>
                <div>
                  <BsBookmarkPlus color="#969696"></BsBookmarkPlus>
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
                            alert("테스트");
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
            width="100%"
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
