import { ReactComponent as NoAddressIcon } from "../data/NoAddressillustration.svg";
import { ReactComponent as NotFoundIcon } from "../data/NotFound.svg";
import styled, { keyframes } from "styled-components";
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

const EmptyNotificationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    transition: animation 1s ease;
    width: 250px;
    :hover {
      animation: ${Move} 1s ease infinite alternate;
    }
  }
  h2 {
    padding-top: 20px;
    margin-bottom: 20px;
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

interface NotificationProps {
  type: string;
  message: string;
}

const Notification = ({ type, message }: NotificationProps) => {
  return (
    <EmptyNotificationWrapper>
      {type === "noAddress" && <NoAddressIcon />}
      {type === "notFound" && <NotFoundIcon />}
      <h2>{message}</h2>
    </EmptyNotificationWrapper>
  );
};
export default Notification;
