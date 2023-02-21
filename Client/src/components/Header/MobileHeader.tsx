import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../data/Logo.svg";

// 헤더의 큰 프레임
const HeaderBox = styled.div`
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  background-color:white;
`

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

const LogoWindow = styled.div`
  width: 100px;
  height: 50px;
  margin: 0 auto;
`
const Button = styled.div`
  background-color: #565656;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color:white;
  margin: auto 10px;
  border-radius: 30px;
  font-size: 14px;
`



const MobileHeader = () => {

  const [isNavbarChecked, setIsNavbarChecked] = useState(false);

  return (
    <>
      <HeaderBox>
        <MenuBar 
          isChecked={isNavbarChecked}
          onClick={()=>{setIsNavbarChecked(!isNavbarChecked); console.log(isNavbarChecked)}}
          >
          <input type="checkbox"></input>
          <label>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </MenuBar>
        <LogoWindow>
          <Logo style={{ width: "75px", height: "50px", color:"white", margin:"auto"}}></Logo>
        </LogoWindow>
        <Button>로그인</Button>
      </HeaderBox>
    </>
  )
}

export default MobileHeader;