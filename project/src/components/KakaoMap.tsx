import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

// 주소 더미 데이터
var listData = [
  "종로구 사직로 161",
  "종로구 세종대로 198",
  "종로구 세종대로 209",
  "종로구 세종대로 175",
];

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
  background-color: rgb(37, 143, 255);
  z-index: 2;
  position: absolute;
  margin: 45px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 3px;
  color: white;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: rgb(17, 90, 169);
    cursor: pointer;
  }
`

const KakaoMap = ({width, height, dataList, position, left, regionFilter, component, dataset, modalData ,filterOrPosition, setFilterOrPosition}:Map) =>{

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 dom영역

    // center에 위도, 경도 좌표를 설정
    const options = {
      // center에 위도, 경도 좌표를 설정 
      center: new window.kakao.maps.LatLng(37.573898277022,126.9731314753), // 지도의 중심 좌표
      level:5 // 확대되어 보여지는 레벨  설정 
    };

    // 기본 주소 객체 생성
    const map = new window.kakao.maps.Map(container, options);
    var geocoder = new window.kakao.maps.services.Geocoder();
    
    // map 페이지에서 사용 
    if (component === 'map'){


      // 내 위치 찾는거 누르면?
      if(filterOrPosition === true){

        // 내위치 받아오기 예제
        if (navigator.geolocation) {
          console.log('내 위치를 받아오기')

          // 주변 데이터 보여주기 위해서 값 불러오기 
          console.log('리스트 데이터',dataset)

          // 내 위치먼저 불러온 다음에 
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
    
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
              var locPosition = new window.kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              map.setCenter(locPosition);
          });
          } 

           // 근처 렌더링된 데이터 보여주기        
          dataset.forEach(function(addr:any,index:number){
            geocoder.addressSearch(addr.attractionAddress, function(result:any, status:any) {
              // 정상적으로 검색이 완료됐으면 
               if (status === window.kakao.maps.services.Status.OK) {
                  var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                  // 결과값으로 받은 위치를 마커로 표시합니다
                  var marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                  });

                  // 인포 윈도우 설정
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
                    disableAutoPan: false,
                  });
                infowindow.open(map, marker);
              } 
            });  
          })

        }else { 
        console.log('주변 필터링 데이터 한 개 보여주기')
            
        // 모달데이터를 클릭한 곳으로 위치를 이동시킵니다.     
          if(modalData){
            geocoder.addressSearch(modalData.attractionAddress, function(result:any, status:any){
              if (status === window.kakao.maps.services.Status.OK){
                console.log('좌표 검색 완료',result[0].y, result[0].x)
                var placePosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시합니다
                  var marker = new window.kakao.maps.Marker({
                      map: map,
                      position:  placePosition,
                  });
      
                  // 인포 윈도우 설정
                  var infowindow = new window.kakao.maps.InfoWindow({
                    content: 
                      `<div 
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
                    disableAutoPan: false
                  });
                  
                  // 인포윈도우 표시
                  infowindow.open(map, marker);
  
                  //map.setCenter(coords);
                map.panTo(placePosition);
                map.relayout();
              }
            })
          }
        }
    }

    // placedetail 컴포넌트에서 사용 -- 수정 금지
    if(component === 'place'){
      geocoder.addressSearch(dataList, function(result:any, status:any) {
         if (status === window.kakao.maps.services.Status.OK) {    
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords
            });
            map.setCenter(coords);
            //map.setCenter(latlng);
        } 
    });    
    };

    // Map Control - 공통
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new window.kakao.maps.MapTypeControl();
    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT);
  },[filterOrPosition,dataset=== undefined, modalData])


  return (
    <>
      <div
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
          <MyPosition
            onClick={() => {
              setFilterOrPosition(!filterOrPosition);
            }}
          >
            {filterOrPosition ? "실시간 위치 OFF" : "실시간 위치"}
          </MyPosition>
        ) : null}
      </div>
    </>
  );
};
export default KakaoMap;
