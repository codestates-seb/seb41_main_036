import {
  HeaderWrapper,
  HeaderTop,
  HeaderTopMenu,
  HeaderBody,
  HeaderBodyMenu,
  HeaderBodyMenuItem,
  HeaderBodyWrapper,
  SearchBarWrapper,
  Profile,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoginState,
  AuthToken,
  LoggedUser,
  MemberId,
} from "../../recoil/state";
import axios from "../../utils/axiosinstance";
import ButtonForm from "../Button";
import { lazy, ReactNode, MouseEventHandler, useEffect } from "react";
import { ReactComponent as Logo } from "../../data/Logo.svg";
const SearchBar = lazy(() => import("./SearchBar"));

 const IMG_SRC =
  "https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g";

const HeaderTopBar = () => {
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState<string>(AuthToken);
  // const [refresh, setRefresh] = useRecoilState<string>(RefreshToken);
  const [loggedUser, setLoggedUser] = useRecoilState<string>(LoggedUser);
  const localLogin = localStorage.getItem("loginStatus");
  const [memberId, setMemberId] = useRecoilState(MemberId);
  useEffect(() => {
    if (typeof localLogin === "string") {
      setIslogin(JSON.parse(localLogin));
    }
  }, []);

  const onClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios
      .post(`/logout`)
      .then((res) => {
        setIslogin(false);
        setAuth("");
        setLoggedUser("");
        setMemberId(undefined);
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("Authorization");
        localStorage.setItem("loginStatus", "false");
        localStorage.removeItem("memberId");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <HeaderTop>
      <HeaderTopMenu>
        {isLogin ? (
          <>
            <li>
              <ButtonForm
                width="70px"
                height="1px"
                text="마이페이지"
                type="none"
                onClick={() => navigate("/mypage")}
              ></ButtonForm>
            </li>
            <li>
              <ButtonForm
                width="50px"
                height="1px"
                text="로그아웃"
                type="none"
                onClick={onClickLogout}
              ></ButtonForm>
            </li>
          </>
        ) : (
          <li>
            <ButtonForm
              width="100px"
              height="1px"
              text="로그인 / 회원가입"
              type="none"
              onClick={() => navigate("/login")}
            ></ButtonForm>
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
  selectedMenu?: number;
}
const HeaderBodyBar = ({
  searchBarOn = true,
  defaultValue = "",
  backgroundOn = true,
  selectedMenu = -1,
}: HeaderBodyProps) => {
  const navigate = useNavigate();
  const islogin = useRecoilValue(LoginState);
  return (
    <HeaderBodyWrapper backgroundOn={backgroundOn}>
      <HeaderBody>
        <a
          href="/"
          style={{ height: "70px", display: "flex", alignItems: "center" }}
        >
          <Logo style={{ width: "80px", height: "50px" }} />
        </a>
        <HeaderBodyMenu>
          <HeaderBodyMenuItem
            onClick={() => navigate("/attractions")}
            selected={selectedMenu === 0}
          >
            명소
          </HeaderBodyMenuItem>
          <HeaderBodyMenuItem
            onClick={() => navigate("/posts")}
            selected={selectedMenu === 1}
          >
            포스트
          </HeaderBodyMenuItem>
          <HeaderBodyMenuItem
            onClick={() => navigate("/map")}
            selected={selectedMenu === 2}
          >
            내 주변 명소 찾기
          </HeaderBodyMenuItem>
        </HeaderBodyMenu>
        {searchBarOn && (
          <SearchBarWrapper>
            <SearchBar defaultValue={defaultValue} />
          </SearchBarWrapper>
        )}
        {islogin && (
          <Profile onClick={() => navigate("/mypage")}>
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
  ref?: React.RefObject<HTMLHeadElement>;
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
