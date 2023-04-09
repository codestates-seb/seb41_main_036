import { TfiClose } from "react-icons/tfi";
import * as wp from "../../pages/Write_EditPost/Write_EditPostStyled";
import { useRecoilState } from "recoil";
import { PostTags } from "../../recoil/WritePostState";

export default function CreateTag() {
  const [tags, setTags] = useRecoilState(PostTags);

  const handleTagRemover = (selectTag: number) => {
    setTags(tags.filter((_, tag) => selectTag !== tag));
  };

  return (
    <>
      {tags.map((tag, idx) => (
        <wp.TagBox key={tag}>
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
}
