import { useState, useEffect } from "react";
import styled from "styled-components";


declare global {
  interface Window {
    kakao: any;
  }
}

// 안내창 커스텀입니다. 
let info = 
<<<<<<< HEAD
`<div style="width:180px;height:90px;background-color:white;padding:5px 5px;border:none;border-radius:5px">
  <h3 style="color:#6255F8; width:100%;height:30px;background-color:#faf7df;line-height:30px">광화문</h3>
  <h3 style="font-size:13px;color:#393939;font-weight:400;padding:6px 0" > 주소 : 종로구 사직로 161</h3>
  <a href="www.naver.com" style="font-size:13px;text-decoration-line:none;margin-left:130px">더보기</a>
=======
`<div style="width:190px;height:90px;background-color:white;padding:5px 5px;border:1px solid grey;border-radius:5px">
  <h3 style="color:#6255F8; width:100%;height:30px;background-color:#faf7df;line-height:30px">광화문</h3>
  <h3 style="font-size:13px;color:#393939;font-weight:400;padding:6px 0" > 주소 : 종로구 사직로 161</h3>
  <a href="www.naver.com" style="font-size:13px;text-decoration-line:none;margin-left:140px">더보기</a>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
</div>`

  // 주소 더미 데이터
  var listData = [
    '종로구 사직로 161', 
    '종로구 세종대로 198',
    '종로구 세종대로 209', 
    '종로구 세종대로 175'
];

interface Map {
  width:string, 
  height:string,
  dataList:string[],
  position:any,
  left:string,
}


<<<<<<< HEAD
  // 주소 더미 데이터
  var listData = [
    '종로구 사직로 161', 
    '종로구 세종대로 198',
    '종로구 세종대로 209', 
    '종로구 세종대로 175'
];

interface Map {
  width:string, 
  height:string,
  dataList:string[] | string | undefined,
  position:any,
  left:string,
  regionFilter:string,
  component:string,
}

const MyPosition = styled.div`
  width:109px;
  height:40px;
  background-color:rgb(37, 143, 255);
  z-index:2;
  position:absolute;
  margin:45px 5px;
  text-align: center;
  line-height: 40px;
  box-shadow: #101010a0 0px 3px 3px;
  color:white;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  :hover{
    background-color:rgb(17, 90, 169);
    cursor: pointer;
  }
