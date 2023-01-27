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
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const VioletButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
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

const WhiteButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--purple-300);
  border-radius: var(--br-l);
  border: 1px solid white;
  color: white;
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  cursor: pointer;
  &:hover {
    background-color: white;
    color: var(--purple-300);
  }
`;
const GrayButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--black-300);
  border-radius: var(--br-l);
  border: none;
  color: var(--black-650);
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  cursor: pointer;
  &:hover {
    background-color: var(--black-400);
    color: var(--black-650);
  }
`;

const NoneButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--black-250);
  border-radius: var(--br-l);
  border: none;
  font-weight: 400;
  color: var(--black-900);
  font-size: var(--font-sx);
  cursor: pointer;
`;

const Button = ({
  width,
  height,
  fontsize,
  hovercolor,
  text,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <>
      {type === "violet" ? (
        <VioletButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
        >
          {text}
        </VioletButton>
      ) : (
        <></>
      )}
      {type === "white" ? (
        <WhiteButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
        >
          {text}
        </WhiteButton>
      ) : (
        <></>
      )}
      {type === "gray" ? (
        <GrayButton
          width={width}
          height={height}
          fontsize={fontsize}
          hovercolor={hovercolor}
          onClick={onClick}
        >
          {text}
        </GrayButton>
      ) : (
        <></>
      )}
      {type === "none" ? (
        <NoneButton
          width={width}
          height={height}
          fontsize={fontsize}
          onClick={onClick}
        >
          {text}
        </NoneButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Button;
