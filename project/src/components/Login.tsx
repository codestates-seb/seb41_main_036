import React, { useState } from 'react';
import styled from 'styled-components';
// import {useState, useEffect} from "react"

interface TextProps {
    fontSize: string;
    color: string;
    fontweight: string;
}
interface PaddingProps {
    padding: string;
}
interface OverlayProps {
    overlay: boolean;
}

const Wraoper = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`
const Logincontainer  =styled.div<OverlayProps>`
    width: 40%;
    height: 100%;
    border-radius: ${(props) => props.overlay ? '30px 0px 0px 30px': '0px 30px 30px 0px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: all 0.5s;
    position: absolute;
    z-index: ${(props) => props.overlay ? '1': '0'};
    transform: ${(props) => props.overlay ? 'translateX(-50%)': 'translateX(50%)'};
    `
const Signincontainer = styled.div<OverlayProps>`
    width: 40%;
    height: 100%;
    border-radius: ${(props) => props.overlay ? '30px 0px 0px 30px': '0px 30px 30px 0px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: all 0.5s;
    position: absolute;
    z-index: ${(props) => props.overlay ? '0': '1'};
    transform: ${(props) => props.overlay ? 'translateX(-50%)': 'translateX(50%)'};
    `
const Leftoverlay = styled.div<OverlayProps>`
    width: 40%;
    height: 100%;
    border-radius: ${(props) => props.overlay ? '0px 30px 30px 0px': '30px 0px 0px 30px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--purple-300);
    transition: all 0.5s;
    justify-content: center;
    color: white;
    position: absolute;
    z-index: ${(props) => props.overlay ? '0': '1'};
    transform: ${(props) => props.overlay ? 'translateX(50%)': 'translateX(-50%)'};
`
const Rightoverlay = styled.div<OverlayProps>`
    width: 40%;
    height: 100%;
    border-radius: ${(props) => props.overlay ? '0px 30px 30px 0px': '30px 0px 0px 30px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--purple-300);
    transition: all 0.5s;
    justify-content: center;
    color: white;
    position: absolute;
    z-index: ${(props) => props.overlay ? '1': '0'};
    transform: ${(props) => props.overlay ? 'translateX(50%)': 'translateX(-50%)'};
`
const LoginButton = styled.button`
    width: 180px;
    height: 60px;
    background-color: var(--purple-300);
    border-radius: 30px;
    border: 1px solid white;
    color: white;
    font-size: 24px;
    &:hover {
        background-color: white;
        color: var(--purple-300)
    }
`
const LoginButton2 = styled.button`
    width: 180px;
    height: 60px;
    background-color: var(--purple-300);
    border-radius: 30px;
    border: 0px white;
    color: white;
    font-size: 24px;
    &:hover {
        background-color: var(--purple-400);
    }
`
const GButton = styled.button`
    width: 50px;
    height: 50px;
    border: 0px;
    border-radius: 35px;
    background-color: var(--purple-300);
    border-radius: 30px;
    color: white;
    font-size: 20px;
    &:hover {
        background-color: var(--purple-400);
    }
`
// const InputPadding = styled.label`
//     width: 30px;
//     height: 45px;
//     padding-bottom: 15px;
//     padding-left: 15px;
//     border-bottom: 1px solid var(--black-400);
//     color: var(--black-500);
    
// `
const InputStyle = styled.input`
    width: 62%;
    height: 45px;   
    border: 0px;
    border-bottom: 1px solid var(--black-400);
    padding-top: 10px;
    padding-left: 10px;
    &:focus {
        outline: none;
        border-bottom: 1px solid var(--black-600);
    }
`
const TextStyle = styled.div<TextProps>`
    font-size: ${(props) => props.fontSize};
    color: ${(props)=>props.color};
    font-weight: ${(props)=>props.fontweight};
    padding-top: 10px;
`
const CustomPadding = styled.div<PaddingProps>`
    padding: ${(props)=>props.padding};
`
const LogoLogo = styled.div`
    width: 330px;
    height: 80px;
    border: 1px solid black;
    background-color: white;
    color: black;
    font-size: 50px;
`

const Login  =  () => {
    const [overlays, setOverlays] = useState(false)
    const [loginemail, setLoginEmail] = useState('')
    const [loginemailErr, setLoginEmailErr] = useState(false);
    const [signemail, setSignEmail] = useState('')
    const [signemailErr, setSignEmailErr] = useState(false);
    const [signpassword, setSignPassword] = useState('')
    const [signpasswordErr, setSignPasswordErr] = useState(false);
    const [loginpassword, setLoginPassword] = useState('')
    const [loginpasswordErr, setLoginPasswordErr] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [phonenumber, setPhonenumber] = useState('')
    const [phonenumberErr, setPhonenumberErr] = useState(false)

    // const [nickname, setNickname] = useState('')
    // const [address, setAddress] = useState('')

    const onClickBtn = (e:React.MouseEvent<HTMLButtonElement>) =>{
        setOverlays(!overlays)
    }
    const handleLoginEmailChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    if (EMAIL_REGEX.test(e.target.value)) {
        setLoginEmailErr(false);
    } else {
        setLoginEmailErr(true);
    }
    setLoginEmail(e.target.value);
    };

    const handleSignEmailChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
        if (EMAIL_REGEX.test(e.target.value)) {
            setSignEmailErr(false);
        } else {
            setSignEmailErr(true);
        }
        setSignEmail(e.target.value);
        };

    const handleLoginPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.value.length >= 8) {
            setLoginPasswordErr(false);
        } else {
            setLoginPasswordErr(true);
        }
        setLoginPassword(e.target.value);
        };

    const handleSignPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.value.length >= 8) {
            setSignPasswordErr(false);
            } else {
            setSignPasswordErr(true);
        }
        setSignPassword(e.target.value);
        };

    const handlePasswordConfirm = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value)
    }

    const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const PHONE_REGEX = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;
            if (PHONE_REGEX.test(e.target.value)) {
                setPhonenumberErr(false);
            } else {
                setPhonenumberErr(true);
            }
            setPhonenumber(e.target.value);
            };


    return (
        <Wraoper>
            {/* <div>
            <InputPadding>이메일</InputPadding>
            <InputStyle placeholder='이메일'></InputStyle>
        </div> */}
        <Logincontainer overlay={overlays}>
            <TextStyle color="#6154F8" fontSize='45px' fontweight='bold'>로그인</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <GButton>G</GButton>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold'>SNS 계정으로 로그인</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <InputStyle placeholder='이메일' onChange={handleLoginEmailChange}></InputStyle>
            {loginemailErr ? (
                <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 이메일 형식이 아닙니다.</TextStyle>
                ): <></>}
            <InputStyle placeholder='비밀번호' onChange={handleLoginPasswordChange}></InputStyle>
            {loginpasswordErr ?(
                <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호를 8자이상 입력해주세요.</TextStyle>
            ): <></>}
            <CustomPadding padding='50px 0px 0px 0px'></CustomPadding>
            <LoginButton2>로그인</LoginButton2>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold' >계정정보를 잊으셨나요?</TextStyle>
        </Logincontainer>
        <Signincontainer overlay={overlays}>
            <TextStyle color="#6154F8" fontSize='45px' fontweight='bold'>회원가입</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <GButton>G</GButton>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold'>SNS 계정으로 가입하기</TextStyle>
            <InputStyle placeholder='이메일' onChange={handleSignEmailChange}></InputStyle>
            {signemailErr ? (
                <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 이메일 형식이 아닙니다.</TextStyle>
                ): <></>}
            <InputStyle placeholder='비밀번호' onChange={handleSignPasswordChange}></InputStyle>
            {signpasswordErr ?(
                <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호를 8자이상 입력해주세요.</TextStyle>
            ): <></>}
            <InputStyle placeholder='비밀번호확인' onChange={handlePasswordConfirm}></InputStyle>
            {passwordConfirm === signpassword ? <></> :(
                <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호가 다릅니다.</TextStyle>
            )}
            <InputStyle placeholder='전화번호(-를 포함해서 입력해주세요)' onChange={handlePhoneChange}></InputStyle>
            {phonenumberErr ? (
                <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 전화번호 형식이 아닙니다.<div className=""></div></TextStyle>
            ):<></>}
            <InputStyle placeholder='주소'></InputStyle>
            {/* <TextStyle color="black" fontSize='18px' fontweight='normal'>서울시 OO구 형식이 아닙니다.</TextStyle> */}
            <InputStyle placeholder='닉네임'></InputStyle>
            {/* <TextStyle color="black" fontSize='18px' fontweight='normal'>3글자 이상 입력해주세요.<div className=""></div></TextStyle> */}
            <CustomPadding padding='50px 0px 0px 0px'></CustomPadding>
            <LoginButton2>회원가입</LoginButton2>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold' >계정정보를 잊으셨나요?</TextStyle>
        </Signincontainer>
        <Leftoverlay overlay={overlays}>
            <TextStyle color="white" fontSize='25px' fontweight='normal'>welcome to the</TextStyle>
            <LogoLogo>pickcha</LogoLogo>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='30px' fontweight='normal'>사진찍기 가장 좋은 장소는 어디일까요?</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='18px' fontweight='normal'>pickcha에서 명소부터 포스트까지</TextStyle>
            <TextStyle color="white" fontSize='18px' fontweight='normal'>다양한 정보를 통해 나만의 사진을 찍어보세요.</TextStyle>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='18px' fontweight='bold'>이미 회원이시라면?</TextStyle>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>  
            <LoginButton onClick={onClickBtn}>로그인</LoginButton>
        </Leftoverlay>
        <Rightoverlay overlay={overlays}>
            <TextStyle color="white" fontSize='25px' fontweight='normal'>welcome to the</TextStyle>
            <LogoLogo>pickcha</LogoLogo>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='30px' fontweight='normal'>사진찍기 가장 좋은 장소는 어디일까요?</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='18px' fontweight='normal'>pickcha에서 명소부터 포스트까지</TextStyle>
            <TextStyle color="white" fontSize='18px' fontweight='normal'>다양한 정보를 통해 나만의 사진을 찍어보세요.</TextStyle>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>
            <TextStyle color="white" fontSize='18px' fontweight='bold'>아직 회원이 아니신가요?</TextStyle>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>
            <LoginButton onClick={onClickBtn}>회원가입</LoginButton>
        </Rightoverlay>
    </Wraoper>
    );
}

export default Login;