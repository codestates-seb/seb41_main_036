import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  PostContent,
  PostPreviewList,
  PostTags,
} from "../../recoil/WritePostState";
import ButtonForm from "../../components/Button";
import ContentRegister from "../../components/WritePost/ContentRegister";
import WriteGuide from "../../components/WritePost/WriteGuide";
import Tag from "../../components/WritePost/Tag";
import { handlePostSubmit } from "../../API/Post/handlePostSubmit";
import { BsDot } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import * as wp from "./WritePostStyled";

export default function WritePost() {
  const [title, setTitle] = useState(""); // 제목
  const [tags] = useRecoilState(PostTags);
  const [previewList, setPreviewList] = useRecoilState(PostPreviewList);
  const [content] = useRecoilState(PostContent);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [isWriteGuideModal, setIsWriteGuideModal] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 30) alert("30자 이내로 작성해주세요.");
  };

  const handleRemovePreview = (
    e: React.MouseEvent<HTMLOrSVGElement>,
    idx: number
  ) => {
    e.preventDefault();
    if (imgFiles) {
      setPreviewList(
        previewList.filter((previews) => previewList[idx] !== previews)
      );
      setImgFiles(imgFiles.filter((file) => imgFiles[idx] !== file));
    }
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  const actionPostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = await handlePostSubmit(title, tags, imgFiles, content, postId);
    navigate(`/posts/detail/${post}`);
  };

  console.log(previewList);
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
            <Tag />
            {isModal ? <ContentRegister setImgFiles={setImgFiles} /> : null}
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
            previewList.map((previews, index) => {
              return (
                <wp.PreviewContentContainer key={index}>
                  <wp.PreviewImgContainer>
                    <img src={previews[0]} />
                  </wp.PreviewImgContainer>
                  <wp.PreviewTextContainer>
                    {previews[1]}
                    <CgClose
                      cursor="pointer"
                      onClick={(e) => handleRemovePreview(e, index)}
                    />
                  </wp.PreviewTextContainer>
                </wp.PreviewContentContainer>
              );
            })}
        </wp.PreviewContainer>
      </wp.Container>
    </>
  );
}
