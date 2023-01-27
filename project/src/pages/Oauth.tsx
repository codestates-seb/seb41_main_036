import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
} from "recoil";
import { LoginState, AuthToken, LoggedUser } from "../recoil/state";

const Oauth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [isToken, setToken] = useRecoilState(AuthToken);

  useEffect(() =>  {
    const query = window.location.search;
    const param = new URLSearchParams(query);
    
    const getaccessToken = param.get("accessToken");
    const getId = param.get("id");

    // console.log("팔람팔람팔람:",param)
    // console.log("퀄퀄:",query)
    // console.log("토토토토토토 :", getaccessToken)

    localStorage.setItem("Authorization",`Bearer ${getaccessToken}`)
    localStorage.setItem("memberId", `${getId}`)
    localStorage.setItem("loginStatus",`true`)
    setIsLogin(true);
    setToken(`Bearer ${getaccessToken}`);

    window.location.replace("/")
    ;
  } ,[]
  )
  return <></>
};

export default Oauth;