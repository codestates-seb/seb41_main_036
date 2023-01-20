import React from "react";
import styled from "styled-components";

interface ButtonProps {
  width?: string;
  height?: string;
  backgroundcolor?: string;
  border?: string;
  color?: string;
  fontsize?: string;
  hoverbackgroundcolor?: string;
  hovercolor?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonForm = styled.button<ButtonProps>`
   // width: ${(props) => props.width};
//    height: ${(props) => props.height};
  //  background-color: ${(props) => props.backgroundcolor};
 //   border-radius: 30px;
 //   border: ${(props) => props.border};
 //   color: ${(props) => props.color};
 //   cursor: pointer;
 //   font-weight: var(--fw-bold);
  //  font-size: ${(props) => props.fontsize};
  //  &:hover {
   //     background-color: ${(props) => props.hoverbackgroundcolor};
   //     color: ${(props) => props.hovercolor};
   // }
`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--purple-300);
  border-radius: var(--br-l);
  border: none;
  color: white;
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  cursor: pointer;
  &:hover {
    background-color: var(--purple-400);
    color: ${(props) => props.hovercolor};
  }
`;

const Button = ({
  width,
  height,
  backgroundcolor,
  border,
  color,
  fontsize,
  hoverbackgroundcolor,
  hovercolor,
  text,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonForm
      width={width}
      height={height}
      backgroundcolor={backgroundcolor}
      border={border}
      color={color}
      fontsize={fontsize}
      hoverbackgroundcolor={hoverbackgroundcolor}
      hovercolor={hovercolor}
      onClick={onClick}
    >
      {text}
    </ButtonForm>
  );
};

export default Button;

// ButtonForm.defaultProps ={
//     backgroundcolor: "red",
//     hovercolor: "yellow",
//     hoverbackgroundcolor: "blue",
//     color: "green",
//     fontsize: "15px",
//     border: "22px pink solid",

// }

/*  버튼 사용 시 
import ButtonForm from '위치'  // 선언
    <ButtonForm width="180px" height='60px' backgroundcolor='var(--purple-300)' border='0px white' color='white' fontsize='24px' hoverbackgroundcolor='var(--purple-400)' text='버튼내용'></ButtonForm>

    또는

    <ButtonForm 
    width="180px" 
    height='60px' 
    backgroundcolor='var(--purple-300)' 
    border='0px white' 
    color='white' 
    fontsize='24px' 
    hoverbackgroundcolor='var(--purple-400)' 
    hovercolor='white'
    text='버튼 내용'></ButtonForm>

    순서대로 넓이 길이 배경색 외곽선 글자색 글씨크기 호버배경색 호버글씨색 버튼내용
    필요 없는 변수(스타일)은 빼도 이상없이 동작
*/
