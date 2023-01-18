import React, { useRef, useState } from "react";
import styled from "styled-components";
import QuillEditor from "../components/QuillEditor";

const AddPostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3em;

  form {
    width: 100%;
    height: 80vh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: var(--br-m);

    > textarea {
      min-height: 64px;
      resize: none;
      font-size: var(--font-xl);
      padding-top: 20px;
      padding-left: 10px;
    }
    .ql-container.ql-snow {
      border: none;
    }
  }
`;
const TagWrapper = styled.div`
  width: 100%;
  min-height: 40px;

  > input {
    min-height: 100%;
    padding-left: 10px;
    font-size: var(--font-base);
    border: none;
    outline: none;
  }
`;

const AddPost = () => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const tagMakeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.code === "Space" || e.key === "Enter") {
      if (tag === "" || tag === " ") setTag("");
      else if (tags.length >= 5)
        return alert("태그는 5개 이하까지만 사용할 수 있습니다.");
      else setTags([...tags, tag]);
      setTag("");
      console.log(tags);
    }
  };
  const noRemoveTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e);
    }
    if (e.key === "Backspace") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const TagButton = ({ tag, idx }: { tag: string; idx: number }) => {
    const removeClickTagHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTags(tags.filter((_, i) => i !== idx));
    };
    return (
      <TagBox>
        <span>{tag} </span>
        <button onClick={(e) => removeClickTagHandler(e)}>
          <svg width="14" height="14" fill="hsl(237.931, 43%, 87%)">
            <path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
          </svg>
        </button>
      </TagBox>
    );
  };
  return (
    <AddPostWrapper>
      <form>
        <textarea placeholder="제목을 입력하세요." />
        <TagWrapper>
          {tags.map((tag, idx) => (
            <TagButton tag={tag} key={idx} idx={idx}></TagButton>
          ))}
          <input
            type="text"
            value={tag}
            onKeyUp={(e) => tagMakeHandler(e)}
            onKeyDown={(e) => noRemoveTagHandler(e)}
            onChange={(e) => setTag(e.target.value)}
            placeholder={tags.length ? "" : "태그를 입력해주세요!"}
          ></input>
        </TagWrapper>
        <QuillEditor />
      </form>
    </AddPostWrapper>
  );
};
const TagBox = styled.span`
  padding: 5px 7px;
  border: none;
  background-color: transparent;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-s);
  margin: 0 10px;
  font-size: var(--font-xs);

  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
  button {
    border: none;
    background-color: transparent;
  }
  svg {
    padding-top: 3px;
  }
`;

export default AddPost;
