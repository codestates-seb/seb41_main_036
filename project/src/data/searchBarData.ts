interface AttractionsProps {
  name: string;
  id: number;
  address: string;
}
const AttractionsData: Array<AttractionsProps> = [
  {
    name: "봉은사",
    id: 1,
    address: "강남구 봉은사로 531 봉은사",
  },
  {
    name: "도산 공원",
    id: 2,
    address: "강남구 도산대로45길 20",
  },
  {
    name: "코엑스 아쿠아리움",
    id: 3,
    address: "강남구 영동대로 513",
  },
  {
    name: "호림박물관(신사분관)",
    id: 4,
    address: "강남구 도산대로 317",
  },
  {
    name: "송은",
    id: 5,
    address: "강남구 도산대로 441",
  },
  {
    name: "선정릉(선릉)",
    id: 6,
    address: "강남구 선릉로100길 1",
  },
  {
    name: "노블레스 컬렉션",
    id: 7,
    address: "강남구 선릉로162길 13",
  },
  {
    name: "대한불교조계종 도선사",
    id: 8,
    address: "강북구 삼양로173길 504",
  },
  {
    name: "화계사",
    id: 9,
    address: "강북구 화계사길 117",
  },
  {
    name: "우이동계곡",
    id: 10,
    address: "강북구 삼양로159길 60-7",
  },
  {
    name: "서울물재생공원",
    id: 11,
    address: "강서구 양천로 201",
  },
  {
    name: "서울식물원",
    id: 12,
    address: "강서구 마곡동로 161 식물원",
  },
  {
    name: "궁산땅굴역사전시관",
    id: 13,
    address: "강서구 양천로49길 106",
  },
  {
    name: "국립항공박물관",
    id: 14,
    address: "강서구 하늘길 177",
  },
  {
    name: "낙성대",
    id: 15,
    address: "관악구 낙성대로 77",
  },
  {
    name: "서울시립 남서울미술관",
    id: 16,
    address: "관악구 남부순환로 2076",
  },
  {
    name: "어린이대공원",
    id: 17,
    address: "광진구 능동로 216",
  },
  {
    name: "커먼그라운드",
    id: 18,
    address: "광진구 아차산로 200",
  },
  {
    name: "고척스카이돔",
    id: 19,
    address: "구로구 경인로 430 고척스카이돔",
  },
  {
    name: "항동푸른수목원",
    id: 20,
    address: "구로구 연동로 240",
  },
  {
    name: "궁동저수지 생태공원",
    id: 21,
    address: "구로구 오리로 1352",
  },
  {
    name: "서울시립 북서울미술관",
    id: 22,
    address: "노원구 동일로 1238",
  },
  {
    name: "서울시립과학관",
    id: 23,
    address: "노원구 한글비석로 160 지하1층, 1~3층",
  },
  {
    name: "불암산 나비정원",
    id: 24,
    address: "노원구 한글비석로12길 51-27",
  },
  {
    name: "서울창포원",
    id: 25,
    address: "도봉구 마들로 916",
  },
  {
    name: "천축사",
    id: 26,
    address: "도봉구 도봉산길 92-2",
  },
  {
    name: "북한산생태탐방원",
    id: 27,
    address: "도봉구 도봉산길 86",
  },
  {
    name: "김수영문학관",
    id: 28,
    address: "도봉구 해등로32길 80",
  },
  {
    name: "세종대왕 기념관",
    id: 29,
    address: "동대문구 회기로 56",
  },
  {
    name: "홍릉 수목원",
    id: 30,
    address: "동대문구 회기로 57",
  },
  {
    name: "답십리 고미술상가",
    id: 31,
    address: "동대문구 고미술로 43",
  },
  {
    name: "국립서울현충원",
    id: 32,
    address: " 동작구 현충로 210",
  },
  {
    name: "사육신묘",
    id: 33,
    address: " 동작구 노량진로 191 사육신묘지공원",
  },
  {
    name: "달마사",
    id: 34,
    address: " 동작구 서달로 50-26",
  },
  {
    name: "보라매공원",
    id: 35,
    address: " 동작구 여의대방로20길 33",
  },
  {
    name: "노량진수산시장",
    id: 36,
    address: "동작구 노들로 674 노량진수산물도매시장",
  },
  {
    name: "하늘공원",
    id: 37,
    address: "마포구 하늘공원로 95",
  },
  {
    name: "노을공원",
    id: 38,
    address: "마포구 하늘공원로 108-2",
  },
  {
    name: "서울월드컵경기장",
    id: 39,
    address: "마포구 월드컵로 240",
  },
  {
    name: "디지털미디어시티",
    id: 40,
    address: " 마포구 월드컵북로 366",
  },
  {
    name: "망원시장",
    id: 41,
    address: " 마포구 포은로8길 14",
  },
  {
    name: "서대문형무소역사관",
    id: 42,
    address: " 서대문구 통일로 251",
  },
  {
    name: "서대문자연사박물관",
    id: 43,
    address: " 서대문구 연희로32길 51 지하1층, 1~3층",
  },
  {
    name: "서대문독립공원",
    id: 44,
    address: " 서대문구 통일로 251",
  },
  {
    name: "봉원사",
    id: 45,
    address: " 서대문구 봉원사길 120",
  },
  {
    name: "예술의전당",
    id: 46,
    address: " 서초구 남부순환로 2406",
  },
  {
    name: "국립국악원",
    id: 47,
    address: " 서초구 남부순환로 2364",
  },
  {
    name: "세빛섬",
    id: 48,
    address: " 서초구 올림픽대로 2085-14",
  },
  {
    name: "매헌시민의숲",
    id: 49,
    address: " 서초구 매헌로 99",
  },
  {
    name: "국립중앙도서관",
    id: 50,
    address: "서초구 반포대로 201",
  },
  {
    name: "한원미술관",
    id: 51,
    address: "서초구 남부순환로 2423 지하1층",
  },
  {
    name: "서울숲공원",
    id: 52,
    address: "성동구 뚝섬로 273",
  },
  {
    name: "뚝섬미술관",
    id: 53,
    address: "성동구 아차산로 33 삼일빌딩 지하1층",
  },
  {
    name: "간송미술관",
    id: 54,
    address: "성북구 성북로 102-11",
  },
  {
    name: "삼청각",
    id: 55,
    address: "성북구 대사관로 3",
  },
  {
    name: "의릉",
    id: 56,
    address: "성북구 화랑로32길 146-20",
  },
  {
    name: "만해 한용운 심우장",
    id: 57,
    address: "성북구 성북로29길 24",
  },
  {
    name: "롯데월드",
    id: 58,
    address: "송파구 올림픽로 240",
  },
  {
    name: "석촌호수공원",
    id: 59,
    address: "송파구 잠실로 148",
  },
  {
    name: "올림픽공원",
    id: 60,
    address: "송파구 올림픽로 424",
  },
  {
    name: "롯데월드타워",
    id: 61,
    address: "송파구 올림픽로 300",
  },
  {
    name: "서서울호수공원",
    id: 62,
    address: "양천구 남부순환로64길 26 신월야구장",
  },
  {
    name: "국제선센터",
    id: 63,
    address: "양천구 목동동로 167 국제템플스테이센터",
  },
  {
    name: "파리공원",
    id: 64,
    address: "양천구 목동동로 363 파리공원",
  },
  {
    name: "여의도한강공원",
    id: 65,
    address: "영등포구 여의동로 330 한강사업본부 여의도안내센터",
  },
  {
    name: "63스퀘어",
    id: 66,
    address: "영등포구 63로 50",
  },
  {
    name: "영등포 타임스퀘어",
    id: 67,
    address: "영등포구 영중로 15 타임스퀘어",
  },
  {
    name: "국회의사당",
    id: 68,
    address: "영등포구 의사당대로 1",
  },
  {
    name: "선유도공원",
    id: 69,
    address: "영등포구 선유로 343",
  },
  {
    name: "더현대서울",
    id: 70,
    address: " 영등포구 여의대로 108 더현대 ",
  },
  {
    name: "KBS",
    id: 71,
    address: "특별시 영등포구 여의공원로 13 한국방송공사",
  },
  {
    name: "N서울타워",
    id: 72,
    address: "용산구 남산공원길 105",
  },
  {
    name: "국립중앙박물관",
    id: 73,
    address: "용산구 서빙고로 137 국립중앙박물관",
  },
  {
    name: "전쟁기념관",
    id: 74,
    address: "용산구 이태원로 29",
  },
  {
    name: "리움미술관",
    id: 75,
    address: "용산구 이태원로55길 60-16",
  },
  {
    name: "남산공원",
    id: 76,
    address: "중구 남산공원길 125-54",
  },
  {
    name: "진관사",
    id: 77,
    address: "은평구 진관길 73",
  },
  {
    name: "은평한옥마을",
    id: 78,
    address: "은평구 연서로50길 7-12",
  },
  {
    name: "불광동 성당",
    id: 79,
    address: "은평구 통일로 786",
  },
  {
    name: "수국사",
    id: 80,
    address: "은평구 서오릉로23길 8-5",
  },
  {
    name: "경복궁",
    id: 81,
    address: "종로구 사직로 161",
  },
  {
    name: "북촌 한옥마을",
    id: 82,
    address: "종로구 북촌로 53",
  },
  {
    name: "창덕궁",
    id: 83,
    address: "종로구 율곡로 99",
  },
  {
    name: "낙산공원",
    id: 84,
    address: "종로구 낙산길 41",
  },
  {
    name: "창경궁",
    id: 85,
    address: "종로구 창경궁로 185 창경궁",
  },
  {
    name: "흥인지문",
    id: 86,
    address: "종로구 종로 288",
  },
  {
    name: "조계사",
    id: 87,
    address: "종로구 우정국로 55",
  },
  {
    name: "광화문광장",
    id: 88,
    address: "종로구 세종대로 175 세종이야기",
  },
  {
    name: "서울역사박물관",
    id: 89,
    address: "종로구 새문안로 55",
  },
  {
    name: "이화동 벽화마을",
    id: 90,
    address: "종로구 이화장길 70-11",
  },
  {
    name: "동대문디자인플라자",
    id: 91,
    address: "중구 을지로 281",
  },
  {
    name: "남대문시장",
    id: 92,
    address: "중구 남대문시장4길 21",
  },
  {
    name: "덕수궁",
    id: 93,
    address: "중구 세종대로 99 덕수궁",
  },
  {
    name: "서울시청",
    id: 94,
    address: "중구 세종대로 110",
  },
  {
    name: "서울 시립 미술관",
    id: 95,
    address: "중구 덕수궁길 61",
  },
  {
    name: "서울로 7017",
    id: 96,
    address: "중구 퇴계로 33",
  },
  {
    name: "숭례문",
    id: 97,
    address: "중구 세종대로 40",
  },
  {
    name: "용마폭포공원",
    id: 98,
    address: "중랑구 용마산로 250-12",
  },
  {
    name: "봉화산 옹기테마공원",
    id: 99,
    address: "중랑구 신내로21길 116",
  },
  {
    name: "중랑캠핑숲",
    id: 100,
    address: "중랑구 송림길 160",
  },
  {
    name: "광진교 8번가",
    id: 101,
    address: "강동구 구천면로 77",
  },
  {
    name: "암사동 선사주거지",
    id: 102,
    address: "강동구 올림픽로 875",
  },
  {
    name: "강동리본센터",
    id: 103,
    address: "강동구 양재대로81길 73",
  },
  {
    name: "청계천",
    id: 104,
    address: "종로구 서린동 148",
  },
];
export { AttractionsData };
