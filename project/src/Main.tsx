import styled from 'styled-components';
import Login from './components/Login';
import KakaoMap from './components/KakaoMap';


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
    <Body>    </Body>
    <Footer>footer</Footer>
    </>
  )
}

export default Main;