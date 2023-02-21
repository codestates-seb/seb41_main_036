import React from "react";
import ButtonForm from "../Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setOverlay } from "../../recoil/setOverlay";
import * as l from "./LoginSignStyle";
import { ReactComponent as Logo } from "../../data/Logo.svg";
const OverlayLeft = () => {
  const [overlays, setOverlays] = useRecoilState<boolean>(setOverlay);
  const navigate = useNavigate();

  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOverlays(!overlays);
  };

  return (
    <l.Leftoverlay overlay={overlays}>
      <l.LogoContainer>
        <Logo onClick={() => navigate("/")} />
      </l.LogoContainer>
      <l.TextStyle color="white" fontSize="20px" fontweight="bold">
        <l.CustomPadding padding="30px 0px 0px 0px"></l.CustomPadding>
        사진찍기 가장 좋은 장소는 어디일까요?
      </l.TextStyle>
      <l.CustomPadding padding="30px 0px 0px 0px"></l.CustomPadding>
      <l.TextStyle color="white" fontSize="18px" fontweight="normal">
        pickcha에서 명소부터 포스트까지
      </l.TextStyle>
      <l.TextStyle color="white" fontSize="18px" fontweight="normal">
        다양한 정보를 통해 나만의 사진을 찍어보세요.
      </l.TextStyle>
      <l.TextStyle color="white" fontSize="16px" fontweight="bold">
        이미 회원이시라면?
      </l.TextStyle>
      <l.CustomPadding padding="20px 0px 0px 0px"></l.CustomPadding>
      <ButtonForm
        width="90px"
        height="35px"
        fontsize="15px"
        text="로그인"
        type="white"
        onClick={onClickBtn}
        margin="32px 0 0 0"
      ></ButtonForm>
    </l.Leftoverlay>
  );
};

export default OverlayLeft;
