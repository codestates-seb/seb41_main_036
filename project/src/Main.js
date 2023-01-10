import styled from 'styled-components';
<<<<<<< HEAD:project/src/Main.js
import Login from './Login';

=======
import KakaoMap from './components/KakaoMap';
>>>>>>> cbaf6d28420ae207b39a6c6c877af04f2b5d253b:project/src/Main.tsx


const Header = styled.div`
  width:100% ;
  background-color: pink;
  height: 157px;
`

const Body = styled.div`
  background-color: orange;
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
`

const Footer = styled.div`
  width:100% ;
  background-color: skyblue;
  height: 157px;
`

function Main () {
  return(
    <>
    <Header>header헤더</Header>
    <Body>
      <Login>

      </Login>
    </Body>
    <Footer>footer</Footer>
    </>
  )
}

export default Main;