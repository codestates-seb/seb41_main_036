import SearchBar from "./SearchBar";
import {
  HeaderWrapper,
  HeaderTop,
  HeaderTopMenu,
  HeaderBody,
  HeaderBodyMenu,
  HeaderBodyWrapper,
  SearchBarWrapper,
  Profile,
} from "./style";

// import { ReactComponent as Logo } from "./../../data/Templogo.svg";
import profile from "./../../data/profile.png";
import { ReactNode, MouseEventHandler } from "react";

const isLoggedIn = true;

const HeaderTopBar = () => {
  return (
    <HeaderTop>
      <HeaderTopMenu>
        {isLoggedIn ? (
          <>
            <li>마이페이지</li>
            <li>
              <a href="https://www.naver.com">로그아웃</a>
            </li>
          </>
        ) : (
          <li>
            <a href="https://www.naver.com">로그인/회원가입</a>
          </li>
        )}
      </HeaderTopMenu>
    </HeaderTop>
  );
};
interface HeaderBodyProps {
  searchBarOn?: boolean;
  defaultValue?: string;
  backgroundOn?: boolean;
  isSuggetionVisible?: boolean;
}
const HeaderBodyBar = ({
  searchBarOn = true,
  defaultValue = "",
  backgroundOn = true,
}: HeaderBodyProps) => {
  return (
    <HeaderBodyWrapper backgroundOn={backgroundOn}>
      <HeaderBody>
        <a href="/">
          <div style={{ width: "200px", height: "70px" }} />
        </a>
        <HeaderBodyMenu>
          <li>명소</li>
          <li>방문리뷰</li>
          <li>내 주변 명소 찾기</li>
        </HeaderBodyMenu>
        {searchBarOn && (
          <SearchBarWrapper>
            <SearchBar defaultValue={defaultValue} />
          </SearchBarWrapper>
        )}
        {isLoggedIn && (
          <Profile>
            <img src={profile} alt="profile" />
          </Profile>
        )}
      </HeaderBody>
    </HeaderBodyWrapper>
  );
};
interface HeaderMainProps {
  children?: ReactNode;
  mouseOverHandler?: MouseEventHandler<HTMLElement>;
  mouseOutHandler?: MouseEventHandler<HTMLElement>;
  isVisible?: boolean;
}
const HeaderMain = ({
  children,
  mouseOverHandler,
  mouseOutHandler,
  isVisible = true,
}: HeaderMainProps) => {
  return (
    <HeaderWrapper
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseOutHandler}
      isVisible={isVisible}
    >
      {children}
    </HeaderWrapper>
  );
};
export const Header = Object.assign(HeaderMain, {
  HeaderTop: HeaderTopBar,
  HeaderBody: HeaderBodyBar,
});
