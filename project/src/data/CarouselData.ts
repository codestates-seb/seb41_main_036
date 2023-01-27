// import photo1 from "./../data/photo1.jpg";
// import photo2 from "./../data/photo2.jpg";
// import photo3 from "./../data/photo3.jpg";
// import photo4 from "./../data/photo4.jpg";
// import photo5 from "./../data/photo5.jpg";
// import photo7 from "./../data/photo7.jpg";
// import photo8 from "./../data/photo8.jpg";
// import photo9 from "./../data/photo9.jpg";
// import photo10 from "./../data/photo10.jpg";
// import photo11 from "./../data/photo11.jpg";
//https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g
const prefix = "https://drive.google.com/uc?id=";
const carouselData = [
  {
    img: prefix + "1YWd1jKmfExPR6i8xi0omGNBRVlxNojcd",
    id: 3,
    attractionId: 76,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.1?",
    color: "var(--black-250)",
    blur_hash: "L0264{RgD|-sNDbds?R$Mtt8%PIl",
    location: "남산공원",
  },
  {
    img: prefix + "16asJgbGLraRUT9FZoD3h1Ivzq6Jax97V",
    id: 0,
    attractionId: 65,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.2",
    color: "var(--black-250)",
    blur_hash: "LYGlr0R+j]of%MadWVfR_4ofofof",
    location: "여의도한강공원",
  },
  {
    img: prefix + "1A0hK4ijcsEWHTG-IGs_gO8v8QHuiPJ_8",
    id: 1,
    attractionId: 91,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.3",
    color: "var(--black-250)",
    blur_hash: "LsHezp_NWWj[xvR+Rjt7off6RjRj",
    location: "동대문디자인플라자",
  },
  {
    img: prefix + "1UDr-bGWp8AqSF_pSuiimNwPvRnLMKbYV",
    id: 2,
    attractionId: 65,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.4",
    color: "var(--black-250)",
    blur_hash: "LNKI9VWC11S4}[WWWCoKBDfjocjt",
    location: "여의도한강공원",
  },

  {
    img: prefix + "1_N4v0M79nc4EkceHvVj1YxL09krXYucr",
    id: 4,
    attractionId: undefined,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.5",
    color: "var(--black-250)",
    blur_hash: "LEF}_|aI01xc?Fsk9eaJ~DV?Ivax",
    location: "청계천",
  },
  {
    img: prefix + "1bMLTieIC-3W1v99DpWR_frxzW17pDKwR",
    id: 5,
    attractionId: 88,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다.명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.6",
    color: "var(--black-250)",
    blur_hash: "LKA13Ls,RiWq.Tt6adayIVt7oLe.",
    location: "광화문광장",
  },
  {
    img: prefix + "1bgUbgqqS6ZSytEhJnIde6064EkgSWMcb",
    id: 6,
    attractionId: 72,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다.명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.7",
    color: "var(--black-250)",
    blur_hash: "L77A;[E1E0xt.ARiROog16$f$zR+",
    location: "N서울타워",
  },
  {
    img: prefix + "1k_CtXEn_CrHLmu3S8mgmxVCsX89mjFNr",
    id: 8,
    attractionId: 52,
    title: "사진찍기 가장 좋은 장소는 어디일까요?",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.8",
    color: "var(--black-250)",
    blur_hash: "LWHwcx%MIoa#}[I.s;ay^Ps.R*WX",
    location: "서울숲공원",
  },
  {
    img: prefix + "1x5A69O3EE25JFnykZYG_9hgDWzJ_l9A-",
    id: 9,
    attractionId: 83,
    title: "사진찍기 가장 좋은 장소는 어디일까요",
    subtitle:
      "나만의 사진 명소를 발견할 수 있을지도 모릅니다. 명소부터 포스트까지 다양한 정보를 통해 나만의 사진을 찍어보세요.9",
    color: "var(--black-250)",
    blur_hash: "LPKA+%$f-ps9~U?GnN%2~qg4t7S4",
    location: "창덕궁",
  },
];
export default carouselData;
