import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Map {
  width: string;
  height: string;
  dataList: DataList | undefined | string;
  position: any;
  left: string;
  regionFilter: string;
  component: string;
  dataset: any;
  modalData: any;
  filterOrPosition: any;
  setFilterOrPosition: any;
}

export interface DataList {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
  fixedImage: string;
}

const MyPosition = styled.div`
  width: 109px;
  height: 40px;
  background-color:var(--purple-400);
  z-index: 2;
  position: absolute;
  margin: 45px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 10px;
  color: white;
  border-radius: var(--br-m);
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: rgb(77, 20, 126);
    cursor: pointer;
  }
`;

const TrafficInfo = styled.div`
  width: 109px;
  height: 40px;
  background-color: rgb(42, 41, 40);
  z-index: 2;
  position: absolute;
  margin: 90px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 10px;
  color: #f2f2f2;
  border-radius: var(--br-m);
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;

const KakaoMap = ({
  width,
  height,
  dataList,
  position,
  left,
  component,
  dataset,
  modalData,
  filterOrPosition,
  setFilterOrPosition,
}: Map) => {
  const container = useRef<any>();
  const [traffic, setTraffic] = useState(false);

  const options = {
    center: new window.kakao.maps.LatLng(37.5575265973614, 127.175938009116),
    level: 5,
  };

  const conditionPlace = (geocoder:any, map:any) => {
    geocoder.addressSearch(dataList, function(result:any, status:any) {
      if (status === window.kakao.maps.services.Status.OK) {    
         var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
         var marker = new window.kakao.maps.Marker({
             map: map,
             position: coords
         });
         map.setCenter(coords);
     } 
    });    
  }

  const conditionMap = (geocoder: any, map: any) => {

    if(traffic){
      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);  
    }

    if (filterOrPosition === true) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude, 
              lon = position.coords.longitude; 
            var locPosition = new window.kakao.maps.LatLng(lat, lon) 
            map.setCenter(locPosition);
            });
          }
      
           
        dataset.forEach(function(addr:any,index:number){
          geocoder.addressSearch(addr.attractionAddress, function(result:any, status:any) {
             if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                var marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                });
                  

                var infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div 
                    style="
                      width:180px;
                      height:110px;
                      background-color:white;
                      padding:5px 5px;
                      border:none;
                      position:relative;
                      left:-1px;
                      text-align:center;
                      top:-1px;
                      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
                      border-radius:2px">
                  <h3 
                    style="
                    color:#6255F8; 
                    width:100%;
                    height:30px;
                    background-color:#faf7df;
                    line-height:30px">
                    ${addr.attractionName}
                  </h3>
                  <h3 style="
                    font-size:12px;
                    color:#515151;
                    font-weight:500;
                    padding:8px 0">
                    ${addr.attractionAddress}
                    </h3>
                  <a href="/attractions/detail/${addr.attractionId}" 
                    style="
                      font-size:11px;
                      text-decoration-line:none;
                      font-weight:600;
                      margin-left:130px">
                    더보기
                  </a>
                </div>`,
                disableAutoPan: true,
              });
              infowindow.open(map, marker);
            }
          }
        );
      });
    } else {
      if (modalData) {
        geocoder.addressSearch(
          modalData.attractionAddress,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              var placePosition = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              var marker = new window.kakao.maps.Marker({
                map: map,
                position: placePosition,
              });

              var infowindow = new window.kakao.maps.InfoWindow({
                content: `<div 
                      style="
                        width:180px;
                        height:110px;
                        background-color:white;
                        padding:5px 5px;
                        border:none;
                        position:relative;
                        left:-1px;
                        text-align:center;
                        top:-1px;
                        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
                        border-radius:2px">
                    <h3 
                      style="
                      color:#6255F8; 
                      width:100%;
                      height:30px;
                      background-color:#faf7df;
                      line-height:30px">
                      ${modalData.attractionName}
                    </h3>
                    <h3 style="
                      font-size:12px;
                      color:#515151;
                      font-weight:500;
                      padding:8px 0">
                      ${modalData.attractionAddress}
                      </h3>
                    <a href="/attractions/detail/${modalData.attractionId}" 
                      style="
                        font-size:11px;
                        text-decoration-line:none;
                        font-weight:600;
                        margin-left:130px">
                      더보기
                    </a>
                  </div>`,
                disableAutoPan: false,
              });

              infowindow.open(map, marker);
              map.panTo(placePosition);
              map.relayout();
            }
          }
        );
      }
    }
  };

  useEffect(() => {
    const map = new window.kakao.maps.Map(container.current, options);
    var geocoder = new window.kakao.maps.services.Geocoder();

    if (component === "map") {
      conditionMap(geocoder, map);
    }

    if (component === "place") {
      conditionPlace(geocoder, map);
    }

    var mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT);
  }, [filterOrPosition, dataset === undefined, modalData, traffic]);

  return (
    <>
      <div
        ref={container}
        id="map"
        style={{
          width: width,
          height: height,
          position: position,
          left: left,
          border: "1px solid white",
        }}
      >
        {component === "map" ? (
          <>
          <TrafficInfo onClick={()=> {setTraffic(!traffic)}}>{traffic ? "교통 정보 OFF" : "교통 정보"}</TrafficInfo>
          <MyPosition
            onClick={() => {
              setFilterOrPosition(!filterOrPosition);
            }}
          >
            {filterOrPosition ? "실시간 위치 OFF" : "실시간 위치"}
          </MyPosition>
          </>
        ) : null}
      </div>
    </>
  );
};
export default KakaoMap;