`


const KakaoMap = ({width, height, dataList, position, left, regionFilter, component }:Map) =>{
  
  // data가 단일 주소 데이터인 경우에는 -> PlaceDetail 컴포넌트에서 사용 
  // dataList가 리스트인 경우에는 -> Map 컴포넌트에서 사용 (props 값으로 분리시킴 )
  // 기본으로 전체 리스트 설정 

  // useState로 지금 내위치쓸건지, 지역 쓸건지 선택하는 변수 만들기 


  // 필터링시 -> 지역구 목록대로 필터링
  // 내위치시 -> 내 주변 (구 기준) 목록을 필터링 

  const [filterOrPosition, setFilterOrPosition] = useState(false);
  // false 일때는 필터링, 
  // true일때는 내위치

  //const [filterRegion, setFilterRegion] = useState(); // 필터링 표시 - 내 위치 / 혹은 구별 필터
=======
const KakaoMap = ({width, height, dataList, position, left}:Map) =>{
  
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

  useEffect(()=>{
    const container = document.getElementById('map');// 지도를 담을 dom영역

    // center에 위도, 경도 좌표를 설정 
    const options = {
      // center에 위도, 경도 좌표를 설정 
      center: new window.kakao.maps.LatLng(37.573898277022,126.9731314753), // 지도의 중심 좌표
      level:4 // 확대되어 보여지는 레벨  설정 
    };
<<<<<<< HEAD

    // 기본 주소 객체 생성 
    const map = new window.kakao.maps.Map(container,options);
    var geocoder = new window.kakao.maps.services.Geocoder();

<<<<<<< HEAD

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다 - 내위치기반
    // function displayMarker(locPosition:any, message:any) {

    //   // 마커를 생성합니다
    //   var marker = new window.kakao.maps.Marker({  
    //       map: map, 
    //       position: locPosition
    //   }); 
      
    //   var iwContent = message, // 인포윈도우에 표시할 내용
    //       iwRemoveable = true;

    //   // 인포윈도우를 생성합니다
    //   var infowindow = new window.kakao.maps.InfoWindow({
    //       content : iwContent,
    //       removable : iwRemoveable
    //   });
      
    //   // 인포윈도우를 마커위에 표시합니다 
    //   infowindow.open(map, marker);
      
    //   // 지도 중심좌표를 접속위치로 변경합니다
    //   map.setCenter(locPosition);      
    // }   





    if (Array.isArray(dataList)){
      // Map 컴포넌트에서 사용 
      console.log('데이터 리스트 배열입니다. ');

      if(filterOrPosition === true){
        // 내위치 받아오기 예제
        if (navigator.geolocation) {
          console.log('내 위치를 받아오기')
      
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
              
              var lat = position.coords.latitude, // 위도
                  lon = position.coords.longitude; // 경도
              
               var locPosition = new window.kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                map.setCenter(locPosition);
            });
          } 
      }else { 
      console.log('주변 필터링 데이터 보여주기')

        // 내위치 값을 받아오지 않거나, 필터링이 선택된 경우에는
        dataList.forEach(function(addr,index){
        geocoder.addressSearch(addr, function(result:any, status:any) {
          // 정상적으로 검색이 완료됐으면 
           if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords
              });
  
              // 인포 윈도우 설정
              var infowindow = new window.kakao.maps.InfoWindow({
                content: info,
                disableAutoPan: false
              });
            infowindow.open(map, marker);
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
          } 
        });  
      })
    }
    

    }else{
      // placedetail 컴포넌트에서 사용 -- 수정 금지
      console.log('단일 데이터 값 입니다. ');
      console.log(dataList)
      geocoder.addressSearch(dataList, function(result:any, status:any) {
         if (status === window.kakao.maps.services.Status.OK) {    
=======
    // 주소 - 좌표 변환
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();
    dataList.forEach(function(addr,index){
      geocoder.addressSearch(addr, function(result:any, status:any) {
        // 정상적으로 검색이 완료됐으면 
         if (status === window.kakao.maps.services.Status.OK) {
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords
            });
            map.setCenter(coords);
        } 
    });    
    }

    // Map Control - 공통 
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new window.kakao.maps.MapTypeControl();
    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT);
  },[filterOrPosition])

    //document.getElementsByClassName(class)
  
=======

    // 기본 주소 객체 생성 
    const map = new window.kakao.maps.Map(container,options);

    // 주소 - 좌표 변환
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();
    dataList.forEach(function(addr,index){
      geocoder.addressSearch(addr, function(result:any, status:any) {
        // 정상적으로 검색이 완료됐으면 
         if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포 윈도우 설정
            var infowindow = new window.kakao.maps.InfoWindow({
              content: info,
              disableAutoPan: false
            });
          infowindow.open(map, marker);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
      });  
    })



    // Map Control
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new window.kakao.maps.MapTypeControl();
    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT);


    // Marker
    // marker로 원하는 위도, 경도의 값을 나타냅니다. 
    // var marker = new window.kakao.maps.Marker({
    //   map:map,
    //   position:options.center
    // })
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f


  return(
    <>
<<<<<<< HEAD
    <div id="map" style={{width:width,height:height, position:position,left:left, border:"1px solid white"}}>
      { component === "map" ?  
        <MyPosition onClick={()=>{setFilterOrPosition(!filterOrPosition)}}>{filterOrPosition ? "위치 검색 OFF": "내 주변 검색"}</MyPosition>: null}
    </div>
=======
    <div id="map" style={{width:width,height:height, position:position,left:left}}></div>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    </>
  )
}
export default KakaoMap;