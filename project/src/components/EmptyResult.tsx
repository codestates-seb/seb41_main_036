import styled from "styled-components";
import { ReactComponent as NoSearchResultIcon } from "../data/NoSearchResult.svg";

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02rem;
  width: 100%;
  svg {
    padding-top: 10px;
    opacity: 0.8;
  }
  h3 {
    color: var(--black-700);
    padding: 0px 0 10px;
    font-size: var(--font-sm);
  }
  p {
    color: var(--black-700);
    font-size: var(--font-xs);
    margin-bottom: 53px;
  }
`;

interface EmptyResultProps {
  message?: string;
  subtitle?: boolean;
}
const EmptyResult = ({ message, subtitle = true }: EmptyResultProps) => {
  return (
    <Notification>
      <NoSearchResultIcon />
      <h3>{message}</h3>
      {subtitle && <p>첫번째 포스트를 남겨주세요</p>}
    </Notification>
  );
};

export default EmptyResult;
