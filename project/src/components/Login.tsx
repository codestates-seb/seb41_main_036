import React from 'react';
import styled from 'styled-components';

const Wraoper = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 1px solid black;
`
const LoginContainer = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 30px 0px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: pink;
    transition: all 0.5s;
    
`   
const SignInContainer = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
    transition: all 0.5s;

`

const LeftOverlay = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;
    /* position: absolute; */
    opacity: 1;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    background-color: green;
    transition: all 0.5s;
    /* transform: translateX(50%); */

`
const RightOverlay = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    background-color: skyblue;
    transition: all 0.5s;
`
// transform: translateX(100%);


const Login = () => {
    return (
     <Wraoper>
        <LoginContainer>
            <div>로그인</div>
            <div>구글버튼</div>
            <div>SNS 계정으로 로그인</div>
            <input></input>
            <input></input>
            <button>로그인</button>
            <div>로그인 잊음?</div>


        </LoginContainer>
        <SignInContainer>
            <div>회원가입</div>
            <div>구글버튼</div>
            <div>SNS 계정으로 가입하기</div>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <input></input>
            <button>회원가입</button>
            <div>비밀번호 잊음?</div>
        </SignInContainer>
        <LeftOverlay>
            <div>welcome to the</div>
            <div>로고</div>
            <div>사진찍기 가장 좋은 장소는 어디일까요?</div>
            <div>pickcha에서 명소부터 포스트까지</div>
            <div>다양한 정보를 통해 나만의 사진을 찍어보세요,</div>
            <div>이미 회원이시라면?</div>
            <button>로그인</button>
        </LeftOverlay>
        <RightOverlay>
        <div>welcome to the</div>
            <div>로고</div>
            <div>사진찍기 가장 좋은 장소는 어디일까요?</div>
            <div>pickcha에서 명소부터 포스트까지</div>
            <div>다양한 정보를 통해 나만의 사진을 찍어보세요,</div>
            <div>아직 회원이 아니시라면?</div>
            <button>회원가입</button>
        </RightOverlay>
     </Wraoper>
    );
  }
  
  export default Login;
  