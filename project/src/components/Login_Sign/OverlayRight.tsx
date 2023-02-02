import React from "react";
import ButtonForm from "../Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setOverlay } from "../../recoil/setOverlay";
import * as r from "./LoginSignStyle";
import { ReactComponent as Logo } from "../../data/Logo.svg";

const OverlayRight = () => {
  const [overlays, setOverlays] = useRecoilState<boolean>(setOverlay);
  const navigate = useNavigate();

  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOverlays(!overlays);
  };

  return (
    <r.Rightoverlay overlay={overlays}>
      <r.LogoContainer>
        <Logo onClick={() => navigate("/")} />
      </r.LogoContainer>
      <r.CustomPadding padding="30px 0px 0px 0px"></r.CustomPadding>
      <r.TextStyle color="white" fontSize="20px" fontweight="bold">
        사진찍기 가장 좋은 장소는 어디일까요?
      </r.TextStyle>
      <r.CustomPadding padding="30px 0px 0px 0px"></r.CustomPadding>
      <r.TextStyle color="white" fontSize="18px" fontweight="normal">
        pickcha에서 명소부터 포스트까지
      </r.TextStyle>
      <r.TextStyle color="white" fontSize="18px" fontweight="normal">
        다양한 정보를 통해 나만의 사진을 찍어보세요.
      </r.TextStyle>
      <r.TextStyle color="white" fontSize="16px" fontweight="bold">
        아직 회원이 아니신가요?
      </r.TextStyle>
      <r.CustomPadding padding="50px 0px 0px 0px"></r.CustomPadding>
      <ButtonForm
        width="90px"
        height="35px"
        fontsize="15px"
        type="white"
        text="회원가입"
        onClick={onClickBtn}
      ></ButtonForm>
    </r.Rightoverlay>
  );
};

export default OverlayRight;
