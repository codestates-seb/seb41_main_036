import axios from "../../utils/axiosinstance";
import React, {
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import ButtonForm from "../../components/Button";
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { PostDetailType } from "../DetailPost/DetailPost";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { MemberId } from "../../recoil/state";
import * as ep from './EditPostStyled'


const EditPost = () => {
  const [data, setData] = useState<PostDetailType>();
  const [title, setTitle] = useState<string>(""); // 제목
  const [previewList, setPreviewList] = useState<string[][]>([]); // 프리뷰 map 돌릴 값 저장용
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState(""); // 미리보기용 이미지 주소 1개
  const [removeImgUrl, setRemoveImgUrl] = useState<any[]>([]);
  const [addImgUrl, setAddImgUrl] = useState<File[]>([]);
  const [imgFile, setImgFile] = useState<any>();
  const [imgFiles, setImgFiles] = useState<any[]>([]); // 서버에 보낼 이미지 파일 리스트 - 최종
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [memberId] = useRecoilState(MemberId);

  const getPostList = async () => {
    await axios
      .get(`/posts/details/${id}/${memberId}`)
      .then((res) => {
        setData(res.data.data);
        const { postTitle, postHashTags, postImageUrls, postContents } =
          res.data.data;
        setTitle(postTitle);
        setTags(postHashTags);
        setImgFiles(postImageUrls);
        setContent(postContents);
        if (data) {
          let array: any[] = [];
          for (let i = 0; i < data?.postImageUrls.length!; i++) {
            array.push([data?.postImageUrls[i], data?.postContents[i]]);
          }
          setPreviewList(array);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPostList();
  }, []);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title && title.length > 30) alert("30자 이내로 작성해주세요.");
    setTitle(e.target.value);
  };

  const TagButton = ({ tag, idx }: { tag: string; idx: number }) => {
    const removeClickTagHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTags(tags.filter((_, i) => i !== idx));
    };

    return (
      <ep.TagBox>
        <span>{tag}</span>
        <button onClick={(e) => removeClickTagHandler(e)}>
          <svg width="14" height="14" fill="hsl(237.931, 43%, 87%)">
            <path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
          </svg>
        </button>
      </ep.TagBox>
    );
  };

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
    setRemoveImgUrl([
      ...removeImgUrl,
      imgFiles.filter((img) => imgFiles[idx] === img),
    ]);
    setImgFiles(imgFiles.filter((file: any) => imgFiles[idx] !== file));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력해주세요");
    } else if (imgFiles.length === 0) alert("이미지를 등록해주세요.");
    else {
      const formData = new FormData();
      formData.append("postTitle", title);
      tags.forEach((tag) => {
        formData.append("postHashTags", tag);
      });
      removeImgUrl.forEach((removeImg) => {
        formData.append("deleteUrls", removeImg);
      });
      addImgUrl.forEach((addImg) => {
        formData.append("postImageFiles", addImg);
      });
      content.forEach((text) => {
        formData.append("postContents", text);
      });
      axios
        .patch(`/posts/edit/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) navigate(`/posts/detail/${id}`);
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
      <ep.Header>
        <div>
          <BsDot color="#6255F8" />
          수정 포스트
        </div>
        <div onClick={() => navigate(-1)}>
          <IoArrowBackSharp />
        </div>
      </ep.Header>
      <ep.Container>
        <form>
          <div>
            <input
              defaultValue={data?.postTitle}
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
          <ep.TagWrapper>
            {data &&
              tags.map((tag, idx) => (
                <TagButton tag={tag} key={idx} idx={idx}></TagButton>
              ))}
            <input
              type="text"
              value={tag}
              onKeyUp={(e) => tagMakeHandler(e)}
              onKeyDown={(e) => noRemoveTagHandler(e)}
              onChange={(e) => setTag(e.target.value)}
              placeholder={data?.postHashTags.length ? "" : "태그를 입력하세요"}
            ></input>
          </ep.TagWrapper>
          {data && isModal ? (
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
              addImgUrl={addImgUrl}
              setAddImgUrl={setAddImgUrl}
            />
          ) : null}
        </form>
        <ep.PreviewContainer>
          <div>
            <h2>{title}</h2>
            <ButtonForm
              type="violet"
              onClick={(e) => handleSubmit(e)}
              width="100px"
              height="40px"
              text="수정 완료"
            />
          </div>
          {previewList &&
            previewList.map((el, index) => {
              return (
                <ep.Preview key={index}>
                  <ep.PreviewImgWrapper>
                    <img src={el[0]} />
                  </ep.PreviewImgWrapper>
                  <div>
                    <button
                      onClick={(e) => handleRemovePreview(e, index)}
                      style={{ color: "red" }}
                    >
                      X
                    </button>
                    <p>{el[1]}</p>
                  </div>
                </ep.Preview>
              );
            })}
        </ep.PreviewContainer>
      </ep.Container>
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
  addImgUrl,
  setAddImgUrl,
}: {
  setImgFiles: Dispatch<SetStateAction<any[]>>;
  previewText: string;
  setPreviewText: Dispatch<SetStateAction<string>>;
  setPreviewList: Dispatch<SetStateAction<string[][]>>;
  previewList: string[][];
  imgRef: React.RefObject<HTMLInputElement>;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string[]>>;
  content: string[];
  imgFiles: any[];
  imgFile: File;
  setImgFile: Dispatch<SetStateAction<File>>;
  addImgUrl: File[];
  setAddImgUrl: Dispatch<SetStateAction<File[]>>;
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
      setAddImgUrl([...addImgUrl, imgFile]);
    }
  };

  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef.current!.click();
  };

  return (
    <>
      {imageUrl && (
        <ep.SelectImageContainer>
          선택한 이미지
          <img src={imageUrl} alt="preview" />
        </ep.SelectImageContainer>
      )}
      <ep.ModalContainer>
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
        <ep.AddButton onClick={(e) => addPreview(e)}>추가하기</ep.AddButton>
      </ep.ModalContainer>
    </>
  );
};

export default EditPost;
