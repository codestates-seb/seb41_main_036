import styled from 'styled-components';

const Ouathbutton = styled.div`
  .goolobutton,
  .kakaobutton {
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 38px;
    font-size: var(--font-13);
    margin-top: 10px;
    > img {
      margin-right: 10px;
    }
  }
  .goolobutton {
    cursor: pointer;
    background-color: #fff;
    color: #3b4045;
    margin-top: 30px;
  }
  .kakaobutton {
    cursor: pointer;
    background-color: #fee500;
    color: #000;
  }
`;

export default Ouathbutton;