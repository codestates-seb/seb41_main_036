import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: var(--black-800);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  hr {
    border-width: 0.8px 0 0 0;
    border-style: solid;
    border-color: #ffffff;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const FooterImage = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  cursor: pointer;
`;

const FooterText = styled.span<{
  fontSize: string;
  marginLeft?: string;
  hoverColor?: string;
  cursor?: string;
}>`
  font-size: ${(props) => props.fontSize};
  font-weight: var(--fw-bold);
  color: white;
  margin-left: ${(props) => props.marginLeft};
  cursor: ${(props) => props.cursor};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

const MadePeopleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export {
  FooterWrapper,
  FooterContainer,
  LogoContainer,
  FooterImage,
  FooterText,
  MadePeopleContainer,
};
