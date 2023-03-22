import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: white;
  * {
    box-sizing: content-box !important;
  }
`;

export const PlaceList = styled.div`
  width: 25%;
  height: 86vh;
  padding: 10px 0;
  box-sizing: content-box;
`;

export const DropDown = styled.article`
  position: absolute;
  margin-left: 20px;
  box-sizing: content-box;
  > button {
    cursor: pointer;
    background-color: white;
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

export const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 200px;
  margin-left: 5px;
  overflow-y: auto;
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

export const PlaceComponent = styled.div`
  margin-top: 50px;
  width: 310px;
  height: 88vh;
  margin-left: 26px;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
`;
export const Place = styled.div<{ imgUrl: string }>`
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
    padding: 85px 0 2px 20px;
    font-weight: bold;
    font-size: 18px;
    color: white;
  }
  > p {
    padding: 5px 0 0 15px;
    font-weight: bold;
    font-size: 11px;
    color: white;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    svg {
      margin: 0 5px;
    }
  }
`;

export const PlaceDetailModal = styled.div`
  position: absolute;
  left: 350px;
  width: 400px;
  height: 90vh;
  border-right: 7px solid #e4dcdc;
  border-left: 1px solid #e4dcdc;
`;

export const PlaceDetailModalHeader = styled.div`
  box-sizing: content-box;
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
      margin: 15px 265px 0 20px;
      line-height: 20px;
      font-weight: 600;
      color: var(--black-700);
    }
    > div {
      cursor: pointer;
      margin-top: 13px;
      margin-right: 11px;
    }
    & p {
      font-size: 10px;
      margin-left: 5px;
      color: #373737;
    }
  }
  > div:nth-child(3) {
    box-sizing: content-box;
    display: flex;
    width: 325px;
    height: 30px;
    > h2 {
      background-color: #fbf8ba;
      margin-left: 20px;
      font-weight: 700;
      margin-bottom: 5px;
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
  > div:nth-child(5) {
    display: flex;
    color: #919191;
    font-weight: bold;
    margin: 10px 0 0 20px;
    > div {
      margin-right: 3px;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }
  > p:nth-child(4) {
    box-sizing: content-box;
    color: #555555;
    font-size: 14px;
    margin: 4px 0 0 20px;
    font-weight: 600;
  }
  > div {
    margin-right: 5px;
  }
  & p {
    font-size: 10px;
    margin-left: 5px;
    color: #373737;
  }
  > div:nth-child(5) {
    box-sizing: content-box;
    display: flex;
    color: #919191;
    font-weight: bold;
    margin: 8px 0 0 20px;
    > div {
      margin-right: 3px;
    }
    > p {
      font-size: 12px;
      font-weight: 500;
    }
  }
  > div:nth-child(6) {
    box-sizing: content-box;
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0 15px 20px;
    color: #0b113f87;
  }
  > span {
    color: #555555;
    margin-left: 350px;
    position: absolute;
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

export const PlaceDetailModalMain = styled.div`
  width: 100%;
  height: 485px;
  border-top: 1px solid #e4dcdc;
  > div:nth-child(1) {
    box-sizing: content-box;
    font-size: 15px;
    font-weight: 700;
    margin: 17px 0 17px 20px;
    color: #393939;
  }
`;

export const PostImgContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  overflow: auto;
  height: 35vh;
  > img {
    width: 48%;
    height: 110px;
    height: 110px;
    margin: 0 2px;
  }
`;

export const PostNone = styled.div`
  padding: 10px;
  width: 300px;
  height: 100px;
  font-size: 13px;
  color: grey;
  display: flex;
  > div {
    margin-right: 5px;
  }
`;

