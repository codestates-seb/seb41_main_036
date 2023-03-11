import styled from "styled-components";
import { ReactComponent as Logo } from "../../data/Logo.svg";
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// 헤더의 큰 프레임
const HeaderBox = styled.div`
  width: 100%;
  height: 45px;
  //border-bottom: 1px solid #c7c7c7;
  display: flex;
  background-color:white;
`
// 햄버거 메뉴바
const MenuBar = styled.div<{isChecked:boolean}>`
  width: 40px;
  margin:10px 0 10px 10px;
  cursor: pointer;

  >input{
    display: none;
  }

  >label{
    position: relative;
    display: block;

    > span{
    position: absolute;
    height: 3px;
    border-radius: 5px;
    width: 25px;
    display: block;
    background: #aa7474;
    margin: 5px;
    transition: all 600ms;
    background-color: black;
    cursor: pointer;

    :nth-child(1){
        top: ${(props)=> props.isChecked? '5px' : '-3px' };
        transform: ${(props) => props.isChecked? 'translate(0, -50%)' : null};
        transform: ${(props)=> props.isChecked ? 'rotate(45deg)' : null};
      }
    
    :nth-child(2){
      opacity: ${(props)=> props.isChecked ? '0' : null};
      top:${(props)=> props.isChecked? null : '6px'};
      transform: ${(props)=> props.isChecked ? null : 'translate(0,-50%)'}
    }

    :nth-child(3){
      top: ${(props)=> props.isChecked? '5px' : '13px' };
      transform: ${(props) => props.isChecked? 'translate(0, -50%)' : null};
      transform: ${(props)=> props.isChecked ? 'rotate(-45deg)' : null};
    }
  }
}
`
// 로고 이미지
const LogoWindow = styled.div`
  margin: 0 auto;
  padding: 0 0 0 50px;
  cursor: pointer;
`
// 검색창 아이콘 버튼 -> 누르면 검색창 출력
const SearchButton = styled.div`
  width: 40px;
  height: 50px;
  cursor: pointer;
  padding: 8px;
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

const MobileHeader = (
  {isNavbarChecked,setIsNavbarChecked}:HeaderType) => {

  return (
    <>
      <HeaderBox>
        <MenuBar 
          isChecked={isNavbarChecked}
          onClick={()=>{setIsNavbarChecked(!isNavbarChecked)}}
          >
          <input type="checkbox"></input>
          <label>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </MenuBar>
        <LogoWindow>
          <Link to ='/'>
            <Logo style={ {width: "75px", height: "50px" , position:"absolute", left:"40%"} }></Logo>
          </Link>
        </LogoWindow>
        {!isNavbarChecked?
        <SearchButton>
          <BsSearch size="28"></BsSearch>
        </SearchButton>:null}
        <LoginButton><Link to='/login'>로그인</Link></LoginButton>
      </HeaderBox>
    </>
  )
}

export default MobileHeader;