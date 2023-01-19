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
    const options = {
      // center에 위도, 경도 좌표를 설정 
      center: new window.kakao.maps.LatLng(37.573898277022,126.9731314753), // 지도의 중심 좌표
      level:3 // 확대되어 보여지는 레벨  설정 
    };
    const map = new window.kakao.maps.Map(container,options);

    // 확대, 축소 컨트롤을 생성 
    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


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