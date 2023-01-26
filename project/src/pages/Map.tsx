import React from "react";
import styled from "styled-components";
import KakaoMap from "../components/KakaoMap";
import dummy from "../dummyData.json";
import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus, BsFillChatLeftFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
<<<<<<< HEAD
import '../index.css';

const Container = styled.div`
  display: flex;
<<<<<<< HEAD
  background-color: white;
`
=======
`;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======

const Container = styled.div`
  display: flex;
`;
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

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
<<<<<<< HEAD
<<<<<<< HEAD
    border-left: 0.5px solid var(--black-500);
    border-bottom: 0.5px solid var(--black-500);
    border-top: -0.9px solid var(--black-500);
    :hover{
=======
    border: 0.5px solid var(--black-500);
    :hover {
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
    border: 0.5px solid var(--black-500);
    :hover {
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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

  //뺄지말지 나중에 결정
  /* ::-webkit-scrollbar {
  display: none;
} */
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
    padding: 85px 0 0 20px;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }
  > p {
    padding: 5px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: white;
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
  height: 370px;
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
      width: 60px;
      height: 20px;
      margin: 15px 250px 0 20px;
      line-height: 20px;
      font-weight: 600;
      color: var(--black-700);
    }
    > div {
      // 개별 요소
      margin-top: 12px;
      margin-left: 3px;
      margin-right: 5px;
    }
    & p {
      font-size: 10px;
      margin-left: 3px;
      color: #373737;
    }
  }
  > div:nth-child(3) {
    display: flex;
    width: 200px;
    height: 30px;
    > h2 {
      margin-left: 15px;
      font-weight: 700;
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
  > p:nth-child(4) {
    color: #555555;
    font-size: 15px;
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
    }
  }

  > div:nth-child(6) {
    font-size: 15px;
    font-weight: bold;
    margin: 20px 0 0 17px;
    color: #555555;
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

const Map = () => {
  // 주소 더미 데이터
  var listData = [
    "종로구 사직로 161",
    "종로구 세종대로 198",
    "종로구 세종대로 209",
    "종로구 세종대로 175",
  ];

  // 이미지 더미데이터
  var imgUrl = [
    "https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production43/d333/469e9780-6653-4879-a396-cea7714fc209.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production90/d1936/e6925d65-cc4b-4605-8bd4-debb712fe764.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
<<<<<<< HEAD
<<<<<<< HEAD
    "https://a.cdn-hotels.com/gdcs/production167/d282/bf00d54a-0bb2-487e-8fbb-2ce495d3113b.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production41/d1748/0b5fab45-59f0-4574-8ac3-d19fb1778e2e.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    
  ]
=======
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    "https://a.cdn-hotels.com/gdcs/production34/d1467/24a50358-70c4-4f8e-8b0e-a87a4c3c9d6a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production83/d933/8daa96c3-245c-40be-a43a-e1d9c079dbf8.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production34/d1158/023da96d-32b2-4e9a-9f89-027267e196f2.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production182/d600/7e691c6c-5109-4a45-b280-48e435ccb002.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production92/d450/f9bebdad-1657-4f84-9441-97646651b5d5.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production52/d667/87129ebe-2cc7-42c6-bf31-32fbb06574eb.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://a.cdn-hotels.com/gdcs/production172/d698/73d6b117-c0d8-45d0-85c8-5fef62ad919b.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  ];
<<<<<<< HEAD
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

  // 드롭다운 메뉴를 보여줄지 말지 설정하는 변수
  const [dropdownView, setDropdownView] = useState(false);
  //현재 눌린 버튼의 값 설정
<<<<<<< HEAD
<<<<<<< HEAD
  const [regionFilter,setRegionFilter] = useState('전체')
=======
  const [regionFilter, setRegionFilter] = useState("강동구");
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
  const [regionFilter, setRegionFilter] = useState("강동구");
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  //우측 상세페이지 모달창 On/Off 설정
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {}, [regionFilter]);

  let Post = [
<<<<<<< HEAD
    { id: "0", Post: "전체" },
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    { id: "1", Post: "강남구" },
    { id: "2", Post: "강동구" },
    { id: "3", Post: "강북구" },
    { id: "4", Post: "강서구" },
    { id: "5", Post: "관악구" },
    { id: "6", Post: "광진구" },
    { id: "7", Post: "구로구" },
    { id: "8", Post: "금천구" },
    { id: "9", Post: "노원구" },
    { id: "10", Post: "도봉구" },
    { id: "11", Post: "동대문구" },
    { id: "12", Post: "동작구" },
    { id: "13", Post: "마포구" },
    { id: "14", Post: "서대문구" },
    { id: "15", Post: "서초구" },
    { id: "16", Post: "성동구" },
    { id: "17", Post: "성북구" },
    { id: "18", Post: "성송파구" },
    { id: "19", Post: "양천구" },
    { id: "20", Post: "영등포구" },
    { id: "21", Post: "용산구" },
    { id: "22", Post: "은평구" },
    { id: "23", Post: "종로구" },
    { id: "24", Post: "중구" },
    { id: "25", Post: "중량구" },
  ];

  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
    <HiddenHeader></HiddenHeader>
    <Container>
      <PlaceList>
        <DropDown>
          <button 
            onClick={()=>{setDropdownView(!dropdownView)}}>
            <div>{regionFilter}</div>
            <div><RiArrowDropDownLine size="30" color= "#6255F8"></RiArrowDropDownLine></div>
          </button>
          { dropdownView ? 
            <SelectList>
              {
                Post.map((el:any, index:number)=>{
                  return(
                    <button key={index} onClick={()=>{setRegionFilter(el.Post);setDropdownView(false); console.log(regionFilter)}}>{el.Post}</button>
                  )
                })
              }
            </SelectList>
          : null } 
        </DropDown>
        <PlaceComponent>
          {imgUrl.map((el, index)=>{
            return(
              <Place onClick={()=>{setDetailModal(!detailModal)}} imgUrl={el} key={index}>
                <div>종로</div>
                <p><FaMapMarkerAlt size="10"></FaMapMarkerAlt> 서울 종로구 세종로</p>
              </Place>
              )
            })
          }
        </PlaceComponent>
      </PlaceList>
      {detailModal ? 
        <PlaceDetailModal>
          <PlaceDetailModalHeader>
            <div> 
              <img src="https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"></img>
            </div>
            <div>
              <p>서울 명소</p>
              <div><AiOutlineHeart color="#969696"></AiOutlineHeart><p>32</p></div>
              <div><BsBookmarkPlus color="#969696"></BsBookmarkPlus><p>21</p></div>
            </div>
            <div>
              <h2>종로</h2>
              <a href="www.google.com">더보기</a>
            </div>
            <p>서울 종로구 사직로 161</p>
            <div>
              <div><BsFillChatLeftFill size="13"></BsFillChatLeftFill></div>
              <p> 32개의 리뷰</p>
            </div>
            <div>#야경 #야경이 아름다운 곳 </div>
            <span onClick={()=>setDetailModal(false)}>{'<<<'}</span>
          </PlaceDetailModalHeader>
          <PlaceDetailModalMain>
            <div>방문자 포토리뷰</div>
            <PostImgContainer>
              { imgUrl.map((el, index)=>{
                return(
                  <>
                   <img src={el} key={index} onClick={()=>{alert('테스트')}}></img>
                  </>
                  )
                })
              }
            </PostImgContainer>
          </PlaceDetailModalMain>
        </PlaceDetailModal> 
      : null}
      { detailModal ? 
        <KakaoMap 
          width="100%" 
          height="94vh" 
          dataList={listData} 
          position="absolute" 
          left="750px" 
          regionFilter = {regionFilter} 
          component = "map" 
          ></KakaoMap> 
          :

          <KakaoMap 
          width="100%" 
          height="94vh" 
          dataList={listData} 
          position="absolute" 
          left="350px" 
          regionFilter = {regionFilter} 
          component = "map"
          ></KakaoMap>
        }
    </Container>
=======
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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
                {Post.map((el: any, index: number) => {
                  return (
                    <button
                      key={index}
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
            {imgUrl.map((el, index) => {
              return (
                <Place
                  onClick={() => {
                    setDetailModal(!detailModal);
                  }}
                  imgUrl={el}
                  key={index}
                >
                  <div>종로</div>
                  <p>
                    <FaMapMarkerAlt size="10"></FaMapMarkerAlt> 서울 종로구
                    세종로
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
                <img src="https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"></img>
              </div>
              <div>
                <p>서울 명소</p>
                <div>
                  <AiOutlineHeart color="#969696"></AiOutlineHeart>
                  <p>32</p>
                </div>
                <div>
                  <BsBookmarkPlus color="#969696"></BsBookmarkPlus>
                  <p>21</p>
                </div>
              </div>
              <div>
                <h2>종로</h2>
                <a href="www.google.com">더보기</a>
              </div>
              <p>서울 종로구 사직로 161</p>
              <div>
                <div>
                  <BsFillChatLeftFill size="13"></BsFillChatLeftFill>
                </div>
                <p> 32개의 리뷰</p>
              </div>
              <div>#야경 #야경이 아름다운 곳 </div>
              <span onClick={() => setDetailModal(false)}>{"<<<"}</span>
            </PlaceDetailModalHeader>
            <PlaceDetailModalMain>
              <div>방문자 포토리뷰</div>
              <PostImgContainer>
                {imgUrl.map((el, index) => {
                  return (
                    <>
                      <img
                        src={el}
                        key={index}
                        onClick={() => {
                          alert("테스트");
                        }}
                      ></img>
                    </>
                  );
                })}
              </PostImgContainer>
            </PlaceDetailModalMain>
          </PlaceDetailModal>
        ) : null}
        {detailModal ? (
          <KakaoMap
            width="100%"
            height="94vh"
            dataList={listData}
            position="absolute"
            left="750px"
          ></KakaoMap>
        ) : (
          <KakaoMap
            width="100%"
            height="94vh"
            dataList={listData}
            position="absolute"
            left="350px"
          ></KakaoMap>
        )}
      </Container>
<<<<<<< HEAD
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    </>
  );
};

export default Map;
