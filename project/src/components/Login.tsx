import React from 'react';
import styled from 'styled-components';

interface TextProps {
    fontSize: string;
    color: string;
    fontweight: string;
}
interface PaddingProps {
    padding: string;
}

const Wraoper = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 1px solid black;

    > .logincontainer{
    width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 30px 0px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: all 0.5s;
    }
    > .signincontainer{
        width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: all 0.5s;
    
    }
    > .leftoverlay{
        width: 50%;
    height: 100%;
    border: 1px solid red;
    opacity: 1;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--purple-300);
    transition: all 0.5s;
    justify-content: center;
    color: white;

    }
    > .rightoverlay{
        width: 50%;
    height: 100%;
    border: 1px solid red;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--purple-300);
    transition: all 0.5s;
    justify-content: center;
    color: white;
    }
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


const InputPadding = styled.label`
    width: 30px;
    height: 45px;
    padding-bottom: 15px;
    padding-left: 15px;
    border-bottom: 1px solid var(--black-400);
    color: var(--black-500);
    
`
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
// transform: translateX(100%);

const Login  =  () => {
    return (
     <Wraoper>
            {/* <div>
            <InputPadding>이메일</InputPadding>
            <InputStyle placeholder='이메일'></InputStyle>
            </div> */}
        <div className='logincontainer'>
            <TextStyle color="#6154F8" fontSize='45px' fontweight='bold'>로그인</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <GButton>G</GButton>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold'>SNS 계정으로 로그인</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <InputStyle placeholder='이메일'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 이메일 형식이 아닙니다.</TextStyle>
            <InputStyle placeholder='비밀번호'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호를 8자이상 입력해주세요.</TextStyle>
            <CustomPadding padding='50px 0px 0px 0px'></CustomPadding>
            <LoginButton2>로그인</LoginButton2>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold' >계정정보를 잊으셨나요?</TextStyle>
        </div>
        <div className='signincontainer'>
            <TextStyle color="#6154F8" fontSize='45px' fontweight='bold'>회원가입</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>
            <GButton>G</GButton>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold'>SNS 계정으로 가입하기</TextStyle>
            <InputStyle placeholder='이메일'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 이메일 형식이 아닙니다.</TextStyle>
            <InputStyle placeholder='비밀번호'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호를 8자이상 입력해주세요.</TextStyle>
            <InputStyle placeholder='비밀번호확인'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>비밀번호가 다릅니다.</TextStyle>
            <InputStyle placeholder='전화번호'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>올바른 전화번호 형식이 아닙니다.<div className=""></div></TextStyle>
            <InputStyle placeholder='주소'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>서울시 OO구 형식이 아닙니다.</TextStyle>
            <InputStyle placeholder='닉네임'></InputStyle>
            <TextStyle color="black" fontSize='18px' fontweight='normal'>3글자 이상 입력해주세요.<div className=""></div></TextStyle>
            <CustomPadding padding='50px 0px 0px 0px'></CustomPadding>
            <LoginButton2>회원가입</LoginButton2>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>
            <TextStyle color="#6154F8" fontSize='22px' fontweight='bold' >계정정보를 잊으셨나요?</TextStyle>
        </div>

        <div className='leftoverlay'>
            <TextStyle color="white" fontSize='25px' fontweight='normal'>welcome to the</TextStyle>
            <LogoLogo>pickcha</LogoLogo>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>

            <TextStyle color="white" fontSize='40px' fontweight='normal'>사진찍기 가장 좋은 장소는 어디일까요?</TextStyle>
            <CustomPadding padding='30px 0px 0px 0px'></CustomPadding>

            <TextStyle color="white" fontSize='18px' fontweight='normal'>pickcha에서 명소부터 포스트까지</TextStyle>
            <TextStyle color="white" fontSize='18px' fontweight='normal'>다양한 정보를 통해 나만의 사진을 찍어보세요.</TextStyle>
            <CustomPadding padding='70px 0px 0px 0px'></CustomPadding>

            <TextStyle color="white" fontSize='18px' fontweight='bold'>이미 회원이시라면?</TextStyle>
            <CustomPadding padding='20px 0px 0px 0px'></CustomPadding>  

            <LoginButton>로그인</LoginButton>
        </div>
        <div className='rightoverlay'>
        <div>welcome to the</div>
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
            <LoginButton>회원가입</LoginButton>
        </div>
     </Wraoper>
    );
  }
  
  export default Login;
  