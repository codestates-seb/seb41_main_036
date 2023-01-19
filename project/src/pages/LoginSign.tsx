import styled from 'styled-components';
import Login from '../components/Login';
import HiddenHeader from "../components/Header/HiddenHeader";

// import GoogleLogIn from '../components/GoogleLogin';

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
`;

const Footer = styled.div`
  width: 100%;
  background-color: skyblue;
  height: 157px;
`;

function LoginSign() {
  
  return (
    <>
      <HiddenHeader/>
    <Body> 
      <Login />
    </Body>
    <Footer>footer</Footer>
    </>
  );
}

export default LoginSign;
