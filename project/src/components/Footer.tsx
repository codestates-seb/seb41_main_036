import { useNavigate } from "react-router-dom";
import {
  FooterContainer,
  FooterImage,
  FooterText,
  FooterWrapper,
  FooterBottomText,
  LogoContainer,
  MadePeopleContainer,
  FooterBottomContainer,
  LinkIconContainer,
  LinkWrapper,
} from "./FooterStyled";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { CgFigma as FigmaIcon } from "react-icons/cg";
import Logo from "../data/Logo.png";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <FooterContainer>
        <LogoContainer>
          <img
            src={Logo}
            alt="logo"
            style={{
              width: "100px",
              backgroundSize: "cover",
            }}
            onClick={() => navigate("/")}
          />
        </LogoContainer>

        <MadePeopleContainer>
          <FooterText marginRight="10px">김진주 |</FooterText>
          <FooterText marginRight="10px">박혜수 |</FooterText>
          <FooterText marginRight="10px">이동우 |</FooterText>
          <FooterText marginRight="10px">이상유 |</FooterText>
          <FooterText marginRight="10px">이승현 |</FooterText>
          <FooterText marginRight="10px">정세민</FooterText>
        </MadePeopleContainer>
        <LinkWrapper>
          <LinkIconContainer
            href="https://github.com/codestates-seb/seb41_main_036"
            className="github-icon"
          >
            <GithubIcon />
          </LinkIconContainer>
          <LinkIconContainer
            href="https://www.figma.com/file/iFs2WMfNlUTOA6ILnCljk3/main-project?node-id=0%3A1&t=FKufgjpDJAMZQ80B-1"
            className="figma-icon"
          >
            <FigmaIcon />
          </LinkIconContainer>
        </LinkWrapper>
        <hr />
        <FooterBottomContainer>
          <FooterBottomText>
            &copy; Copyright 2023. SEB41_036 All rights reserved.
          </FooterBottomText>
          <FooterBottomText>이용약관</FooterBottomText>
          <FooterBottomText>개인정보처리방침</FooterBottomText>
          <FooterBottomText>제휴제안</FooterBottomText>
        </FooterBottomContainer>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
