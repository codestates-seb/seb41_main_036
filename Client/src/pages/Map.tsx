import React from "react";
import KakaoMap from "../components/KakaoMap";
import { regionDummy } from "../data/regionData";
import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus, BsFillChatLeftFill } from "react-icons/bs";
import HiddenHeader from "../components/Header/HiddenHeader";
import "../index.css";
import tags from "../data/tagData";
import axios from "../utils/axiosinstance";
import { GiTalk } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { LoginState } from "../recoil/state";
import { useRecoilState } from "recoil";
import Modal from "../components/Modal";
import { useMediaQuery } from "react-responsive";
import * as m from './Map/Map';
import MobileHeaderBack from "../components/Header/MobileHeaderBack";
import { MenuSideBar, MenuButton } from "./MainResponsive";
import {Link} from 'react-router-dom';

  interface RegionType {
    attractionAddress:string, 
    attractionId:number,
    attractionName:string,
    fixedImage:string
  }

  interface ModalDataType {
    attractionAddress:string, 
    attractionId:number,
    attractionName:string, 
    fixedImage:string|undefined, 
    isSaved:boolean,
    isVoted:boolean,
    likes:number,
    numOfPosts:number,
    postIdAndUrls: string|number[]
  }

  interface RegionDummyType {
    Post:string
  }

const Map = () => {

  const Mobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [dropdownView, setDropdownView] = useState<boolean>(false);
  const [regionFilter, setRegionFilter] = useState("전체");
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [regionList, setRegionList] = useState<any>(undefined);
  const [modalData, setModalData] = useState<any>("");
  const [modalDataId, setModalDataId] = useState<number>(1);
  const [wholeData, setWholeData] = useState<any>();
  const navigate = useNavigate();
  const [filterOrPosition, setFilterOrPosition] = useState<boolean>(false);
  const [isLogin] = useRecoilState(LoginState);
  const [isVoted, setIsVoted] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const memberId = localStorage.getItem("memberId");
  const url = "/attractions/maps?page=1&size=104&sort=posts";
  const url2 = `/attractions/${modalDataId}`;
  const url3 = `/attractions/${modalDataId}/${memberId}`;
  const URL_FOR_SAVES = `/attractions/saves/${modalDataId}`;
  const URL_FOR_LIKES = `/attractions/likes/${modalDataId}`;
  const ATTRACTIONS_URL = isLogin ? url3 : url2;

  const handleClickLiked = () => {
    if(isLogin){
      axios.post(URL_FOR_LIKES).then((res) => {
        setIsVoted(res.data.data.isVoted);
        return;
      }); 
    }else{
      setIsModalVisible(true);
    }
  }

  const handleClickSaved = () => {
    if(isLogin){
      axios.post(URL_FOR_SAVES).then((res) => {
        setIsLiked(res.data.data.isSaved);
        return;
      });
    }else{
      setIsModalVisible(true)
    }
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

  const handleModalData = (dataUrl: string | number) => {
    axios.get(`/attractions/mapdetails/${dataUrl}`).then((res) => {
      setModalData(res.data.data);
    });
  };

  const [isNavbarChecked, setIsNavbarChecked] = useState<boolean>(false);


  return (
    <>
      {isModalVisible && 
      <Modal setIsModalVisible={setIsModalVisible} />}
      {Mobile? <MobileHeaderBack
            isNavbarChecked={isNavbarChecked}
            setIsNavbarChecked={setIsNavbarChecked}
            ></MobileHeaderBack>:<HiddenHeader></HiddenHeader> }
              {isNavbarChecked ? 
          <MenuSideBar>
            <Link to='/attractions'><MenuButton>명소</MenuButton></Link>
            <Link to='/posts'><MenuButton>포스트</MenuButton></Link>
            <Link to='/map'><MenuButton>내 주변 명소찾기</MenuButton></Link>
          </MenuSideBar> : null}
      

      <m.Container>
        {Mobile ? null :<m.PlaceList>
          <m.DropDown>
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
              <m.SelectList>
                {regionDummy.map((el: RegionDummyType, index: number) => {
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
              </m.SelectList>
            ) : null}
          </m.DropDown>
          <m.PlaceComponent>
            {regionList !== undefined &&
              regionList.map((el: RegionType , index: number) => {
                return (
                  <m.Place
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
                  </m.Place>
                );
              })}
          </m.PlaceComponent>
        </m.PlaceList>}



        {Mobile ? 
          null :
          detailModal ?
        (
          <m.PlaceDetailModal>
            <m.PlaceDetailModalHeader>
              <div>
                <img src={modalData.fixedImage} alt={'modalImg'}></img>
              </div>
              <div>
                <p>서울 명소</p>
                <div onClick={handleClickLiked}>
                  <AiOutlineHeart
                    color={
                      isVoted === true
                        ? "var(--pink-heart)"
                        : "var(--black-400)"
                    }
                    ></AiOutlineHeart>
                  {/* <p>{ modalData.likes }</p> */}
                </div>
                <div onClick={handleClickSaved}>
                  <BsBookmarkPlus 
                    color={isLiked ? "green" : "var(--black-400)"}
                    ></BsBookmarkPlus>
                  {/* <p>{modalData.saves}</p> */}
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
            </m.PlaceDetailModalHeader>
            <m.PlaceDetailModalMain>
              <div>방문자 포토리뷰</div>
              <m.PostImgContainer>
                {modalData.numOfPosts > 1 ? (
                  modalData.postIdAndUrls.map((el: any, index: number) => {
                    return (
                      <>
                        <img
                          src={el.imageUrls}
                          key={index}
                          alt={'Img'}
                          onClick={() => {
                            navigate(`/posts/detail/${el.postId}`);
                          }}
                        ></img>
                      </>
                    );
                  })
                ) : (
                  <m.PostNone>
                    <div>
                      <GiTalk size="19"></GiTalk>
                    </div>
                    등록된 포토리뷰가 없습니다.
                  </m.PostNone>
                )}
              </m.PostImgContainer>
            </m.PlaceDetailModalMain>
          </m.PlaceDetailModal>
        ) : null}



        {
          Mobile? 
          <KakaoMap
            width="100%"
            height="100vh"
            dataList={regionList}
            position="absolute"
            left="0"
            regionFilter={regionFilter}
            component="map"
            dataset={wholeData}
            modalData={modalData}
            filterOrPosition={filterOrPosition}
            setFilterOrPosition={setFilterOrPosition}
          ></KakaoMap>
          
            : detailModal ?
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
          ></KakaoMap> : 
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
        }




      </m.Container>
      
    </>
  );
};

export default Map;