<<<<<<< HEAD
=======
import SearchBar from "./SearchBar";
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
import {
  HeaderWrapper,
  HeaderTop,
  HeaderTopMenu,
  HeaderBody,
  HeaderBodyMenu,
  HeaderBodyWrapper,
  SearchBarWrapper,
  Profile,
<<<<<<< HEAD
} from "./style"; 
// import { ReactComponent as Logo } from "./../../data/Templogo.svg";
import { useNavigate } from "react-router-dom";
=======
} from "./style";
import { useNavigate } from 'react-router-dom';
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoginState,
  AuthToken,
<<<<<<< HEAD
  LoggedUser,
} from "../../recoil/state";
import ButtonForm from "../Button";
import { lazy, ReactNode, MouseEventHandler } from "react";
const SearchBar = lazy(() => import("./SearchBar"));

=======
  RefreshToken,
  LoggedUser,}
  from '../../recoil/state'
  import axios from "axios";
  import Button from "../Button"




// import { ReactComponent as Logo } from "./../../data/Templogo.svg";
import { ReactNode, MouseEventHandler } from "react";
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
const IMG_SRC =
  "https://drive.google.com/uc?id=1OmsgU1GLU9iUBYe9ruw_Uy1AcrN57n4g";

const HeaderTopBar = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [isLogin, setIslogin] = useRecoilState(LoginState);
  const [auth, setAuth] = useRecoilState<string>(AuthToken);
  const [loggedUser, setLoggedUser] = useRecoilState<string>(LoggedUser);

  const onClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIslogin(false);
    setAuth("");
    setLoggedUser("")
    localStorage.removeItem("authorization")
    localStorage.setItem("loginStatus", "false")
    localStorage.removeItem("memberId")
    navigate('/')
  };

=======
  const [isLogin, setIslogin] = useRecoilState<boolean>(LoginState);
  const [auth, setAuth] = useRecoilState<string>(AuthToken);
  const [rafresh, setRefresh] = useRecoilState<string>(RefreshToken);
  const [loggedUser, setLoggedUser] = useRecoilState<string>(LoggedUser);
  
  const onClickLogout = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIslogin(false);
    axios.defaults.headers.common["authorization"] = "";
    axios.defaults.headers.common["refreshtoken"] = "";
    setAuth("");
    setRefresh("");
    setLoggedUser("")
    navigate('/')
  }
  
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  return (
    <HeaderTop>
      <HeaderTopMenu>
        {isLogin ? (
          <>
<<<<<<< HEAD
            <li>
            <ButtonForm
          width="70px"
          height="1px"
          text="마이페이지"
          type="none"
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
=======
            <li>마이페이지</li>
            <li>
              <button onClick={onClickLogout}>로그아웃</button>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
            </li>
          </>
        ) : (
          <li>
<<<<<<< HEAD
            <ButtonForm
          width="100px"
          height="1px"
          text="로그인 / 회원가입"
          type="none"
          onClick={()=>navigate('/login')}
        ></ButtonForm>
=======
            <button onClick={()=>navigate('/login')}>로그인/회원가입</button>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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
<<<<<<< HEAD
  const islogin = useRecoilValue(LoginState);
=======
  const islogin = useRecoilValue(LoginState) 
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
  return (
    <HeaderBodyWrapper backgroundOn={backgroundOn}>
      <HeaderBody>
        <a href="/">
          <div style={{ width: "200px", height: "70px" }} />
        </a>
        <HeaderBodyMenu>
<<<<<<< HEAD
          <li onClick={() => navigate("/attractions")}>명소</li>
          <li onClick={() => navigate("/posts")}>방문리뷰</li>
          <li onClick={() => navigate("/map")}>내 주변 명소 찾기</li>
=======
          <li onClick={()=>navigate('/place')}>명소</li>
          <li onClick={()=>navigate('/post')}>방문리뷰</li>
          <li onClick={()=>navigate('/map')}>내 주변 명소 찾기</li>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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
