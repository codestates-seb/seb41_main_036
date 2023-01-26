import styled from 'styled-components';
import Login from '../components/Login';
import FixedOnScrollUpHeader from "../components/Header/HiddenHeader";
<<<<<<< HEAD
import { Header } from "../components/Header/index";

=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

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
<<<<<<< HEAD
          <Header>
        <Header.HeaderBody />
      </Header>
=======
      <FixedOnScrollUpHeader/>
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
    <Body> 
      <Login />
    </Body>
    <Footer>footer</Footer>
    </>
  );
}

export default LoginSign;
