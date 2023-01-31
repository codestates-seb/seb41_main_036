import axios from "../utils/axiosinstance";
import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import ButtonForm from "../components/Button";
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 92vh;
  background-color: #fcfcfc;
  > form {
    width: 45%;
    display: flex;
    flex-direction: column;
    padding: 10px 40px;
  }
  input {
    padding-left: 10px;
    width: 80%;
    border: none;
    outline: none;
    font-size: 25px;
    font-weight: var(--fw-bold);
    background-color: #fcfcfc;
    &:focus {
      border-color: transparent;
    }
    &::placeholder {
      font-size: 30px;
      font-weight: var(--fw-bold);
    }
  }
  hr {
    margin-top: 10px;
    height: 1px;
    border: 0;
    background: #b8b8b8;
  }

  div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

const PreviewContainer = styled.div`
  width: 55%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f0f0f0;
  padding: 10px 40px;
  word-break: break-all;
  div:first-child {
    h2 {
      margin-top: 5px;
      margin-bottom: 25px;
      height: 44px;
      padding-left: 20px;
    }
    button {
      margin-right: 10px;
    }
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;

    > p {
      width: 84%;
      margin-top: -20px;
      font-size: 15px;
      margin-left: 38px;
      margin-bottom: 100px;
      text-align: start;
      color: #2d2d2d;
      line-height: 24px;
    }
    > button {
      margin-top: 20px;
      width: 94.5%;
      height: 20px;
      font-size: 14px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      color: var(--purple-400);
      cursor: pointer;
      text-align: right;
    }
  }
`;

const TagBox = styled.span`
  padding: 5px 7px;
  border: none;
  background-color: transparent;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-l);
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

const TagWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #2d2d2d;

  > input {
    width: 200px;
    padding-left: 10px;
    font-size: var(--font-base);
    height: 30px;
    outline: none;
    color: #2d2d2d;

    &::placeholder {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  background-color: #fcfcfc;
  > div:nth-child(1) {
    width: 45%;
    height: 100%;
    padding: 20px;
  }
  > div:nth-child(2) {
    width: 55%;
    background-color: #f0f0f0;
    padding: 20px;
    text-align: right;
    font-size: 20px;
    cursor: pointer;
  }
`;

const PreviewImgWrapper = styled.div`
  overflow: scroll;
  width: 90%;
  height: 400px;
  margin: 0 auto;
  object-fit: cover;
`;
const WritePost = () => {
  const [title, setTitle] = useState(""); // 제목
  const [previewList, setPreviewList] = useState<string[][]>([]); // 프리뷰 map 돌릴 값 저장용
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState<any>();
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 20) alert("20자 이내로 작성해주세요.");
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
  </TagWrapper>;
  const noRemoveTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };
  const tagMakeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.code === "Space" || e.key === "Enter") {
      if (tag === "" || tag === " ") setTag("");
      else if (tags.length >= 5)
        alert("태그는 5개 이하까지만 사용할 수 있습니다.");
      else setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemovePreview = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setPreviewList(previewList.filter((el) => previewList[idx] !== el));
    setImgFiles(imgFiles.filter((file) => imgFiles[idx] !== file));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "") alert("제목을 입력해주세요");
    if (title) {
      const formData = new FormData();
      formData.append("postTitle", title);
      tags.forEach((tag) => {
        formData.append("postHashTags", tag);
      });
      imgFiles.forEach((img) => {
        formData.append("postImageFiles", img);
      });
      content.forEach((text) => {
        formData.append("postContents", text);
      });
      axios
        .post(`/posts/register/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate(`/posts/detail/${res.data.data.postId}`);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  return (
    <>
      <Header>
        <div>
          <BsDot color="#6255F8" />새 포스트
        </div>
        <div onClick={() => navigate(-1)}>
          <IoArrowBackSharp />
        </div>
      </Header>
      <Container>
        <form>
          <div>
            <input
              value={title}
              onChange={(e) => {
                handleTitle(e);
              }}
              placeholder="제목을 입력하세요"
            ></input>
            <ButtonForm
              type="violet"
              width="100px"
              height="40px"
              text="이미지 등록"
              onClick={(e) => handleImageModal(e)}
            />
          </div>

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
              placeholder={tags.length ? "" : "태그를 입력하세요"}
            ></input>
          </TagWrapper>
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
        </form>
        <PreviewContainer>
          <div>
            <h2>{title}</h2>
            <ButtonForm
              type="violet"
              onClick={(e) => handleSubmit(e)}
              width="100px"
              height="40px"
              text="포스트 등록"
            />
          </div>
          {previewList &&
            previewList.map((el, index) => {
              return (
                <Preview key={index}>
                  <PreviewImgWrapper>
                    <img src={el[0]} />
                  </PreviewImgWrapper>
                  <div>
                    <button
                      onClick={(e) => handleRemovePreview(e, index)}
                      style={{ color: "red" }}
                    >
                      X
                    </button>
                    <p>{el[1]}</p>
                  </div>
                </Preview>
              );
            })}
        </PreviewContainer>
      </Container>
    </>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;
  padding: 20px;
  width: 400px;
  height: 300px;
  border: 0.5px solid var(--purple-300);
  background: rgba(255, 255, 255, 0.45);
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  input {
    color: var(--purple-400);
    border: none;
    background-color: transparent;
    display: none;
  }

  textarea {
    width: 300px;
    resize: none;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--black-500);

    &:focus {
      box-shadow: 0 0 10px var(--purple-300);
      border: 0;
      outline: none;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    margin-bottom: 20px;
    background-color: var(--black-200);
    border-radius: var(--br-l);
    color: var(--black-700);
    font-weight: var(--fw-bold);
    padding: 10px 0;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      color: var(--purple-300);
      transform: translateY(-5px);
    }
  }

  svg {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }

  button:last-child {
    padding-top: 30px;
    background-color: transparent;
  }
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
`;

const SelectImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 200px;
    height: 200px;
  }
`;
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
        <SelectImageContainer>
          선택한 이미지
          <img src={imageUrl} alt="preview" />
        </SelectImageContainer>
      )}
      <ModalContainer>
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
        <AddButton onClick={(e) => addPreview(e)}>추가하기</AddButton>
      </ModalContainer>
    </>
  );
};

export default WritePost;
