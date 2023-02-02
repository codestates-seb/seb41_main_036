import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: #19171f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  hr {
    border-width: 0.8px 0 0 0;
    border-style: solid;
    border-color: var(--black-800);
  }
`;

const LogoContainer = styled.div`
  margin-top: 10px;
  svg {
    width: 80px;
    height: 23px;
    path {
      fill: var(--black-500);
    }
    :hover {
      cursor: pointer;
    }
  }
`;

const FooterImage = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  cursor: pointer;
`;

const FooterText = styled.span<{
  fontSize?: string;
  marginRight?: string;
  hoverColor?: string;
  cursor?: string;
}>`
  font-size: var(--font-sm);
  color: var(--black-700);
  margin-right: ${(props) => props.marginRight};
  letter-spacing: 0.1rem;
  cursor: pointer;
  &:hover {
    color: var(--purple-300);
    opacity: 0.8;
  }
`;

const MadePeopleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 45px 0;
`;
const FooterBottomText = styled.span`
  color: var(--black-700);
  font-size: var(--font-xs);
  letter-spacing: 0.01rem;
  margin-right: 10px;
  :nth-child(1) {
    flex: 1;
  }
`;
const FooterBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
`;
const Logo = styled.h2`
  color: var(--purple-300);
  font-size: 18px;
  letter-spacing: 0.6rem;
  font-weight: 800;
  background-color: var(--black-900);
  padding: 5px 1px 5px 12px;
  opacity: 0.9;
  border-radius: 10px;
  margin-right: 13px;
`;
const LinkIconContainer = styled.a`
  svg {
    width: 20px;
    height: 20px;
    margin: 0 17px 10px 0;
    color: var(--black-680);
    transform: translate(3px, 2px);
    :hover {
      color: var(--purple-300);
    }
  }
  .figma-icon {
    transform: translate(40px, 2px);
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const EmailContainer = styled.span`
  display: flex;
  align-items: center;
  color: var(--black-700);
  font-size: var(--font-xs);
  letter-spacing: 0.03rem;
  margin: 0 10px 5px auto;
  svg {
    margin-right: 5px;
  }
  a {
    color: var(--black-700);
    :visited {
      color: var(--black-700);
    }
    :hover {
      color: var(--purple-300);
    }
  }
`;
export {
  Logo,
  FooterWrapper,
  FooterContainer,
  LogoContainer,
  FooterImage,
  FooterText,
  FooterBottomText,
  FooterBottomContainer,
  MadePeopleContainer,
  LinkIconContainer,
  LinkWrapper,
  EmailContainer,
};
