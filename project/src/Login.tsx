import React from 'react';
import styled from 'styled-components';

const Wraoper = styled.section`
    width: 100%;
    height: 877px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid black;
`
const LoginContainer = styled.div`
    width: 50%;
    height: 877px;
    border: 1px solid red;

`
const SignInContainer = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;


`


const Login = () => {
    return (
     <Wraoper>
        <LoginContainer>왼쪽</LoginContainer>
        <SignInContainer>오른쪽</SignInContainer>
     </Wraoper>
    );
  }
  
  export default Login;
  