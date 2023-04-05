import { TfiClose } from "react-icons/tfi";
import { Dispatch, SetStateAction } from "react";
import * as wp from "../../pages/WritePost/WritePostStyled";

const CreateTag = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}) => {
    
  const handleTagRemover = (selectTag: number) => {
    setTags(tags.filter((_, tag) => selectTag !== tag));
  };

  return (
    <>
      {tags.map((tag, idx) => (
        <wp.TagBox>
          {tag}
          <TfiClose
            cursor="pointer"
            size="0.7rem"
            fontWeight="bold"
            onClick={() => handleTagRemover(idx)}
          />
        </wp.TagBox>
      ))}
    </>
  );
};

export default CreateTag;
