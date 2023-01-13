import { useEffect } from "react";
//import Geocode from 'react-geocode';
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

// 안내창 커스텀입니다. 
let info = 
`<div style="padding:10px;width:190px;height:100px;background-color:white">
  <h3 style="color:red">광화문</h3>
  <hr>
  <h3 style="font-size:13px;color:blue" >이렇게 설명도 쓸 수 있습니다.</h3>
</div>`


const KakaoMap = () =>{

  useEffect(()=>{
    const container = document.getElementById('map');// 지도를 담을 dom영역

    // center에 위도, 경도 좌표를 설정 
    const options = {
      center: new window.kakao.maps.LatLng(37.573898277022,126.9731314753), // 지도의 중심 좌표
      level:3 // 확대되어 보여지는 레벨  설정 
    };

    // 기본 주소 객체 생성 
    const map = new window.kakao.maps.Map(container,options);

    // 주소 더미 데이터
    var listData = [
      '종로구 사직로 161', 
      '종로구 세종대로 198',
      '종로구 세종대로 209', 
      '종로구 세종대로 175'
  ];
  
    // 주소 - 좌표 변환
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();
    listData.forEach(function(addr,index){
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
              content: '<div style="width:120px;text-align:center;font-size:12px":color:#3300C6>' + listData[index] + '</div>',
              disableAutoPan: true
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
    var marker = new window.kakao.maps.Marker({
      map:map,
      position:options.center
    })

    // var infoWindow = new window.kakao.maps.InfoWindow({
    //   content: info,
    //   removable:true
    // })
    // infoWindow.open(map,marker)

    // window.kakao.maps.event.addListener(marker, "click", () => {
    //   // 마커 위에 인포윈도우를 표시
    //   infoWindow.open(map, marker);
    // });

  },[])

  return(
    <>
    <div id="map" style={{width:"840px",height:"500px"}}></div>
    </>
  )
}
export default KakaoMap;