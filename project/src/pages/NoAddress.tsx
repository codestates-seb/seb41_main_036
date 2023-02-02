import styled, { keyframes } from "styled-components";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";
const Move = keyframes`
  0% {
    transform: translate(0,0);
  }
  50%{
    transform:translate(0px, 5px)
  }
  75%{
    transform:translate(1px,2px)
  }
  100% {
    transform: translate(-px, -2px);
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const EmptyNotificationWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    transition: animation 1s ease;
    :hover {
      animation: ${Move} 1s ease infinite alternate;
    }
  }
  h2 {
    padding-top: 20px;
    font-size: var(--font-sm);
    font-weight: var(--fw-reg);
    color: var(--black-680);
    letter-spacing: 0.2rem;
  }
  a {
    margin-top: 15px;
    background-color: var(--black-250);
    letter-spacing: 0.2rem;
    font-size: var(--font-xs);
    padding: 10px 15px 10px 18px;
    border-radius: 50px;
    color: var(--black-700);
  }
`;
const NoAddress = () => {
  return (
    <Wrapper>
      <EmptyNotificationWrapper>
        <Notification type="noAddress" message="존재하지 않는 주소입니다" />
        <Link to={"/"}>홈으로 돌아가기</Link>
      </EmptyNotificationWrapper>
    </Wrapper>
  );
};
export default NoAddress;
