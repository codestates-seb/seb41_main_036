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
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoginState,
  AuthToken,
  RefreshToken,
  LoggedUser,
} from "../../recoil/state";
import axios from "axios";
import Button from "../Button";
import { lazy, ReactNode, MouseEventHandler } from "react";
const SearchBar = lazy(() => import("./SearchBar"));

const IMG_SRC =
  "https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g";
const isLoggedIn = true;

const HeaderTopBar = () => {
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useRecoilState<boolean>(LoginState);
  const [auth, setAuth] = useRecoilState<string>(AuthToken);
  const [refresh, setRefresh] = useRecoilState<string>(RefreshToken);
  const [loggedUser, setLoggedUser] = useRecoilState<string>(LoggedUser);

  const onClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIslogin(false);
    axios.defaults.headers.common["authorization"] = "";
    axios.defaults.headers.common["refreshtoken"] = "";
    setAuth("");
    setRefresh("");
    setLoggedUser("");
    navigate("/");
  };
  return (
    <HeaderTop>
      <HeaderTopMenu>
        {isLogin ? (
          <>
            <li>마이페이지</li>
            <li>
              <button onClick={onClickLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => navigate("/login")}>로그인/회원가입</button>
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
  const islogin = useRecoilValue(LoginState);
  return (
    <HeaderBodyWrapper backgroundOn={backgroundOn}>
      <HeaderBody>
        <a href="/">
          <div style={{ width: "200px", height: "70px" }} />
        </a>
        <HeaderBodyMenu>
          <li onClick={() => navigate("/attractions")}>명소</li>
          <li onClick={() => navigate("/posts")}>방문리뷰</li>
          <li onClick={() => navigate("/map")}>내 주변 명소 찾기</li>
        </HeaderBodyMenu>
        {searchBarOn && (
          <SearchBarWrapper>
            <SearchBar defaultValue={defaultValue} />
          </SearchBarWrapper>
        )}
        {islogin && (
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
  headerColor?: string;
}
const HeaderMain = ({
  children,
  mouseOverHandler,
  mouseOutHandler,
  isVisible = true,
  headerColor,
}: HeaderMainProps) => {
  return (
    <HeaderWrapper
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseOutHandler}
      isVisible={isVisible}
      headerColor={headerColor}
    >
      {children}
    </HeaderWrapper>
  );
};
export const Header = Object.assign(HeaderMain, {
  HeaderTop: HeaderTopBar,
  HeaderBody: HeaderBodyBar,
});
