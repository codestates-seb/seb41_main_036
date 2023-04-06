import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { PostContent, PostPreviewList } from "../../recoil/WritePostState";
import * as wp from "../../pages/WritePost/WritePostStyled";

export default function ContentRegister({
  setImgFiles,
}: {
  setImgFiles: Dispatch<SetStateAction<File[]>>;
}) {
  const [previewText, setPreviewText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState<File>();
  const [content, setContent] = useRecoilState(PostContent);
  const [_, setPreviewList] = useRecoilState(PostPreviewList);
  const imgRef = useRef<HTMLInputElement>(null);

  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    URL.revokeObjectURL(imageUrl);
    let file = e.target.files![0];
    const sizeCheck = 5 * 1024 * 1024;
    if (file && file.size > sizeCheck) {
      alert("5MB 이하의 크기의 파일을 선택해주세요.");
    } else {
      setImageUrl(URL.createObjectURL(file));
      setImgFile(file);
    }
  };

  const addPreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const previews = [imageUrl, previewText];
    if (imageUrl === "") alert("이미지를 등록해주세요.");
    if (previewText === "") alert("설명을 등록해주세요.");
    if (imageUrl && previewText && imgFile) {
      setPreviewText("");
      setPreviewList((preview) => [...preview, previews]);
      setContent([...content, previewText]);
      setImgFiles((image) => [...image, imgFile]);
    }
  };
  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef.current!.click();
  };

  return (
    <>
      {imageUrl && (
        <wp.SelectImageContainer>
          선택한 이미지
          <img src={imageUrl} alt="preview" />
        </wp.SelectImageContainer>
      )}
      <wp.ModalContainer>
        <input
          type="file"
          accept="image/*"
          ref={imgRef}
          onChange={previewImg}
        />
        <button onClick={(e) => handleFileUpload(e)}>
          <span>이미지 업로드</span>
          <UploadIcon className="upload-icon" />
        </button>
        <textarea
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="사진에 대해 설명해주세요!"
        />
        <wp.AddButton onClick={(e) => addPreview(e)}>추가하기</wp.AddButton>
      </wp.ModalContainer>
    </>
  );
}
