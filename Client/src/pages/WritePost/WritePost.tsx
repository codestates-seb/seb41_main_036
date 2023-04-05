import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import ButtonForm from "../../components/Button";
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import WriteGuide from "../../components/WritePost/WriteGuide";
import * as wp from "./WritePostStyled";
import { handlePostSubmit } from "../../API/Post/handlePostSubmit";
import Tag from "../../components/WritePost/Tag";

const WritePost = () => {
  const [title, setTitle] = useState(""); // 제목
  const [tags, setTags] = useState<string[]>([]);
  const [previewList, setPreviewList] = useState<string[][]>([]);
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState<any>();
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [isWriteGuideModal, setIsWriteGuideModal] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 30) alert("30자 이내로 작성해주세요.");
  };

  const handleRemovePreview = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setPreviewList(previewList.filter((el) => previewList[idx] !== el));
    setImgFiles(imgFiles.filter((file) => imgFiles[idx] !== file));
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  const actionPostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = await handlePostSubmit(title, tags, imgFiles, content, id);
    navigate(`/posts/detail/${post}`);
  };
  return (
    <>
      {isWriteGuideModal ? (
        <WriteGuide setIsWriteGuideModal={setIsWriteGuideModal} />
      ) : null}
      <wp.Header>
        <div>
          <span>
            <BsDot color="#6255F8" />새 포스트
          </span>
          <ButtonForm
            type="violet"
            width="80px"
            height="20px"
            text="가이드 보기"
            onClick={() => setIsWriteGuideModal(true)}
          />
        </div>
        <div>미리보기</div>
      </wp.Header>
      <wp.Container>
        <wp.WritePostWrapper>
          <wp.WritePostFormContainer>
            <div>
              <input
                value={title}
                onChange={(e) => {
                  handleTitle(e);
                }}
                placeholder="제목을 입력하세요"
              ></input>
              <ButtonForm
                type="custom"
                width="100px"
                height="40px"
                text="이미지 등록"
                backgroundColor="var(--purple-200)"
                onClick={(e) => handleImageModal(e)}
                hoverBackgroundColor="var(--purple-300)"
                hovercolor="white"
              />
            </div>
            <Tag tags={tags} setTags={setTags} />
            {isModal ? (
              <Modal
                setImgFiles={setImgFiles}
                previewText={previewText}
                setPreviewText={setPreviewText}
                setPreviewList={setPreviewList}
                previewList={previewList}
                imgRef={imgRef}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setContent={setContent}
                content={content}
                imgFiles={imgFiles}
                imgFile={imgFile}
                setImgFile={setImgFile}
              />
            ) : null}
          </wp.WritePostFormContainer>
          <wp.HandleBackAndSubmitContainer>
            <div onClick={() => navigate(-1)}>
              <MdOutlineKeyboardBackspace />
            </div>
            <ButtonForm
              type="violet"
              width="100px"
              height="40px"
              text="포스트 등록"
              onClick={(e) => actionPostSubmit(e)}
            />
          </wp.HandleBackAndSubmitContainer>
        </wp.WritePostWrapper>
        <wp.PreviewContainer>
          <div>
            <h2>{title}</h2>
          </div>
          {previewList &&
            previewList.map((el, index) => {
              return (
                <wp.Preview key={index}>
                  <wp.PreviewImgWrapper>
                    <img src={el[0]} />
                  </wp.PreviewImgWrapper>
                  <div>
                    <button onClick={(e) => handleRemovePreview(e, index)}>
                      X
                    </button>
                    <p>{el[1]}</p>
                  </div>
                </wp.Preview>
              );
            })}
        </wp.PreviewContainer>
      </wp.Container>
    </>
  );
};

const Modal = ({
  setImgFiles,
  previewText,
  setPreviewText,
  setPreviewList,
  previewList,
  imgRef,
  imageUrl,
  setImageUrl,
  setContent,
  content,
  imgFiles,
  imgFile,
  setImgFile,
}: {
  setImgFiles: Dispatch<SetStateAction<File[]>>;
  previewText: string;
  setPreviewText: Dispatch<SetStateAction<string>>;
  setPreviewList: Dispatch<SetStateAction<string[][]>>;
  previewList: string[][];
  imgRef: React.RefObject<HTMLInputElement>;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string[]>>;
  content: string[];
  imgFiles: File[];
  imgFile: File;
  setImgFile: Dispatch<SetStateAction<File>>;
}) => {
  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (imageUrl && previewText) {
      setPreviewText("");
      setPreviewList([...previewList, previews]);
      setContent([...content, previewText]);
      setImgFiles([...imgFiles, imgFile]);
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
};

export default WritePost;
