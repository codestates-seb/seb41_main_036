import React, { Dispatch, SetStateAction, useState } from "react";
import CreateTag from "./CreateTag";
import * as wp from "../../pages/WritePost/WritePostStyled";

const Tag = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}) => {
  const [tag, setTag] = useState<string>("");

  const tagMakeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tag === "" || tag === " ") setTag("");
      else if (tags.length >= 5)
        alert("태그는 5개 이하까지만 사용할 수 있습니다.");
      else setTags([...tags, tag]);
      setTag("");
    }
  };
  return (
    <wp.TagWrapper>
      {tags.length !== 0 ? (
        <CreateTag tags={tags} setTags={setTags}></CreateTag>
      ) : null}
      <input
        type="text"
        value={tag}
        onKeyUp={(e) => tagMakeHandler(e)}
        onChange={(e) => setTag(e.target.value)}
        placeholder={tags.length ? "" : "태그를 입력해주세요!"}
      />
    </wp.TagWrapper>
  );
};

export default Tag;
