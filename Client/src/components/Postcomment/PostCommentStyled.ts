import styled from "styled-components";

export const PostCommentWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
`;

export const PostCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const PostCommentTitle = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const PostCommentImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: var(--br-l);
  margin-right: 10px;
`;

export const PostCommentUserName = styled.span`
  font-size: var(--font-sm);
  font-weight: var(--fw-bold);
  margin-bottom: 3px;
`;

export const PostCommentDate = styled.span`
  font-size: var(--font-xxs);
`;

export const PostCommentContentContainer = styled.div`
  padding-left: 2.5em;
  border-bottom: 1px solid var(--black-600);
  padding-bottom: 20px;
`;

export const PostManageButtonContainer = styled.div`
  display: flex;
`;

export const PostManageButton = styled.button`
  min-width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
  font-size: var(--font-sm);
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const PostCommentInputContainer = styled.form<{
  padding: string;
  width: string;
  height: string;
}>`
  padding: ${(props) => props.padding};
  > textarea {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: flex;
    resize: none;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--purple-300);
    font-size: var(--font-base);
    &:focus {
      outline-color: var(--purple-400);
      box-shadow: 0 0 6px var(--purple-300);
    }
  }
`;
