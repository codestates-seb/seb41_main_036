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
import { useNavigate } from 'react-router-dom';

// import { ReactComponent as Logo } from "./../../data/Templogo.svg";
import { ReactNode, MouseEventHandler } from "react";
const IMG_SRC =
  "https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g";
const isLoggedIn = true;

const HeaderTopBar = () => {
  const navigate = useNavigate();
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
            <a onClick={()=>navigate('/login')}>로그인/회원가입</a>
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
  const navigate = useNavigate();
  return (
    <HeaderBodyWrapper backgroundOn={backgroundOn}>
      <HeaderBody>
        <a href="/">
          <div style={{ width: "200px", height: "70px" }} />
        </a>
        <HeaderBodyMenu>
          <li onClick={()=>navigate('/place')}>명소</li>
          <li onClick={()=>navigate('/post')}>방문리뷰</li>
          <li onClick={()=>navigate('/map')}>내 주변 명소 찾기</li>
        </HeaderBodyMenu>
        {searchBarOn && (
          <SearchBarWrapper>
            <SearchBar defaultValue={defaultValue} />
          </SearchBarWrapper>
        )}
        {isLoggedIn && (
          <Profile>
            <img src={IMG_SRC} alt="profile" />
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
