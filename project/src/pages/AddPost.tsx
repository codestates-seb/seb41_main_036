import React, { useRef, useState } from "react";
import styled from "styled-components";

const AddPostWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3em;

  > form {
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: var(--br-m);

    > textarea:first-child {
      resize: none;
      font-size: var(--font-xl);
      padding-top: 20px;
      padding-left: 10px;
      border-radius: var(--br-m);
    }

    > textarea:last-child {
      height: 500px;
      resize: none;
      padding-top: 20px;
      padding-left: 10px;
      border-radius: var(--br-m);
    }
  }
`;
const AddPost = () => {
  const [image, setImage] = useState<any>();
  const [preView, setPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(image);

  const imageUploder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = e.target.files;
    const imageLists = [];
    for (let i = 0; i < imageList!.length; i++) {
      const imageUrl = URL.createObjectURL(imageList![i]);
      console.log(imageUrl);
      imageLists.push(imageUrl);
      setImage(imageLists);
    }
  };
  return (
    <AddPostWrapper>
      <form>
        <textarea placeholder="제목을 입력하세요." />
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
            style={{ width: "100px", height: "100px" }}
          ></button>
          {image &&
            image.map((el: any, idx: number) => (
              <img
                src={el}
                key={idx}
                style={{ width: "150px", height: "150px" }}
              />
            ))}
        </div>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={imageUploder}
        />
        <textarea placeholder="본문을 입력하세요."></textarea>
      </form>
    </AddPostWrapper>
  );
};

export default AddPost;
