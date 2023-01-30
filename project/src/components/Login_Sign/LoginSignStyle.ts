import styled from "styled-components";

interface TextProps {
  fontSize: string;
  color: string;
  fontweight: string;
}
interface PaddingProps {
  padding: string;
}
interface OverlayProps {
  overlay: boolean;
}
interface ButtonProps {
  backgroundcolor?: string;
  color?: string;
  hoverbackgroundcolor?: string;
  hovercolor?: string;
}
export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
export const Signincontainer = styled.div<OverlayProps>`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  width: 30%;
  height: 70%;
  border-radius: ${(props) =>
    props.overlay ? "30px 0px 0px 30px" : "0px 30px 30px 0px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
`;
export const Logincontainer = styled.div<OverlayProps>`
  width: 30%;
  height: 70%;
  border-radius: ${(props) =>
    props.overlay ? "30px 0px 0px 30px" : "0px 30px 30px 0px"};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
`;
export const Rightoverlay = styled.div<OverlayProps>`
  width: 30%;
  height: 70%;
  border-radius: ${(props) =>
    props.overlay ? "0px 30px 30px 0px" : "30px 0px 0px 30px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-300);
  transition: all 0.5s;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
`;
export const Leftoverlay = styled.div<OverlayProps>`
  width: 30%;
  height: 70%;
  border-radius: ${(props) =>
    props.overlay ? "0px 30px 30px 0px" : "30px 0px 0px 30px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-300);
  transition: all 0.5s;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
`;
export const OauthBtn = styled.button<ButtonProps>`
  width: 40px;
  height: 40px;
  border: 0px;
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 30px;
  color: ${(props) => props.color};
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
  &:hover {
    background-color: ${(props) => props.hoverbackgroundcolor};
  }
`;
export const InputStyle = styled.input`
  width: 75%;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid var(--black-400);
  padding-top: 15px;
  font-size: 15px;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--black-600);
  }
`;
export const TextStyle = styled.div<TextProps>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
  padding-top: 10px;
`;

export const ErrMsg = styled.div<TextProps>`
  width: 75%;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
`;

export const CustomPadding = styled.div<PaddingProps>`
  padding: ${(props) => props.padding};
`;
export const Logo = styled.img`
  width: 200px;
  height: 50px;
  font-size: 40px;
  margin-top: 15px;
  cursor: pointer;
`;
export const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  right: 1.6em;
  bottom: 7em;
  color: var(--black-700);
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

export const SocitalLoginContinaer = styled.div`
  width:100px;
  display: flex;
  justify-content: space-around;
`;

export const LoginInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 130px;

  span {
    width: 70%;
    text-align: left;
  }
`;

export const LoginHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
