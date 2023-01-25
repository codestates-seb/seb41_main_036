import axios from "axios";
import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import ButtonForm from "../components/Button";
import { FcDownload } from "react-icons/fc";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fcfcfc;
  margin-top: 20px;

  > form {
    width: 45%;
    display: flex;
    flex-direction: column;
  }
  input {
    padding-left: 10px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 23px;
    color: var(--black-200);
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

  div:first-child {
    background-color: #fcfcfc;

    h2 {
      margin-top: 5px;
      height: 44px;
      padding-left: 20px;
    }
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;

  > img {
    background-size: cover;
    background-color: white;
    margin: 0 auto;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0 20px;

    > p {
      padding: 10px;
      font-size: 16px;
    }
    > button {
      width: 100px;
      height: 20px;
      font-size: 14px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      color: var(--purple-400);
      cursor: pointer;
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

const TagWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;

  > input {
    width: 200px;
    padding-left: 10px;
    font-size: var(--font-base);
    height: 30px;
    outline: none;
    color: black;

    &::placeholder {
      font-size: 20px;
      font-weight: var(--fw-m);
    }
  }
`;
const WritePost = () => {
  const [title, setTitle] = useState(""); // 제목
  const [previewList, setPreviewList] = useState<string[][]>([]); // 프리뷰 map 돌릴 값 저장용
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 50) alert("50자 이내로 작성해주세요.");
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
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .delete("/posts/delete/5/1")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleRemovePreview = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setPreviewList(previewList.filter((el) => previewList[idx] !== el));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      .post(`/posts/register/1/1`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  return (
    <>
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
              width="100px"
              height="40px"
              text="이미지 등록"
              onClick={(e) => handleImageModal(e)}
            />
          </div>
          <hr></hr>
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
          <hr></hr>
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
            />
          ) : null}
        </form>
        <PreviewContainer>
          <div>
            <h2>미리보기</h2>
            <ButtonForm
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
                  <img src={el[0]} />
                  <div>
                    <p>{el[1]}</p>
                    <button onClick={(e) => handleRemovePreview(e, index)}>
                      삭제
                    </button>
                  </div>
                </Preview>
              );
            })}
        </PreviewContainer>
      </Container>
    </>
  );
};

const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 0 0 20px;
  padding: 20px;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  // background-color: aqua;
  border: 1px solid var(--purple-400);

  input {
    color: var(--purple-400);
    border: none;
    background-color: transparent;
    display: none;
  }

  textarea {
    resize: none;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--black-500);

    &:focus {
      box-shadow: 0 0 10px var(--purple-400);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    margin-bottom: 20px;
    background-color: var(--purple-100);
    border-radius: var(--br-l);
    color: var(--purple-400);
    font-weight: var(--fw-bold);
    cursor: pointer;

    &:hover {
      color: var(--purple-300);
      background-color: var(--purple-200);
    }
  }

  svg {
    width: 25px;
    height: 50px;
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
}) => {
  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const sizeCheck = 1 * 1024 * 1024;
    if (file && file.size > sizeCheck) {
      alert("2MB 이하의 크기의 파일을 선택해주세요.");
    } else {
      setImageUrl(URL.createObjectURL(file));
      setImgFiles([...imgFiles, file]);
    }
  };

  const addPreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const previews = [imageUrl, previewText];
    setPreviewText("");
    setPreviewList([...previewList, previews]);
    setContent([...content, previewText]);
  };

  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef.current!.click();
    imgRef.current!.value = "";
  };

  return (
    <ModalContainer>
      <input type="file" accept="image/*" ref={imgRef} onChange={previewImg} />
      <button onClick={(e) => handleFileUpload(e)}>
        <span>이미지 업로드</span>
        <FcDownload />
      </button>
      <textarea
        value={previewText}
        onChange={(e) => setPreviewText(e.target.value)}
        placeholder="사진에 대해 설명해주세요!"
      />
      <AddButton onClick={(e) => addPreview(e)}>추가하기</AddButton>
    </ModalContainer>
  );
};

//태그

export default WritePost;
