import { useNavigate } from "react-router-dom";
import {
  FooterContainer,
  FooterImage,
  FooterText,
  FooterWrapper,
  LogoContainer,
  MadePeopleContainer,
} from "./FooterStyled";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <FooterContainer>
        <LogoContainer>
          <FooterImage
            src={process.env.PUBLIC_URL + "/logo2.jpg"}
            alt="logo"
            width="50px"
            height="50px"
            onClick={() => navigate(`/`)}
          />
          <FooterText
            fontSize="var(--font-xxl)"
            marginLeft="15px"
            cursor="pointer"
            hoverColor="var(--black-600)"
          >
            pikcha
          </FooterText>
        </LogoContainer>
        <MadePeopleContainer>
          <FooterImage
            src={process.env.PUBLIC_URL + "/logo-git.png"}
            width="30px"
            height="30px"
            onClick={() =>
              navigate(`/https://github.com/codestates-seb/seb41_main_036`)
            }
          />
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            김진주
          </FooterText>
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            박혜수
          </FooterText>
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            이동우
          </FooterText>
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            이상유
          </FooterText>
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            이승현
          </FooterText>
          <FooterText fontSize="var(--font-base)" marginLeft="20px">
            정세민
          </FooterText>
        </MadePeopleContainer>
        <hr />
        <MadePeopleContainer>
          <FooterText fontSize="var(--font-sm)">
            Copyright 2023. SEB41_036 All rights reserved.
          </FooterText>
        </MadePeopleContainer>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
