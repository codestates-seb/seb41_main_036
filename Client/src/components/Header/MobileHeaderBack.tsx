import styled from "styled-components";
import { ReactComponent as Logo } from "../../data/Logo.svg";
import { Link, useNavigate } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';


// 헤더의 큰 프레임
const HeaderBox = styled.div`
  width: 100%;
  height: 45px;
  //border-bottom: 1px solid #c7c7c7;
  display: flex;
  background-color:white;
`
const BackIcon = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px 10px;
  cursor: pointer;
`

// 로고 이미지
const LogoWindow = styled.div`
  margin: 0 auto;
  padding: 0 0 0 50px;
  cursor: pointer;
`

// 로그인 버튼
const LoginButton = styled.div`
  background-color: #565656;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color:white;
  margin: auto 10px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
`
interface HeaderType {
  isNavbarChecked:boolean;
  setIsNavbarChecked:any;
}

const MobileHeaderBack = (
  {isNavbarChecked,setIsNavbarChecked}:HeaderType) => {

    const nav = useNavigate();

  return (
    <>
      <HeaderBox>
      <BackIcon onClick={()=>{nav(-1)}}>
        <BiArrowBack size={35}></BiArrowBack>
      </BackIcon>
        <LogoWindow>
          <Link to ='/'>
            <Logo style={ {width: "75px", height: "50px" , position:"absolute", left:"40%"} }></Logo>
          </Link>
        </LogoWindow>
        <LoginButton><Link to='/login'>로그인</Link></LoginButton>
      </HeaderBox>
    </>
  )
}

export default MobileHeaderBack;